import PropTypes from 'prop-types';

function InputPassword({ password, onPasswordChange }) {
  return (
    <input
      type="password"
      id="password"
      className="w-7/10 mb-6 px-2 py-3 border-2 border-[#AAAAAA] rounded-md outline-none font-[Open_Sans] text-md placeholder-[#AAAAAA] focus:border-[#3D5AFE]"
      placeholder="Password"
      value={password}
      onChange={onPasswordChange}
    />
  );
}

InputPassword.propTypes = {
  password: PropTypes.string.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
};

export default InputPassword;
