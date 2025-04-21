import useInput from '../hooks/useInput';

function CategorySearchBar({ onSearch }) {
  const [category, onCategoryChange] = useInput('');

  return (
    <form className="w-9/10 mx-auto mt-24 flex justify-end">
      <div className="w-4/11">
        <input
          type="text"
          id="category"
          className="peer w-7/10 px-2 py-2 border-2 border-[#AAAAAA] rounded-l-sm outline-none font-[Open_Sans] placeholder-[#AAAAAA] transition focus:border-[#3D5AFE]"
          placeholder="RPG, Action"
          value={category}
          onChange={onCategoryChange}
        />
        <button
          type="button"
          className="w-3/10 px-5 py-2 bg-[#AAAAAA] rounded-r-sm font-[Poppins] font-bold text-lg text-white cursor-pointer transition peer-focus:bg-[#3D5AFE]"
          onClick={() => onSearch(category)}
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default CategorySearchBar;
