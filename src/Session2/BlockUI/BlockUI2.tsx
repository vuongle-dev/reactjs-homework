import React, { ReactElement } from "react";
import styles from "./BlockUI2.module.css";

type Props = {
  text?: string;
  percentage?: number;
  color?: string;
  icon?: ReactElement;
};
type BlockUI2Props = {
  percentages?: Props[];
};
const PercentageDiv = ({ text, percentage, color = "red", icon }: Props) => {
  return (
    <div className={styles.percentageDiv}>
      <div className={styles.text}>
        <div className={styles.icon} style={{ background: color }}>
          {icon}
        </div>
        {text}
      </div>
      <div className={styles.percentageBar}>
        <div
          className={styles.percentage}
          style={{ backgroundColor: color, width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default function BlockUI2({ percentages }: BlockUI2Props) {
  return (
    <div className={styles.BlockUI2}>
      {percentages?.map((item, index) => (
        <PercentageDiv
          key={index}
          color={item.color}
          text={item.text}
          percentage={item.percentage}
          icon={item.icon}
        />
      ))}
    </div>
  );
}
