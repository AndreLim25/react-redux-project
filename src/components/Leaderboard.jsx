import PropTypes from 'prop-types';
import LeaderboardItem from './LeaderboardItem';

function Leaderboard({ leaderboards }) {
  return (
    <section className="leaderboard mb-5">
      <header className="w-6/10 mx-auto mb-4 px-5 flex font-[Roboto_Mono] font-bold">
        <h3 className="w-2/10">Rank</h3>
        <h3 className="w-6/10">User</h3>
        <h3 className="w-2/10">Score</h3>
      </header>
      <div className="leaderboard-list w-6/10 mx-auto flex flex-col gap-4">
        {leaderboards.map((leaderboard, index) => {
          return (
            <LeaderboardItem
              key={leaderboard.user.id}
              rank={index + 1}
              {...leaderboard.user}
              score={leaderboard.score}
            />
          );
        })}
      </div>
    </section>
  );
}

Leaderboard.propTypes = {
  leaderboard: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Leaderboard;
