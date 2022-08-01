import React, { useState } from "react";

type Props = {};

const Search = (props: Props) => {
  const [value, setValue] = useState("");

  return (
    <section className="r-width">
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className="w-full border-b-2 border-b-neutral-300 py-1 focus:outline-none"
        type="text"
        placeholder="Search Track"
      />
    </section>
  );
};

export default Search;
