import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import InputEmail from './InputEmail';
import InputPassword from './InputPassword';

function LoginForm({ login }) {
  const navigate = useNavigate();
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const navigateToRegister = () => {
    navigate('/register');
  };

  return (
    <form className="w-1/2 h-screen flex flex-col justify-center items-center">
      <h2 className="mb-7 font-[Poppins] font-bold text-3xl text-[#3D5AFE]">
        Welcome <span className="text-black">Back</span>
      </h2>
      <InputEmail email={email} onEmailChange={onEmailChange} />
      <InputPassword password={password} onPasswordChange={onPasswordChange} />
      <button
        type="button"
        className="w-7/10 py-3 mb-3 bg-[#3D5AFE] outline-2 outline-transparent rounded-md font-[Poppins] font-bold text-xl text-white cursor-pointer transition hover:bg-transparent hover:outline-[#3D5AFE] hover:text-[#3D5AFE]"
        onClick={() => login({ email, password })}
      >
        Login
      </button>
      <p className="w-7/10 font-[Open_Sans] text-sm text-right">
        Don't have an account?{' '}
        <span
          className="font-semibold text-[#3D5AFE] cursor-pointer hover:underline hover:decoration-[#3D5AFE]"
          onClick={navigateToRegister}
        >
          Register
        </span>
      </p>
    </form>
  );
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginForm;
