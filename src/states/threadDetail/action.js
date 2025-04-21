import api from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_TALK_DETAIL: 'CLEAR_TALK_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  TOGGLE_UP_VOTE_THREAD_DETAIL: 'TOGGLE_UP_VOTE_THREAD_DETAIL',
  TOGGLE_DOWN_VOTE_THREAD_DETAIL: 'TOGGLE_DOWN_VOTE_THREAD_DETAIL',
  TOGGLE_UP_VOTE_COMMENT: 'TOGGLE_UP_VOTE_COMMENT',
  TOGGLE_DOWN_VOTE_COMMENT: 'TOGGLE_DOWN_VOTE_COMMENT',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearTalkDetailActionCreator() {
  return {
    type: ActionType.CLEAR_TALK_DETAIL,
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function toggleUpVoteThreadDetailActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_THREAD_DETAIL,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleDownVoteThreadDetailActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_THREAD_DETAIL,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleUpVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function toggleDownVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearTalkDetailActionCreator());

    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncToggleUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, threadDetail } = getState();

    const isUpVoted = threadDetail.upVotesBy.includes(authUser.id);
    const isDownVoted = threadDetail.downVotesBy.includes(authUser.id);

    if (!isUpVoted && !isDownVoted) {
      dispatch(toggleUpVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));

      try {
        await api.upVoteThread(threadId);
      } catch (error) {
        alert(error.message);
        dispatch(toggleUpVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));
      }
    } else if (!isUpVoted && isDownVoted) {
      dispatch(toggleUpVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));
      dispatch(toggleDownVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));

      try {
        await api.upVoteThread(threadId);
      } catch (error) {
        alert(error.message);
        dispatch(toggleUpVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));
        dispatch(toggleDownVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));
      }
    } else {
      dispatch(toggleUpVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));

      try {
        await api.neutralizeThreadVote(threadId);
      } catch (error) {
        alert(error.message);
        dispatch(toggleUpVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));
      }
    }
    dispatch(hideLoading());
  };
}

function asyncToggleDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, threadDetail } = getState();

    const isUpVoted = threadDetail.upVotesBy.includes(authUser.id);
    const isDownVoted = threadDetail.downVotesBy.includes(authUser.id);

    if (!isDownVoted && !isUpVoted) {
      dispatch(toggleDownVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));

      try {
        await api.downVoteThread(threadId);
      } catch (error) {
        alert(error.message);
        dispatch(toggleDownVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));
      }
    } else if (!isDownVoted && isUpVoted) {
      dispatch(toggleDownVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));
      dispatch(toggleUpVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));

      try {
        await api.downVoteThread(threadId);
      } catch (error) {
        alert(error.message);
        dispatch(toggleDownVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));
        dispatch(toggleUpVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));
      }
    } else {
      dispatch(toggleDownVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));

      try {
        await api.neutralizeThreadVote(threadId);
      } catch (error) {
        alert(error.message);
        dispatch(toggleDownVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));
      }
    }
    dispatch(hideLoading());
  };
}

function asyncToggleUpVoteComment(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, threadDetail } = getState();

    console.log(threadDetail);

    let isUpVoted = false;
    let isDownVoted = false;
    const { comments } = threadDetail;
    for (const comment of comments) {
      if (comment.id === commentId && comment.upVotesBy.includes(authUser.id)) {
        isUpVoted = true;
        break;
      } else if (comment.id === commentId && comment.downVotesBy.includes(authUser.id)) {
        isDownVoted = true;
        break;
      }
    }

    if (!isUpVoted && !isDownVoted) {
      dispatch(
        toggleUpVoteCommentActionCreator({
          commentId,
          userId: authUser.id,
        })
      );

      try {
        await api.upVoteComment({ threadId: threadDetail.id, commentId });
      } catch (error) {
        alert(error.message);
        dispatch(
          toggleUpVoteCommentActionCreator({
            commentId,
            userId: authUser.id,
          })
        );
      }
    } else if (!isUpVoted && isDownVoted) {
      dispatch(
        toggleUpVoteCommentActionCreator({
          commentId,
          userId: authUser.id,
        })
      );
      dispatch(
        toggleDownVoteCommentActionCreator({
          commentId,
          userId: authUser.id,
        })
      );

      try {
        await api.upVoteComment({ threadId: threadDetail.id, commentId });
      } catch (error) {
        alert(error.message);
        dispatch(
          toggleUpVoteCommentActionCreator({
            commentId,
            userId: authUser.id,
          })
        );
        dispatch(
          toggleDownVoteCommentActionCreator({
            commentId,
            userId: authUser.id,
          })
        );
      }
    } else {
      dispatch(
        toggleUpVoteCommentActionCreator({
          commentId,
          userId: authUser.id,
        })
      );

      try {
        await api.neutralizeCommentVote({ threadId: threadDetail.id, commentId });
      } catch (error) {
        alert(error.message);
        dispatch(
          toggleUpVoteCommentActionCreator({
            commentId,
            userId: authUser.id,
          })
        );
      }
    }
    dispatch(hideLoading());
  };
}

function asyncToggleDownVoteComment(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, threadDetail } = getState();

    console.log(threadDetail);

    let isUpVoted = false;
    let isDownVoted = false;
    const { comments } = threadDetail;
    for (const comment of comments) {
      if (comment.id === commentId && comment.upVotesBy.includes(authUser.id)) {
        isUpVoted = true;
        break;
      } else if (comment.id === commentId && comment.downVotesBy.includes(authUser.id)) {
        isDownVoted = true;
        break;
      }
    }

    if (!isDownVoted && !isUpVoted) {
      dispatch(
        toggleDownVoteCommentActionCreator({
          commentId,
          userId: authUser.id,
        })
      );

      try {
        await api.downVoteComment({ threadId: threadDetail.id, commentId });
      } catch (error) {
        alert(error.message);
        dispatch(
          toggleDownVoteCommentActionCreator({
            commentId,
            userId: authUser.id,
          })
        );
      }
    } else if (!isDownVoted && isUpVoted) {
      dispatch(
        toggleDownVoteCommentActionCreator({
          commentId,
          userId: authUser.id,
        })
      );
      dispatch(
        toggleUpVoteCommentActionCreator({
          commentId,
          userId: authUser.id,
        })
      );

      try {
        await api.downVoteComment({ threadId: threadDetail.id, commentId });
      } catch (error) {
        alert(error.message);
        dispatch(
          toggleDownVoteCommentActionCreator({
            commentId,
            userId: authUser.id,
          })
        );
        dispatch(
          toggleUpVoteCommentActionCreator({
            commentId,
            userId: authUser.id,
          })
        );
      }
    } else {
      dispatch(
        toggleDownVoteCommentActionCreator({
          commentId,
          userId: authUser.id,
        })
      );

      try {
        await api.neutralizeCommentVote({ threadId: threadDetail.id, commentId });
      } catch (error) {
        alert(error.message);
        dispatch(
          toggleDownVoteCommentActionCreator({
            commentId,
            userId: authUser.id,
          })
        );
      }
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearTalkDetailActionCreator,
  addCommentActionCreator,
  toggleUpVoteThreadDetailActionCreator,
  toggleDownVoteThreadDetailActionCreator,
  toggleUpVoteCommentActionCreator,
  toggleDownVoteCommentActionCreator,
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
};
