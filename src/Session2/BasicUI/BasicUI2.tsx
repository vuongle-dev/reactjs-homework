// import React from "react";
import styles from "./BasicUI2.module.css";

type Props = {
  title?: string;
  category?: string;
  stars?: number;
  ratingnumber?: string;
  price?: number;
  image?: string;
};
export const Reviewstars = ({ stars = 3.5, size = 24, gap = 5 }) => {
  let star = [];
  for (let i = 0; i < 5; i++) {
    i <= stars - 1
      ? star.push(1)
      : stars - 1 < i && i < stars
      ? star.push(stars % 1)
      : star.push(0);
  }

  return (
    <div className={styles.starlist} style={{ gap: gap }}>
      {star.map((item, index) => (
        <div
          key={index}
          style={{ width: size, height: size, position: "relative" }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 256 256"
            style={{ position: "absolute" }}
          >
            <defs>
              <mask
                id={stars.toString()}
                x="0"
                y="0"
                width="100%"
                height="100%"
              >
                <path
                  fill="white"
                  d="M243.3,115.3c-16.7,19.3-46.3,51.2-46.3,51.2s4.8,35,7.6,59c1.2,12.2-8.1,17.5-18.6,12.7c-20-9.5-50.4-24.3-57.2-27.6c-7,3.3-37.7,17.8-57.8,27.3c-10.6,4.7-20-0.5-18.8-12.7c2.7-23.9,7.6-58.9,7.6-58.9s-29.9-31.8-46.9-51.1c-6-7-2.1-17,9.7-18.8C46.5,92,83.8,85.2,83.8,85.2s20.4-35.6,33.3-57.5c7.1-13.3,12-11.8,12.9-11.4c2.2,0.7,5.6,3.3,10.2,11.4c12.8,21.9,32.9,57.6,32.9,57.6s36.9,6.9,60.6,11.2C245.4,98.3,249.2,108.3,243.3,115.3z"
                />
              </mask>
            </defs>
            <path
              stroke="#00000040"
              strokeWidth="30px"
              fill="none"
              d="M243.3,115.3c-16.7,19.3-46.3,51.2-46.3,51.2s4.8,35,7.6,59c1.2,12.2-8.1,17.5-18.6,12.7c-20-9.5-50.4-24.3-57.2-27.6c-7,3.3-37.7,17.8-57.8,27.3c-10.6,4.7-20-0.5-18.8-12.7c2.7-23.9,7.6-58.9,7.6-58.9s-29.9-31.8-46.9-51.1c-6-7-2.1-17,9.7-18.8C46.5,92,83.8,85.2,83.8,85.2s20.4-35.6,33.3-57.5c7.1-13.3,12-11.8,12.9-11.4c2.2,0.7,5.6,3.3,10.2,11.4c12.8,21.9,32.9,57.6,32.9,57.6s36.9,6.9,60.6,11.2C245.4,98.3,249.2,108.3,243.3,115.3z"
            />
            <rect
              x="0"
              y="0"
              preserveAspectRatio="xMidYMid slice"
              width={item * 100 + "%"}
              height="100%"
              style={{ fill: "#F5B401" }}
              mask={"url(#" + stars.toString() + ")"}
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default function BasicUI2({
  title = "No Title",
  category = "No Category",
  stars = 0,
  ratingnumber = "00",
  price = 0,
  image,
}: Props) {
  return (
    <div className={styles.ProductItem}>
      <img className={styles.image} alt={title} src={image} />
      <div className={styles.category}>{category}</div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.rating}>
          <div className={styles.stars}>
            <Reviewstars stars={stars} size={16} />
          </div>
          <div className={styles.ratingnumber}>{ratingnumber}</div>
        </div>
        <div className={styles.price}>${price}</div>
      </div>
    </div>
  );
}
