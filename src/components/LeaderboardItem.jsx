import PropTypes from 'prop-types';

function LeaderboardItem({ rank, name, avatar, score }) {
  return (
    <div className="leaderboard-item px-5 py-4 bg-[#F8F8F8] rounded-md">
      <div className="item flex items-center font-[Open_Sans] font-semibold text-lg">
        <p className="w-2/10 text-[#3D5AFE]">{rank}</p>
        <div className="profile w-6/10 flex items-center gap-2">
          <img src={avatar} alt={`${name}'s profile`} className="w-12 h-fit rounded-full" />
          <p>{name}</p>
        </div>
        <p className="w-2/10 text-[#4F4F4F]">{score}</p>
      </div>
    </div>
  );
}

LeaderboardItem.propTypes = {
  rank: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default LeaderboardItem;
