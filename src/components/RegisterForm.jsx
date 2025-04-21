import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import InputEmail from './InputEmail';
import InputPassword from './InputPassword';

function RegisterForm({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const navigate = useNavigate('/');

  return (
    <form className="w-1/2 h-screen flex flex-col justify-center items-center">
      <h2 className="mb-2 font-[Poppins] font-bold text-3xl">
        Create your <span className="text-[#3D5AFE]">account</span>
      </h2>
      <p className="mb-7 font-[Open_Sans]">It's free and easy</p>
      <input
        type="text"
        id="name"
        className="w-7/10 mb-6 px-2 py-3 border-2 border-[#AAAAAA] rounded-md outline-none font-[Open_Sans] text-md placeholder-[#AAAAAA] focus:border-[#3D5AFE]"
        placeholder="Name"
        value={name}
        onChange={onNameChange}
      />
      <InputEmail email={email} onEmailChange={onEmailChange} />
      <InputPassword password={password} onPasswordChange={onPasswordChange} />
      <button
        type="button"
        className="w-7/10 py-3 bg-[#3D5AFE] outline-2 outline-transparent rounded-md font-[Poppins] font-bold text-xl text-white cursor-pointer transition hover:bg-transparent hover:outline-[#3D5AFE] hover:text-[#3D5AFE]"
        onClick={() => {
          register({ name, email, password });
          navigate('/');
        }}
      >
        Register
      </button>
    </form>
  );
}

RegisterForm.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterForm;
