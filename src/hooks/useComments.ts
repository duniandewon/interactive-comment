import { reactive, toRefs } from 'vue'

import axios from 'axios'
import type { AxiosResponse } from 'axios'
import type { Comment } from '@/interface/comment'

export interface State {
  comments: Comment[]
  loading: boolean
  error: string
}

interface Response {
  data: Comment[]
  meta: {
    code: number
    message: string
  }
}

const useComments = () => {
  const state: State = reactive({ comments: [], loading: false, error: '' })

  const USER = {
    _id: '65154ab60a64cbfdf46d8348',
    username: 'juliusomo'
  }

  const getComments = async () => {
    state.loading = true
    try {
      const res: AxiosResponse<Response> = await axios.get('http://localhost:5000/api/v1/comments')

      state.comments = res.data.data
    } catch (err) {
      if (axios.isAxiosError(err)) state.error = err.message
    } finally {
      state.loading = false
    }
  }

  const postComments = async (comment: string) => {
    state.loading = true
    try {
      const newComment = {
        content: comment,
        score: 0,
        user: USER._id
      }

      await axios.post('http://localhost:5000/api/v1/comments', newComment)
    } catch (err) {
      if (axios.isAxiosError(err)) state.error = err.message
    }
  }

  const deleteComment = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/comments/${id}`)
    } catch (err) {
      if (axios.isAxiosError(err)) state.error = err.message
    }
  }

  if (!state.comments.length) getComments()

  return { ...toRefs(state), postComments, deleteComment }
}

export default useComments
