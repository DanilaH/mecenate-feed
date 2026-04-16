import { makeAutoObservable } from 'mobx';
import type { Tier } from '../types/api';

interface OptimisticLike {
  isLiked: boolean;
  likesCount: number;
}

class FeedStore {
  activeTier: Tier = 'all';
  optimisticLikes: Map<string, OptimisticLike> = new Map();

  constructor() {
    makeAutoObservable(this);
  }

  setTier(tier: Tier) {
    this.activeTier = tier;
    // Clear optimistic state on tab switch
    this.optimisticLikes.clear();
  }

  applyOptimisticLike(postId: string, currentIsLiked: boolean, currentCount: number) {
    const newIsLiked = !currentIsLiked;
    const newCount = newIsLiked ? currentCount + 1 : currentCount - 1;
    this.optimisticLikes.set(postId, {
      isLiked: newIsLiked,
      likesCount: newCount,
    });
  }

  confirmLike(postId: string, isLiked: boolean, likesCount: number) {
    this.optimisticLikes.set(postId, { isLiked, likesCount });
  }

  revertLike(postId: string, originalIsLiked: boolean, originalCount: number) {
    this.optimisticLikes.set(postId, {
      isLiked: originalIsLiked,
      likesCount: originalCount,
    });
  }

  getPostLikeState(
    postId: string,
    serverIsLiked: boolean,
    serverCount: number,
  ): OptimisticLike {
    return (
      this.optimisticLikes.get(postId) ?? {
        isLiked: serverIsLiked,
        likesCount: serverCount,
      }
    );
  }

  clearLikeState(postId: string) {
    this.optimisticLikes.delete(postId);
  }
}

export const feedStore = new FeedStore();
export type { FeedStore };
