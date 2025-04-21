import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function NavigationBar({ signOut }) {
  const navigate = useNavigate();

  const navigateToThreadPage = () => {
    navigate('/');
  };

  const navigateToLeaderboardPage = () => {
    navigate('/leaderboard');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 px-5 py-3 bg-black flex justify-between items-center text-white">
      <h2 className="font-[Poppins] font-bold text-2xl">GameHub</h2>
      <ul className="flex gap-5 font-[Roboto_Mono] font-bold text-sm">
        <li
          className="cursor-pointer hover:underline hover:decoration-white"
          onClick={navigateToThreadPage}
        >
          Threads
        </li>
        <li
          className="cursor-pointer hover:underline hover:decoration-white"
          onClick={navigateToLeaderboardPage}
        >
          Leaderboard
        </li>
        <li
          className="cursor-pointer hover:underline hover:decoration-white"
          onClick={() => {
            signOut();
            navigate('/');
          }}
        >
          Logout
        </li>
      </ul>
    </nav>
  );
}

NavigationBar.propTypes = {
  signOut: PropTypes.func.isRequired,
};

export default NavigationBar;
