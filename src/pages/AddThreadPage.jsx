import { useEffect } from 'react';
import AddThreadForm from '../components/AddThreadForm';

function AddThreadPage() {
  useEffect(() => {
    document.title = 'GameHub | Add Thread';
  }, []);

  return (
    <>
      <h1 className="w-fit mx-auto mt-24 mb-10 font-[Poppins] font-bold text-3xl">
        Create New Thread
      </h1>
      <AddThreadForm />
    </>
  );
}

export default AddThreadPage;
