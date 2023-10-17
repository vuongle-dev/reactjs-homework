import React from "react";
import styles from "./BasicUI1.module.css";
type Props = {
  category?: string;
  subcategory?: any[];
  catimage?: string;
};

export default function BasicUI1({ category, subcategory, catimage }: Props) {
  return (
    <div className={styles.Widget}>
      <img className={styles.catimage} alt={category} src={catimage}></img>
      <div className={styles.content}>
        <h2 className={styles.categoryName}>{category}</h2>
        <ul className={styles.subcategory}>
          {subcategory instanceof Array &&
            subcategory.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      </div>
    </div>
  );
}
