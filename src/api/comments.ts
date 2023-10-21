import axios, { type AxiosResponse } from 'axios'

import type { Comment, ZComment } from '@/interface/comment'

interface Response {
  data: Comment[]
  meta: {
    code: number
    message: string
  }
}

const axiosClient = axios.create({ baseURL: 'http://localhost:5000/api/v1' })

export const getCommentsApi = async (): Promise<Comment[]> => {
  const res: AxiosResponse<Response> = await axiosClient.get('/comments')

  return res.data.data
}

export const postCommentsApi = (comment: ZComment) => axiosClient.post('/comments', comment)

export const deleteCommentsApi = (comment: Comment) => axiosClient.delete(`/comments/${comment._id}`)
