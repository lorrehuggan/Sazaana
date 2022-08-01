import React, { useState } from "react";
import { Switch } from "@headlessui/react";

type Props = {};

const Search = (props: Props) => {
  const [value, setValue] = useState("");
  const [enabled, setEnabled] = useState(false);

  return (
    <section className="r-width flex items-center border-b-2 border-b-neutral-300">
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className=" w-full py-1 focus:outline-none"
        type="text"
        placeholder="Search Track"
      />
      <Switch
        data-testId="search-switch"
        checked={enabled}
        onChange={setEnabled}
        className={`${
          enabled ? "bg-blue-300" : "bg-gray-200"
        } relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200 ease-in-out`}
      >
        <span className="sr-only">Enable notifications</span>
        <span
          className={`${
            enabled ? "translate-x-5" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-200 ease-in-out`}
        />
      </Switch>
    </section>
  );
};

export default Search;
