import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import thumbsUpIcon from '../assets/thumbs-up.png';
import activeThumbsUpIcon from '../assets/thumbs-up-active.png';
import thumbsDownIcon from '../assets/thumbs-down.png';
import activeThumbsDownIcon from '../assets/thumbs-down-active.png';
import commentIcon from '../assets/comment.png';
import { postedAt } from '../utils';

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
  totalComments = null,
  user,
  authUser,
  upVoteThread,
  downVoteThread,
}) {
  const navigate = useNavigate();
  const categories = category.split(', ');
  const isThreadUpVoted = upVotesBy.includes(authUser);
  const isThreadDownVoted = downVotesBy.includes(authUser);

  const onTitleClick = () => {
    navigate(`/threads/${id}`);
  };

  const onCommentClick = () => {
    navigate(`/threads/${id}`);
  };

  const onUpVoteClick = (event) => {
    event.stopPropagation();
    upVoteThread(id);
  };

  const onDownVoteClick = (event) => {
    event.stopPropagation();
    downVoteThread(id);
  };

  return (
    <article className="p-4 bg-[#F8F8F8] rounded-md flex flex-col gap-4 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),_0_4px_6px_-2px_rgba(0,0,0,0.05)] font-[Open_Sans]">
      <div className="flex justify-between items-center">
        <div className="profile w-3/10 flex items-center gap-2">
          <img
            src={user.avatar}
            alt={`${user.name}'s profile`}
            className="w-9 h-fit rounded-full"
          />
          <p className="font-semibold">{user.name}</p>
        </div>
        <div className="category flex items-center gap-3 font-[Roboto_Mono]">
          {categories.map((category) => (
            <p
              key={id}
              className="px-2 py-1 border-2 border-[#3D5AFE] rounded-md font-bold text-[#3D5AFE] text-sm"
            >
              #{category}
            </p>
          ))}
        </div>
      </div>
      <h1
        className="font-[Roboto_Mono] font-bold text-[#3D5AFE] text-2xl cursor-pointer hover:opacity-80"
        onClick={onTitleClick}
      >
        {title}
      </h1>
      {document.title === 'GameHub | Threads' ? (
        <p>{body.substring(0, 200).concat('...')}</p>
      ) : (
        <p>{body}</p>
      )}
      <div className="flex justify-between items-center">
        <div className="interaction flex gap-7">
          <button className="flex items-center gap-1">
            {isThreadUpVoted ? (
              <img
                src={activeThumbsUpIcon}
                alt="Active thumbs up icon"
                className="w-6 h-fit cursor-pointer hover:opacity-70"
                onClick={onUpVoteClick}
              />
            ) : (
              <img
                src={thumbsUpIcon}
                alt="Thumbs up icon"
                className="w-6 h-fit cursor-pointer hover:opacity-70"
                onClick={onUpVoteClick}
              />
            )}
            {upVotesBy.length}
          </button>
          <button className="flex items-center gap-1">
            {isThreadDownVoted ? (
              <img
                src={activeThumbsDownIcon}
                alt="Active thumbs down icon"
                className="w-6 h-fit cursor-pointer hover:opacity-70"
                onClick={onDownVoteClick}
              />
            ) : (
              <img
                src={thumbsDownIcon}
                alt="Thumbs down icon"
                className="w-6 h-fit cursor-pointer hover:opacity-70"
                onClick={onDownVoteClick}
              />
            )}
            {downVotesBy.length}
          </button>
          {totalComments ? (
            <div className="flex items-center gap-1 cursor-pointer hover:opacity-70">
              <img
                src={commentIcon}
                alt="Comment icon"
                className="w-6 h-fit"
                onClick={onCommentClick}
              />
              {totalComments}
            </div>
          ) : null}
        </div>
        <p className="font-semibold text-[#4F4F4F]">{postedAt(createdAt)}</p>
      </div>
    </article>
  );
}

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string),
  downVotesBy: PropTypes.arrayOf(PropTypes.string),
  totalComments: PropTypes.number,
  user: PropTypes.objectOf(PropTypes.string).isRequired,
  authUser: PropTypes.string.isRequired,
  upVoteThread: PropTypes.func.isRequired,
  downVoteThread: PropTypes.func.isRequired,
};

export default ThreadItem;
