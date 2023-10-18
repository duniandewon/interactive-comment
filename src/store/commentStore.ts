import type { Comment } from '@/interface/comment'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCommentStore = defineStore('comment-store', () => {
  const activeComment = ref<Comment | null>(null)

  const setActiveComment = (comment: Comment | null) => {
    activeComment.value = comment
  }

  return { activeComment, setActiveComment }
})
