import { ref } from 'vue'
import { defineStore } from 'pinia'

import axios from 'axios'
import type { AxiosResponse } from 'axios'

import type { Comment, ZComment } from '@/interface/comment'

interface Response<T> {
  data: T
  meta: {
    code: number
    message: string
  }
}

export const useCommentsStore = defineStore('comments', () => {
  const comments = ref<Comment[]>([])
  const status = ref<'idle' | 'loading' | 'done'>('idle')
  const error = ref('')

  const getComments = async () => {
    status.value = 'loading'

    try {
      const res: AxiosResponse<Response<Comment[]>> = await axios.get(
        'http://localhost:5000/api/v1/comments'
      )

      comments.value = res.data.data
    } catch (err) {
      if (axios.isAxiosError(err)) error.value = err.message
    } finally {
      status.value = 'idle'
    }
  }

  const postComments = async (comment: ZComment) => {
    status.value = 'loading'

    try {
      await axios.post('http://localhost:5000/api/v1/comments', comment)

      await getComments()
    } catch (err) {
      if (axios.isAxiosError(err)) error.value = err.message
    } finally {
      status.value = 'idle'
    }
  }

  const updateComment = async (id: string, comment: ZComment) => {
    status.value = 'loading'

    try {
      await axios.put(`http://localhost:5000/api/v1/comments/${id}`, comment)

      await getComments()
    } catch (err) {
      if (axios.isAxiosError(err)) error.value = err.message
    } finally {
      status.value = 'idle'
    }
  }

  const deleteComment = async (id: string) => {
    status.value = 'loading'

    try {
      await axios.delete(`http://localhost:5000/api/v1/comments/${id}`)

      await getComments()
    } catch (err) {
      if (axios.isAxiosError(err)) error.value = err.message
    } finally {
      status.value = 'idle'
    }
  }

  return { comments, status, error, getComments, postComments, updateComment, deleteComment }
})
