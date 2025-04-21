import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

function Comments({ comments, authUser, upVoteComment, downVoteComment }) {
  return (
    <section className="comments mb-6 flex flex-col gap-6 font-[Open_Sans]">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          {...comment}
          authUser={authUser}
          upVoteComment={upVoteComment}
          downVoteComment={downVoteComment}
        />
      ))}
    </section>
  );
}

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  authUser: PropTypes.string.isRequired,
};

export default Comments;
