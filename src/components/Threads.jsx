import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';

function Threads({ threads, upVoteThread, downVoteThread }) {
  return (
    <section className="threads w-9/10 mx-auto my-7 flex flex-col gap-8">
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          {...thread}
          upVoteThread={upVoteThread}
          downVoteThread={downVoteThread}
        />
      ))}
      ;
    </section>
  );
}

Threads.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.object).isRequired,
  upVoteThread: PropTypes.func.isRequired,
  downVoteThread: PropTypes.func.isRequired,
};

export default Threads;
