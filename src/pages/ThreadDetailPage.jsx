import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ThreadItem from '../components/ThreadItem';
import AddCommentForm from '../components/AddCommentForm';
import Comments from '../components/Comments';
import { asyncToggleUpVoteThread, asyncToggleDownVoteThread } from '../states/threads/action';
import {
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
} from '../states/threadDetail/action';

function ThreadDetailPage() {
  const { id } = useParams();
  const { threadDetail, authUser } = useSelector((states) => ({
    threadDetail: states.threadDetail,
    authUser: states.authUser,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const addComment = ({ content }) => {
    dispatch(asyncAddComment({ threadId: id, content }));
  };

  const onUpVoteThread = (threadId) => {
    dispatch(asyncToggleUpVoteThread(threadId));
  };

  const onDownVoteThread = (threadId) => {
    dispatch(asyncToggleDownVoteThread(threadId));
  };

  const onUpVoteComment = (commentId) => {
    dispatch(asyncToggleUpVoteComment(commentId));
  };

  const onDownVoteComment = (commentId) => {
    dispatch(asyncToggleDownVoteComment(commentId));
  };

  return (
    <>
      {threadDetail == null ? (
        <></>
      ) : (
        <>
          <section className="thread-detail w-9/10 mx-auto mt-24">
            <ThreadItem
              {...threadDetail}
              user={threadDetail.owner}
              authUser={authUser.id}
              upVoteThread={onUpVoteThread}
              downVoteThread={onDownVoteThread}
            />
          </section>
          <h2 className="w-9/10 mx-auto my-6 font-[Poppins] font-bold text-xl">
            Comments ({threadDetail.comments.length})
          </h2>
          <AddCommentForm addComment={addComment} />
          <Comments
            comments={threadDetail.comments}
            authUser={authUser.id}
            upVoteComment={onUpVoteComment}
            downVoteComment={onDownVoteComment}
          />
        </>
      )}
    </>
  );
}

export default ThreadDetailPage;
