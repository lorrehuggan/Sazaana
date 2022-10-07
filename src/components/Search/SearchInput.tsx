import { useAppSelector } from "@/lib/Redux/hooks";
import { RootState } from "@/lib/Redux/store";
import React from "react";
import useKeyPress from "../../lib/hooks/useKeyPress";

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
  const trackData = useAppSelector((state: RootState) => state.dataState.data);

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
        <button
          className="color-transition rounded-lg bg-primary p-1 font-bold text-primary-content hover:bg-primary-content hover:text-primary"
          onClick={handleSearch}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
        {trackData && (
          <button
            onClick={resetApp}
            className="color-transition rounded-lg bg-secondary p-1 font-bold text-secondary-content hover:bg-secondary-content hover:text-secondary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
