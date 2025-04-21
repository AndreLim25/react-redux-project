import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from '../components/LoginForm';
import bgImage from '../assets/background.jpg';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  useEffect(() => {
    document.title = 'GameHub | Login';
  }, []);

  return (
    <>
      <div
        className="w-1/2 h-screen bg-size-[1280px] bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <h1 className="ms-3 mt-3 font-[Poppins] font-bold text-2xl text-white">GameHub</h1>
      </div>
      <LoginForm login={onLogin} />
    </>
  );
}

export default LoginPage;
