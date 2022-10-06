import React from "react";

interface Props {
  value: string;
  handleSearch: () => void;
  resetApp: () => void;
  handleInput: React.ChangeEventHandler<HTMLInputElement>;
}

export function SearchInput({
  value,
  handleInput,
  handleSearch,
  resetApp,
}: Props) {
  return (
    <div className="mt-10 flex items-center">
      <input
        data-testid="search-input"
        name="Artist"
        value={value}
        onChange={handleInput}
        className="w-full bg-transparent py-1 text-2xl font-bold focus:outline-none"
        type="text"
        placeholder={`Search Your Favorite Artist`}
      />
      <div className="flex gap-2">
        <button onClick={handleSearch}>Search</button>
        <span
          onClick={resetApp}
          className="color-transition cursor-pointer text-xs lg:text-base lg:hover:text-primary"
        >
          Reset
        </span>
      </div>
    </div>
  );
}
