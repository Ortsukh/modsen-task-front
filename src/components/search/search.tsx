import React, { useState } from "react";
import searchIcon from "../../assets/Vector.svg";
import styles from "./search.module.css";

type SearchProps = {
    filterNotesByTag:(tag: string)=> void
  };

const Search = ({filterNotesByTag}:SearchProps) => {
  const [searchTags, setSearchTags] = useState("");

  const titleChangeHandler = (event: any) => {
    setSearchTags(event.target.value);
  };
  const handleKeyDown = (event:any) => {
    if (event.key === 'Enter') {
        filterNotesByTag(searchTags)
      // 👇 Get input value
    //   setUpdated(message);
    }
  };
  return (
    <div className={styles.search}>
      <img src={searchIcon} alt="Search tags" />

      <input
        placeholder="Search tag..."
        className={styles.search_field}
        onChange={titleChangeHandler}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Search;
