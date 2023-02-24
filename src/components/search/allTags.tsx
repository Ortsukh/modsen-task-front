import React, { useState } from "react";
import searchIcon from "../../assets/Vector.svg";
import styles from "./search.module.css";

type TagsProps = {
  tags: string[];
};

const AllTags = ({ tags }: TagsProps) => {
  return (
    <>
      {tags.length > 0 && (
        <div>
          <div className={styles.tags_title}>All tags</div>

          <div className={styles.tags}>
            {tags.map((tag, index) => (
              <span className={styles.tag} key={index}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AllTags;
