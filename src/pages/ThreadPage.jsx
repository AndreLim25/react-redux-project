import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CategorySearchBar from '../components/CategorySearchBar';
import Threads from '../components/Threads';
import { IoAddCircle } from 'react-icons/io5';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import { asyncToggleUpVoteThread, asyncToggleDownVoteThread } from '../states/threads/action';

function ThreadPage() {
  const navigate = useNavigate();
  const { users, threads, authUser } = useSelector((states) => ({
    users: states.users,
    threads: states.threads,
    authUser: states.authUser,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'GameHub | Threads';
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onAddClick = () => {
    navigate('/create-thread');
  };

  const onUpVoteThread = (threadId) => {
    dispatch(asyncToggleUpVoteThread(threadId));
  };

  const onDownVoteThread = (threadId) => {
    dispatch(asyncToggleDownVoteThread(threadId));
  };

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));

  return (
    <>
      <CategorySearchBar />
      {threadList ? (
        <Threads
          threads={threadList}
          upVoteThread={onUpVoteThread}
          downVoteThread={onDownVoteThread}
        />
      ) : (
        <></>
      )}

      <button
        type="button"
        className="fixed bottom-5 right-1 hover:opacity-70"
        onClick={onAddClick}
      >
        <IoAddCircle style={{ width: '45px', height: 'auto' }} />
      </button>
    </>
  );
}

export default ThreadPage;
