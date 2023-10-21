import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

import { createNewCommentsList, updateCommentsList } from '@/utils/comments'
import { deleteCommentsApi, getCommentsApi, postCommentsApi } from '@/api/comments'

import type { Comment, ZComment } from '@/interface/comment'

const COMMENTS_QUERYKEY = 'comments'

const useCommentsQuery = () => {
  const queryClient = useQueryClient()

  const { data: comments, isLoading } = useQuery({
    queryKey: [COMMENTS_QUERYKEY],
    queryFn: getCommentsApi
  })

  const postCommentMutation = useMutation({
    mutationFn: postCommentsApi,
    onMutate: async (comment) => {
      await queryClient.cancelQueries({ queryKey: [COMMENTS_QUERYKEY] })

      const previousComments = queryClient.getQueryData<Comment[]>([COMMENTS_QUERYKEY])

      if (previousComments) {
        const newCommentsList = createNewCommentsList(previousComments, comment)
        queryClient.setQueryData<Comment[]>([COMMENTS_QUERYKEY], newCommentsList)
      }

      return previousComments
    },
    onError: (error: Error, comment: ZComment, context: Comment[] | undefined) => {
      if (context) queryClient.setQueryData<Comment[]>([COMMENTS_QUERYKEY], context)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [COMMENTS_QUERYKEY] })
    }
  })

  const deleteCommentMutation = useMutation({
    mutationFn: deleteCommentsApi,
    onMutate: async (comment) => {
      await queryClient.cancelQueries({ queryKey: [COMMENTS_QUERYKEY] })

      const previousComments = queryClient.getQueryData<Comment[]>([COMMENTS_QUERYKEY])

      if (previousComments) {
        const filteredComments = updateCommentsList(previousComments, comment)
        queryClient.setQueryData<Comment[]>([COMMENTS_QUERYKEY], filteredComments)
      }

      return previousComments
    },
    onError: (error: Error, comment: Comment, context: Comment[] | undefined) => {
      if (context) queryClient.setQueryData<Comment[]>([COMMENTS_QUERYKEY], context)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [COMMENTS_QUERYKEY] })
    }
  })

  const postComment = (comment: ZComment) => {
    postCommentMutation.mutate(comment)
  }

  const deleteComment = (comment: Comment) => {
    deleteCommentMutation.mutate(comment)
  }

  return { comments, isLoading, postComment, deleteComment }
}
export default useCommentsQuery
