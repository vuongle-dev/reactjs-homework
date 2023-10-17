import React, { useState } from "react";
import styles from "./VerticalButtons.module.css";

type TabProps = {
  name?: string;
  title?: string;
  content?: string;
};
type TabListProps = {
  tablist: TabProps[];
};

const VerticalButtons = ({ tablist }: TabListProps) => {
  const [currentTab, SetCurrentTab] = useState(0);
  return (
    <div className={styles.TabContainer}>
      <div className={styles.TabList}>
        {tablist.map((item, index) => (
          <div
            key={index}
            className={`${styles.Tab} ${
              index == currentTab ? styles.currentTab : styles.inactiveTab
            }`}
            onClick={() => SetCurrentTab(index)}
          >
            {item.name}
          </div>
        ))}
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{tablist[currentTab].title}</div>
        {tablist[currentTab].content}
      </div>
    </div>
  );
};

export default VerticalButtons;
