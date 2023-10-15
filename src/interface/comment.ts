import * as z from 'zod'

import { User } from './user'

export const ZComment = z.object({
  content: z.string(),
  score: z.number(),
  user: z.string(),
  mention: z.string().optional(),
  parentId: z.string().optional()
})

export type ZComment = z.infer<typeof ZComment>

export interface Comment extends Omit<ZComment, 'user'> {
  _id: string
  createdAt: Date
  updatedAt: Date
  replies?: Comment[]
  user: User
}
