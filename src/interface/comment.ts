import * as z from 'zod'

import { User } from './user';

const BaseComment = z.object({
  _id: z.string(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
  score: z.number(),
  user: User,
  mention: z.string().optional(),
});

export interface Comment extends z.infer<typeof BaseComment> {
  replies?: z.infer<typeof BaseComment>[];
}

export const Comment = BaseComment.extend({
  replies: z.array(BaseComment).optional(),
});