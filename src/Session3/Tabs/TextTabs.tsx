import React, { useState } from "react";
import styles from "./TextTabs.module.css";

type TabProps = {
  name?: string;
  content?: string;
};
type TabListProps = {
  tablist: TabProps[];
};

const TextTabs = ({ tablist }: TabListProps) => {
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
      <div className={styles.content}>{tablist[currentTab].content}</div>
    </div>
  );
};

export default TextTabs;
