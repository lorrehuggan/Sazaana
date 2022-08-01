import React, { useState } from "react";
import { Switch } from "@headlessui/react";

type Props = {};

const Search = (props: Props) => {
  const [value, setValue] = useState("");
  const [enabled, setEnabled] = useState(false);

  return (
    <section className="r-width border-b-2 border-b-neutral-300 pt-4">
      <h1 className="display-font mb-4 font-display text-4xl">
        Discover new music with the help of old favorites
      </h1>
      <div className="flex items-center">
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          className=" w-full py-1 focus:outline-none"
          type="text"
          placeholder={`Search By ${enabled ? "Track" : "Artist"}`}
        />
        <Switch
          data-testid="search-switch"
          checked={enabled}
          onChange={setEnabled}
          className={`${
            enabled ? "bg-c-pink-300" : "bg-c-pink-400"
          } relative mx-1 inline-flex h-6 w-11 items-center rounded-full transition-all duration-200 ease-in-out`}
        >
          <span
            className={`${
              enabled ? "translate-x-5 sm:translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-200 ease-in-out`}
          />
        </Switch>
      </div>
    </section>
  );
};

export default Search;
