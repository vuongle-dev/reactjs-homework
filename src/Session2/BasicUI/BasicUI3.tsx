// import React, { ReactElement } from "react";
import styles from "./BasicUI3.module.css";

type Props = {
  title?: string;
  category?: string;
  publishdate?: string;
  thumbnail?: string;
  author?: string;
};

export default function BasicUI3({
  title = "No Title",
  category = "No Category",
  publishdate,
  thumbnail,
  author,
}: Props) {
  return (
    <div className={styles.PostItem}>
      <img className={styles.thumbnail} alt={title} src={thumbnail} />
      <div className={styles.content}>
        <div className={styles.category}>{category}</div>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.publish}>
          {publishdate} by <span>{author}</span>
        </div>
      </div>
    </div>
  );
}
