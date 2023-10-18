import axios from 'axios'
import type { AxiosResponse } from 'axios'

import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { Comment, ZComment } from '@/interface/comment'

interface Response {
  data: Comment[]
  meta: {
    code: number
    message: string
  }
}

const QUERYKEY = 'comments'

const fetcher = async (): Promise<Comment[]> => {
  const res: AxiosResponse<Response> = await axios.get('http://localhost:5000/api/v1/comments')

  return res.data.data
}

const useCommentsQuery = () => {
  const queryClient = useQueryClient()

  const { data: comments, isLoading } = useQuery({ queryKey: [QUERYKEY], queryFn: fetcher })

  const mutationFn = (comment: ZComment) =>
    axios.post('http://localhost:5000/api/v1/comments', comment)

  const onMutate = async (newComment: ZComment) => {
    await queryClient.cancelQueries({ queryKey: [QUERYKEY] })

    const previousComments = queryClient.getQueryData<Comment[]>([QUERYKEY])

    if (previousComments)
      queryClient.setQueryData<Comment[]>(
        [QUERYKEY],
        [
          {
            ...newComment,
            _id: Math.random().toString(),
            createdAt: new Date(),
            updatedAt: new Date(),
            user: {
              _id: newComment.user,
              username: 'juliusomo'
            }
          },
          ...previousComments
        ]
      )

    return previousComments
  }

  const onError = (_: string, __: ZComment, context: Comment[] | undefined) => {
    if (context) queryClient.setQueryData<Comment[]>([QUERYKEY], context)
  }

  const onSettled = () => {
    queryClient.invalidateQueries({ queryKey: [QUERYKEY] })
  }

  const postCommentMutation = useMutation({
    mutationFn,
    onMutate,
    onError,
    onSettled
  })

  const postComment = (comment: ZComment) => {
    postCommentMutation.mutate(comment)
  }

  return { comments, isLoading, postComment }
}
export default useCommentsQuery
