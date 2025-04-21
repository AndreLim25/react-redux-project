import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { asyncAddThread } from '../states/threads/action';

function AddThreadForm() {
  const navigate = useNavigate();
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, onBodyChange] = useInput('');

  const dispatch = useDispatch();

  const addThread = ({ title, body, category }) => {
    dispatch(asyncAddThread({ title, body, category }));
  };

  return (
    <form className="w-6/10 mx-auto font-[Open_Sans] text-md">
      <input
        type="text"
        id="title"
        className="w-full mb-5 p-2 border-2 border-[#AAAAAA] rounded-md outline-none placeholder-[#AAAAAA] focus:border-[#3D5AFE]"
        placeholder="Title"
        value={title}
        onChange={onTitleChange}
      />
      <input
        type="text"
        id="category"
        className="w-full mb-5 p-2 border-2 border-[#AAAAAA] rounded-md outline-none placeholder-[#AAAAAA] focus:border-[#3D5AFE]"
        placeholder="Categories (e.g., RPG, Action)"
        value={category}
        onChange={onCategoryChange}
      />
      <textarea
        id="body"
        className="w-full min-h-42 mb-5 p-2 border-2 border-[#AAAAAA] rounded-md resize-none outline-none placeholder-[#AAAAAA] focus:border-[#3D5AFE]"
        placeholder="Your Thread"
        value={body}
        onChange={onBodyChange}
      ></textarea>
      <button
        type="button"
        className="w-full py-3 mb-5 bg-[#3D5AFE] outline-2 outline-transparent rounded-md font-[Poppins] font-bold text-xl text-white cursor-pointer transition hover:bg-white hover:outline-[#3D5AFE] hover:text-[#3D5AFE]"
        onClick={() => {
          addThread({ title, body, category });
          navigate('/');
        }}
      >
        Create
      </button>
    </form>
  );
}

export default AddThreadForm;
