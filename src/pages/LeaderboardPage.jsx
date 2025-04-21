import { useEffect } from 'react';
import Leaderboard from '../components/Leaderboard';
import { asyncGetLeaderboard } from '../states/leaderboard/action';
import { useDispatch, useSelector } from 'react-redux';

function LeaderboardPage() {
  const { leaderboards } = useSelector((states) => ({
    leaderboards: states.leaderboard,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'GameHub | Leaderboard';
    dispatch(asyncGetLeaderboard());
  }, [dispatch]);

  return (
    <>
      <h1 className="w-fit mx-auto mt-24 mb-10 font-[Poppins] font-bold text-3xl">Leaderboard</h1>
      {leaderboards ? <Leaderboard leaderboards={leaderboards} /> : <></>}
    </>
  );
}

export default LeaderboardPage;
