// import React from "react";
import styles from "./Accordions.module.css";
import ButtonAccordions, { ButtonAccordionsMultiple } from "./ButtonAccordions";
import {
  TfiLayers,
  TfiPackage,
  TfiStatsUp,
  TfiLayoutMediaCenterAlt,
} from "react-icons/tfi";
import TextAccordions, { TextAccordionsMultiple } from "./TextAccorditions";

// type Props = {};
const data = [
  {
    title: "LET'S TALK TABS",
    icon: <TfiLayers />,
    name: "History",
    content:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
  },
  {
    title: "COOL TABS",
    icon: <TfiPackage />,
    name: "Approach",
    content:
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?",
  },
  {
    title: "SHORTER TABS",
    icon: <TfiStatsUp />,
    name: "Culture",
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est.",
  },
  {
    title: "LONGER TABS",
    icon: <TfiLayoutMediaCenterAlt />,
    name: "Method",
    content:
      "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
  },
];

export default function AccordionModules() {
  return (
    <div className={styles.AccordionModules}>
      <div className={styles.AccordionModulesContainer}>
        <h3 className={styles.AccordionTitle}>Button Accordions</h3>

        <div className={styles.twocol}>
          <div className={styles.AccordionSubtitle}>
            <h4>One at a time</h4>
            <ButtonAccordions tablist={data} />
          </div>
          <div className={styles.AccordionSubtitle}>
            <h4>Multiple open</h4>
            <ButtonAccordionsMultiple tablist={data} />
          </div>
        </div>
        <div className={styles.twocol}>
          <div className={styles.AccordionSubtitle}>
            <h4>One at a time</h4>
            <TextAccordions tablist={data} />
          </div>
          <div className={styles.AccordionSubtitle}>
            <h4>Multiple open</h4>
            <TextAccordionsMultiple tablist={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
