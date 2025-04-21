import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;
    case ActionType.CLEAR_TALK_DETAIL:
      return null;
    case ActionType.ADD_COMMENT:
      return {
        ...threadDetail,
        comments: [action.payload.comment, ...threadDetail.comments],
      };
    case ActionType.TOGGLE_UP_VOTE_THREAD:
      return {
        ...threadDetail,
        upVotesBy: threadDetail.upVotesBy.includes(action.payload.userId)
          ? threadDetail.upVotesBy.filter((userId) => userId !== action.payload.userId)
          : threadDetail.upVotesBy.concat(action.payload.userId),
      };
    case ActionType.TOGGLE_DOWN_VOTE_THREAD:
      return {
        ...threadDetail,
        downVotesBy: threadDetail.downVotesBy.includes(action.payload.userId)
          ? threadDetail.downVotesBy.filter((userId) => userId !== action.payload.userId)
          : threadDetail.downVotesBy.concat(action.payload.userId),
      };
    case ActionType.TOGGLE_UP_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.Id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                ? comment.upVotesBy.filter((userId) => userId !== action.payload.userId)
                : comment.upVotesBy.concat(action.payload.userId),
            };
          }
          return comment;
        }),
      };
    case ActionType.TOGGLE_DOWN_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.Id === action.payload.commentId) {
            return {
              ...comment,
              downVotesBy: comment.downVotesBy.includes(action.payload.userId)
                ? comment.downVotesBy.filter((userId) => userId !== action.payload.userId)
                : comment.downVotesBy.concat(action.payload.userId),
            };
          }
          return comment;
        }),
      };
    default:
      return threadDetail;
  }
}

export default threadDetailReducer;
