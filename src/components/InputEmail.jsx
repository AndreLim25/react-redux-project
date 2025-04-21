import PropTypes from 'prop-types';

function InputEmail({ email, onEmailChange }) {
  return (
    <input
      type="text"
      id="email"
      className="w-7/10 mb-6 px-2 py-3 border-2 border-[#AAAAAA] rounded-md outline-none font-[Open_Sans] text-md placeholder-[#AAAAAA] focus:border-[#3D5AFE]"
      placeholder="Email"
      value={email}
      onChange={onEmailChange}
    />
  );
}

InputEmail.propTypes = {
  email: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
};

export default InputEmail;
