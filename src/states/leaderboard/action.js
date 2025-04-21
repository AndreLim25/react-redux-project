import api from '../../utils/api';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

const ActionType = {
  GET_LEADERBOARD: 'GET_LEADERBOARD',
};

function getLeaderboardActionCreator(leaderboard) {
  return {
    type: ActionType.GET_LEADERBOARD,
    payload: {
      leaderboard,
    },
  };
}

function asyncGetLeaderboard() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const leaderboard = await api.getLeaderboard();
      dispatch(getLeaderboardActionCreator(leaderboard));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

export { ActionType, getLeaderboardActionCreator, asyncGetLeaderboard };
