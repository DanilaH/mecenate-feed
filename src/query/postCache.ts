import type { InfiniteData, QueryClient } from "@tanstack/react-query";
import type {
  Comment,
  CommentsResponse,
  LikeResponse,
  PostDetailResponse,
  PostsResponse,
  Tier,
} from "../types/api";
import { COMMENTS_QUERY_KEY, FEED_QUERY_KEY, POST_QUERY_KEY } from "./keys";

const FEED_TIERS: Tier[] = ["all", "free", "paid"];

export function addCommentToCache(
  queryClient: QueryClient,
  postId: string,
  comment: Comment,
) {
  const existingComments = queryClient.getQueryData<
    InfiniteData<CommentsResponse>
  >(COMMENTS_QUERY_KEY(postId));
  const alreadyExists = existingComments?.pages.some((page) =>
    page.data.comments.some((item) => item.id === comment.id),
  );

  if (alreadyExists) {
    return;
  }

  queryClient.setQueryData<InfiniteData<CommentsResponse>>(
    COMMENTS_QUERY_KEY(postId),
    (current) => {
      if (!current) {
        return {
          pages: [
            {
              ok: true,
              data: {
                comments: [comment],
                nextCursor: null,
                hasMore: false,
              },
            },
          ],
          pageParams: [undefined],
        };
      }

      const [firstPage, ...restPages] = current.pages;
      return {
        ...current,
        pages: [
          {
            ...firstPage,
            data: {
              ...firstPage.data,
              comments: [comment, ...firstPage.data.comments],
            },
          },
          ...restPages,
        ],
      };
    },
  );

  updatePostCommentCount(queryClient, postId, 1);
}

export function updatePostLikeCache(
  queryClient: QueryClient,
  postId: string,
  response: LikeResponse,
) {
  updateFeedLikeCache(queryClient, postId, {
    isLiked: response.data.isLiked,
    likesCount: response.data.likesCount,
  });

  queryClient.setQueryData<PostDetailResponse>(
    POST_QUERY_KEY(postId),
    (current) =>
      current
        ? {
            ...current,
            data: {
              post: {
                ...current.data.post,
                isLiked: response.data.isLiked,
                likesCount: response.data.likesCount,
              },
            },
          }
        : current,
  );
}

export function updatePostLikeFromRealtime(
  queryClient: QueryClient,
  postId: string,
  likesCount: number,
) {
  updateFeedLikeCache(queryClient, postId, { likesCount });

  queryClient.setQueryData<PostDetailResponse>(
    POST_QUERY_KEY(postId),
    (current) =>
      current
        ? {
            ...current,
            data: {
              post: {
                ...current.data.post,
                likesCount,
              },
            },
          }
        : current,
  );
}

function updatePostCommentCount(
  queryClient: QueryClient,
  postId: string,
  delta: number,
) {
  queryClient.setQueryData<PostDetailResponse>(
    POST_QUERY_KEY(postId),
    (current) =>
      current
        ? {
            ...current,
            data: {
              post: {
                ...current.data.post,
                commentsCount: current.data.post.commentsCount + delta,
              },
            },
          }
        : current,
  );

  FEED_TIERS.forEach((tier) => {
    queryClient.setQueryData<InfiniteData<PostsResponse>>(
      FEED_QUERY_KEY(tier),
      (current) =>
        current
          ? {
              ...current,
              pages: current.pages.map((page) => ({
                ...page,
                data: {
                  ...page.data,
                  posts: page.data.posts.map((post) =>
                    post.id === postId
                      ? {
                          ...post,
                          commentsCount: post.commentsCount + delta,
                        }
                      : post,
                  ),
                },
              })),
            }
          : current,
    );
  });
}

function updateFeedLikeCache(
  queryClient: QueryClient,
  postId: string,
  likeState: {
    likesCount: number;
    isLiked?: boolean;
  },
) {
  FEED_TIERS.forEach((tier) => {
    queryClient.setQueryData<InfiniteData<PostsResponse>>(
      FEED_QUERY_KEY(tier),
      (current) =>
        current
          ? {
              ...current,
              pages: current.pages.map((page) => ({
                ...page,
                data: {
                  ...page.data,
                  posts: page.data.posts.map((post) =>
                    post.id === postId
                      ? {
                          ...post,
                          likesCount: likeState.likesCount,
                          isLiked: likeState.isLiked ?? post.isLiked,
                        }
                      : post,
                  ),
                },
              })),
            }
          : current,
    );
  });
}
