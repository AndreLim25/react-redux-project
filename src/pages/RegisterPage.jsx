import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import RegisterForm from '../components/RegisterForm';
import bgImage from '../assets/background.jpg';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
  };

  useEffect(() => {
    document.title = 'GameHub | Register';
  }, []);

  return (
    <>
      <div
        className="w-1/2 h-screen bg-size-[1280px] bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <h1 className="ms-3 mt-3 font-[Poppins] font-bold text-2xl text-white">GameHub</h1>
      </div>
      <RegisterForm register={onRegister} />
    </>
  );
}

export default RegisterPage;
