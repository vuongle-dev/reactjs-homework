import React, { ReactElement } from "react";
import styles from "./BlockUI3.module.css";

type Props = {
  title?: string;
  subtitle?: string;
  icon?: ReactElement;
  backgroundcolor?: string;
};
type BlockUI3Props = {
  socialwidgets: Props[];
};

const SocialWidget = ({
  title,
  subtitle,
  icon,
  backgroundcolor = "black",
}: Props) => {
  return (
    <div
      className={styles.SocialWidget}
      style={{ background: backgroundcolor }}
    >
      <div className={styles.icon}>{icon}</div>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.subtitle}>{subtitle}</span>
      </div>
    </div>
  );
};

export default function BlockUI3({ socialwidgets }: BlockUI3Props) {
  return (
    <div className={styles.BlockUI3}>
      {socialwidgets.map((item, index) => (
        <SocialWidget
          key={index}
          title={item.title}
          subtitle={item.subtitle}
          backgroundcolor={item.backgroundcolor}
          icon={item.icon}
        />
      ))}
    </div>
  );
}
