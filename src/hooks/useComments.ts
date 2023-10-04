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

  getComments()

  return { ...toRefs(state) }
}

export default useComments
