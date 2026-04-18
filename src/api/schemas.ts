import { z } from "zod";

export const AuthorSchema = z.object({
  id: z.string(),
  username: z.string(),
  displayName: z.string(),
  avatarUrl: z.string(),
  bio: z.string().optional(),
  subscribersCount: z.number().optional(),
  isVerified: z.boolean().optional(),
});

export const PostSchema = z.object({
  id: z.string(),
  author: AuthorSchema,
  title: z.string(),
  body: z.string(),
  preview: z.string(),
  coverUrl: z.string(),
  likesCount: z.number(),
  commentsCount: z.number(),
  isLiked: z.boolean(),
  tier: z.enum(["free", "paid"]),
  createdAt: z.string(),
});

export const PostsResponseSchema = z.object({
  ok: z.boolean(),
  data: z.object({
    posts: z.array(PostSchema),
    nextCursor: z.string().nullable(),
    hasMore: z.boolean(),
  }),
});

export const PostDetailResponseSchema = z.object({
  ok: z.boolean(),
  data: z.object({
    post: PostSchema,
  }),
});

export const LikeResponseSchema = z.object({
  ok: z.boolean(),
  data: z.object({
    isLiked: z.boolean(),
    likesCount: z.number(),
  }),
});

export const CommentSchema = z.object({
  id: z.string(),
  postId: z.string(),
  author: AuthorSchema,
  text: z.string(),
  createdAt: z.string(),
  likesCount: z.number().optional(),
  isLiked: z.boolean().optional(),
});

export const CommentsResponseSchema = z.object({
  ok: z.boolean(),
  data: z.object({
    comments: z.array(CommentSchema),
    nextCursor: z.string().nullable(),
    hasMore: z.boolean(),
  }),
});

export const CommentCreatedResponseSchema = z.object({
  ok: z.boolean(),
  data: z.object({
    comment: CommentSchema,
  }),
});
