import React, { useState } from "react";
import searchIcon from "../../assets/Vector.svg";
import styles from "./search.module.css";

type TagsProps = {
  tags: string[];
};

const AllTags = ({ tags }: TagsProps) => {
  console.log(tags);
  
  return (
    <>
      {tags.length > 0 && <div className={styles.tags_title}>All tags</div>}
    {tags.length > 0 &&
    <div className={styles.tags}>
      {tags.map((tag, index) => (
        <span className={styles.tag} key={index}>
          {tag}
        </span>
      ))}
    </div>}
    </>
  );
};

export default AllTags;
