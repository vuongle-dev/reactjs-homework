import React, { ReactElement, useState } from "react";
import ReactDomServer from "react-dom/server";
import styles from "./RateButton.module.css";
import { AiFillStar } from "react-icons/ai";
import { url } from "inspector";

type Props = {
  stars?: number;
  gap?: number;
  size?: number;
  icon?: ReactElement;
  color?: string;
};
const ReviewstarsAnimate = ({
  stars = 3.5,
  gap = 5,
  size = 16,
  icon = <AiFillStar />,
  color = "#F5B401",
}: Props) => {
  const [newstars, setNewstars] = useState(stars);
  let star = [];
  for (let i = 0; i < 5; i++) {
    i <= newstars - 1
      ? star.push(1)
      : newstars - 1 < i && i < newstars
      ? star.push(stars % 1)
      : star.push(0);
  }
  return (
    <div className={styles.starlist} style={{ gap: gap }}>
      {star.map((item, index) => (
        <label
          htmlFor={item.toString()}
          key={index}
          onClick={() => setNewstars(index + 1)}
          style={{ width: size, height: size, fontSize: size }}
        >
          <input type="radio" name="reviewstars" value={item} />
          {icon}
          <div
            style={{
              width: item * 100 + "%",
              height: "100%",
              color: color,
              fontSize: size,
            }}
          >
            {icon}
          </div>
        </label>
      ))}
    </div>
  );
};

export default ReviewstarsAnimate;
