import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CategorySearchBar from '../components/CategorySearchBar';
import Threads from '../components/Threads';
import { IoAddCircle } from 'react-icons/io5';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import { asyncToggleUpVoteThread, asyncToggleDownVoteThread } from '../states/threads/action';

function ThreadPage() {
  const navigate = useNavigate();
  const [threadList, setThreadList] = useState([]);
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

  useEffect(() => {
    if (threads.length > 0) {
      const enrichedThreads = threads.map((thread) => ({
        ...thread,
        user: users.find((user) => user.id === thread.ownerId),
        authUser: authUser.id,
      }));
      setThreadList(enrichedThreads);
    }
  }, [threads, users, authUser]);

  const onAddClick = () => {
    navigate('/create-thread');
  };

  const onSearchClick = (key) => {
    if (key) {
      const keys = key.toLowerCase().split(', ');

      const result = threads
        .filter((thread) => {
          const categories = thread.category.toLowerCase().split(', ');
          return keys.some((k) => categories.includes(k));
        })
        .map((filteredThread) => ({
          ...filteredThread,
          user: users.find((user) => user.id === filteredThread.ownerId),
          authUser: authUser.id,
        }));

      setThreadList(result);
    } else {
      const result = threads.map((thread) => ({
        ...thread,
        user: users.find((user) => user.id === thread.ownerId),
        authUser: authUser.id,
      }));
      setThreadList(result);
    }
  };

  const onUpVoteThread = (threadId) => {
    dispatch(asyncToggleUpVoteThread(threadId));
  };

  const onDownVoteThread = (threadId) => {
    dispatch(asyncToggleDownVoteThread(threadId));
  };

  return (
    <>
      <CategorySearchBar onSearch={onSearchClick} />
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
