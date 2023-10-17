import React from "react";
import styles from "./BlockUI1.module.css";

type Props = {
  text?: string;
  percentage?: number;
  darkcolor?: string;
  lightcolor?: string;
};
type BlockUI1Props = {
  percentages?: Props[];
};

const PercentageDiv = ({
  text,
  percentage,
  darkcolor = "red",
  lightcolor = "red",
}: Props) => {
  return (
    <div className={styles.percentageDiv}>
      <div className={styles.text} style={{ backgroundColor: darkcolor }}>
        {text}
      </div>
      <div className={styles.percentageBar}>
        <div
          className={styles.percentage}
          style={{ backgroundColor: lightcolor, width: `${percentage}%` }}
        >
          {percentage}%
        </div>
      </div>
    </div>
  );
};

export default function BlockUI1({ percentages }: BlockUI1Props) {
  return (
    <div className={styles.BlockUI1}>
      {percentages?.map((item, index) => (
        <PercentageDiv
          key={index}
          darkcolor={item.darkcolor}
          lightcolor={item.lightcolor}
          text={item.text}
          percentage={item.percentage}
        />
      ))}
    </div>
  );
}
