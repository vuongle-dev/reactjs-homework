import React, { useState } from "react";
import styles from "./ButtonAccordions.module.css";

type AccordionProps = {
  name?: string;
  content?: string;
};
type AccordionListProps = {
  tablist: AccordionProps[];
};

const ButtonAccordions = ({ tablist }: AccordionListProps) => {
  const [currentAccordion, SetCurrentAccordion] = useState(0);
  return (
    <ul className={styles.AccordionContainer}>
      {tablist.map((item, index) => (
        <li
          key={index}
          className={`${styles.Accordion} ${
            index == currentAccordion
              ? styles.currentAccordion
              : styles.inactiveAccordion
          }`}
        >
          <div
            className={styles.AccordionName}
            onClick={() => SetCurrentAccordion(index)}
          >
            {item.name}
          </div>

          <div className={styles.content}>
            {index == currentAccordion && <p>{item.content}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
};

export const ButtonAccordionsMultiple = ({ tablist }: AccordionListProps) => {
  const [openAccordions, SetOpenAccordions] = useState<number[]>([]);
  const ClickHandle = (index: number) => {
    openAccordions.includes(index)
      ? SetOpenAccordions((oldOpenAccordions) =>
          oldOpenAccordions.splice(oldOpenAccordions.indexOf(index))
        )
      : SetOpenAccordions((oldOpenAccordions) => [...oldOpenAccordions, index]);
  };
  return (
    <ul className={styles.AccordionContainer}>
      {tablist.map((item, index) => (
        <li
          key={index}
          className={`${styles.Accordion} ${
            openAccordions.includes(index)
              ? styles.currentAccordion
              : styles.inactiveAccordion
          }`}
        >
          <div
            className={styles.AccordionName}
            onClick={() => ClickHandle(index)}
          >
            {item.name}
          </div>

          <div className={styles.content}>
            {openAccordions.includes(index) && <p>{item.content}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ButtonAccordions;
