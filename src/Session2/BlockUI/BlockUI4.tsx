// import React, { ReactElement } from "react";
import styles from "./BlockUI4.module.css";

type Props = {
  title?: string;
  number?: string;
  percentage?: number[];
};
type BlockUI4Props = {
  analyticswidgets: Props[];
};
type PercentageProps = {
  percentage?: number;
  text?: string;
  color?: string;
};
const PercentageColumn = ({
  percentage = 10,
  text,
  color = "red",
}: PercentageProps) => {
  return (
    <div className={styles.PercentageColumn}>
      <div className={styles.percentageBar}>
        <div
          className={styles.percentage}
          style={{ height: `${percentage}%`, backgroundColor: color }}
        ></div>
      </div>
      <span className={styles.percentageText}>{text}</span>
    </div>
  );
};
const PercentageList = ({ percentage }: Props) => {
  return (
    <div className={styles.percentageList}>
      {percentage && (
        <>
          <PercentageColumn
            percentage={percentage[0]}
            text="Mon"
            color="#F75354"
          />
          <PercentageColumn
            percentage={percentage[1]}
            text="Tue"
            color="#51D567"
          />
          <PercentageColumn
            percentage={percentage[2]}
            text="Wed"
            color="#FCD518"
          />
          <PercentageColumn
            percentage={percentage[3]}
            text="Thu"
            color="#31C8DD"
          />
          <PercentageColumn
            percentage={percentage[4]}
            text="Fri"
            color="#F78153"
          />
        </>
      )}
    </div>
  );
};
const AnalyticsWidget = ({
  title,
  number,
  percentage = [30, 20, 60, 70, 60],
}: Props) => {
  return (
    <div className={styles.AnalyticsWidget}>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.number}>{number}</div>
      </div>
      <PercentageList percentage={percentage} />
    </div>
  );
};

export default function BlockUI4({ analyticswidgets }: BlockUI4Props) {
  return (
    <div className={styles.BlockUI4}>
      {analyticswidgets.map((item, index) => (
        <AnalyticsWidget
          key={index}
          title={item.title}
          number={item.number}
          percentage={item.percentage}
        />
      ))}
    </div>
  );
}
