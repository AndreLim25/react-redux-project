import api from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_UP_VOTE_THREAD: 'TOGGLE_UP_VOTE_THREAD',
  TOGGLE_DOWN_VOTE_THREAD: 'TOGGLE_DOWN_VOTE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function toggleUpVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleDownVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncToggleUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, threads } = getState();

    let isUpVoted = false;
    let isDownVoted = false;
    for (const thread of threads) {
      if (thread.id === threadId && thread.upVotesBy.includes(authUser.id)) {
        isUpVoted = true;
        break;
      } else if (thread.id === threadId && thread.downVotesBy.includes(authUser.id)) {
        isDownVoted = true;
        break;
      }
    }

    if (!isUpVoted && !isDownVoted) {
      dispatch(toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));

      try {
        await api.upVoteThread(threadId);
      } catch (error) {
        alert(error.message);
        dispatch(toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));
      }
    } else if (!isUpVoted && isDownVoted) {
      dispatch(toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));
      dispatch(toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id }));

      try {
        await api.upVoteThread(threadId);
      } catch (error) {
        alert(error.message);
        dispatch(toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));
        dispatch(toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id }));
      }
    } else {
      dispatch(toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));

      try {
        await api.neutralizeThreadVote(threadId);
      } catch (error) {
        alert(error.message);
        dispatch(toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));
      }
    }
    dispatch(hideLoading());
  };
}

function asyncToggleDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, threads } = getState();

    let isDownVoted = false;
    let isUpVoted = false;
    for (const thread of threads) {
      if (thread.id === threadId && thread.downVotesBy.includes(authUser.id)) {
        isDownVoted = true;
        break;
      } else if (thread.id === threadId && thread.upVotesBy.includes(authUser.id)) {
        isUpVoted = true;
        break;
      }
    }

    if (!isDownVoted && !isUpVoted) {
      dispatch(toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id }));

      try {
        await api.downVoteThread(threadId);
      } catch (error) {
        alert(error.message);
        dispatch(toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id }));
      }
    } else if (!isDownVoted && isUpVoted) {
      dispatch(toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id }));
      dispatch(toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));

      try {
        await api.downVoteThread(threadId);
      } catch (error) {
        alert(error.message);
        dispatch(toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id }));
        dispatch(toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));
      }
    } else {
      dispatch(toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id }));

      try {
        await api.neutralizeThreadVote(threadId);
      } catch (error) {
        alert(error.message);
        dispatch(toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id }));
      }
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  toggleUpVoteThreadActionCreator,
  toggleDownVoteThreadActionCreator,
  asyncAddThread,
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
};
