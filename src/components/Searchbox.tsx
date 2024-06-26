import { useState } from 'react';

export default function Searchbox() {
  const colors = ['green', 'blue'];

  const [input, setInput] = useState('');
  const [searchResults, setSearchResults] = useState(colors);

  const handleSearch = (e: any) => {
    const searchValue = e.target.value;
    setInput(searchValue);
    const filteredResults = colors.filter((item) =>
      item.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setSearchResults(filteredResults);
  };

  const color = searchResults[0] || '';

  return (
    <div className="m-[20px]">
      <h1 className="my-[20px]" style={{ color: color }}>
        title
      </h1>
      <input
        type="text"
        className="border-[1px] mb-[20px]"
        onChange={handleSearch}
        value={input}
      />
      <div>
        <span>list:</span>
        <ul className="mt-[10px]">
          {searchResults.map((el) => (
            <li key={el}>{el}</li>
          ))}
        </ul>
      </div>
      <button
        className="border-[1px] p-[5px] mt-[20px]"
        onClick={() => {
          setInput('');
          setSearchResults(colors);
        }}
      >
        clear
      </button>
    </div>
  );
}
