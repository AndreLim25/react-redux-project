import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function AddCommentForm({ addComment }) {
  const [content, onContentChange, setContent] = useInput('');

  return (
    <section className="w-9/10 mx-auto">
      <form className="mb-5 px-3 pt-1 pb-3 bg-[#F8F8F8] rounded-md flex flex-col">
        <textarea
          id="content"
          className="w-full min-h-24 outline-none resize-none font-[Open_Sans] placeholder-[#AAAAAA]"
          placeholder="Type your comment here"
          value={content}
          onChange={onContentChange}
        ></textarea>
        <button
          type="button"
          className="w-fit mt-3 px-4 py-1 bg-[#3D5AFE] outline-2 outline-transparent rounded-sm self-end font-[Poppins] font-medium text-white cursor-pointer transition hover:bg-transparent hover:outline-[#3D5AFE] hover:text-[#3D5AFE]"
          onClick={() => {
            addComment({ content });
            setContent('');
          }}
        >
          Send
        </button>
      </form>
    </section>
  );
}

AddCommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default AddCommentForm;
