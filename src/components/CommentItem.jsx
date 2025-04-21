import PropTypes from 'prop-types';
import thumbsUpIcon from '../assets/thumbs-up.png';
import activeThumbsUpIcon from '../assets/thumbs-up-active.png';
import thumbsDownIcon from '../assets/thumbs-down.png';
import activeThumbsDownIcon from '../assets/thumbs-down-active.png';
import { postedAt } from '../utils';

function CommentItem({
  id,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  authUser,
  upVoteComment,
  downVoteComment,
}) {
  const isCommentUpVoted = upVotesBy.includes(authUser);
  const isCommentDownVoted = downVotesBy.includes(authUser);

  const onUpVoteClick = (event) => {
    event.stopPropagation();
    upVoteComment(id);
  };

  const onDownVoteClick = (event) => {
    event.stopPropagation();
    downVoteComment(id);
  };

  return (
    <div className="comment w-9/10 mx-auto p-4 bg-[#F8F8F8] rounded-md flex flex-col gap-4 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),_0_4px_6px_-2px_rgba(0,0,0,0.05)]">
      <div className="profile w-3/10 flex items-center gap-2">
        <img
          src={owner.avatar}
          alt={`${owner.name}'s profile`}
          className="w-9 h-fit rounded-full"
        />
        <p className="font-semibold">{owner.name}</p>
      </div>
      <p>{content}</p>
      <div className="flex justify-between items-center">
        <div className="interaction flex gap-7">
          <button className="flex items-center gap-1">
            {isCommentUpVoted ? (
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
            {isCommentDownVoted ? (
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
        </div>
        <p className="font-semibold text-[#4F4F4F]">{postedAt(createdAt)}</p>
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.objectOf(PropTypes.string).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string),
  downVotesBy: PropTypes.arrayOf(PropTypes.string),
  authUser: PropTypes.string.isRequired,
  upVoteComment: PropTypes.func.isRequired,
  downVoteComment: PropTypes.func.isRequired,
};

export default CommentItem;
