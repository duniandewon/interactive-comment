import type { Comment, ZComment } from '@/interface/comment'

export const createNewCommentsList = (old: Comment[], comment: ZComment) => {
  let newCommentList: Comment[] = []

  const newComment: Comment = {
    ...comment,
    _id: Math.random().toString(),
    createdAt: new Date(),
    updatedAt: new Date(),
    user: {
      _id: comment.user,
      username: 'juliusomo'
    }
  }

  if (comment.parentId) {
    for (const comm of old) {
      if (comm._id === comment.parentId) {
        comm.replies = comm.replies ?? []
        comm.replies = [newComment, ...comm.replies]
      }

      newCommentList.push(comm)
    }
  } else {
    newCommentList = [newComment, ...old]
  }

  return newCommentList
}

export const updateCommentsList = (oldComments: Comment[], comment: Comment) => {
  if (!comment.parentId) {
    return oldComments.filter((comm) => comm._id !== comment._id)
  } else {
    return oldComments.map((comm) => {
      if (comm._id === comment.parentId) {
        comm.replies = comm.replies?.filter((reply) => reply._id !== comment._id)
      }
      return comm
    })
  }
}
