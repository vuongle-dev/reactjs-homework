import React, { ReactElement, useState } from "react";
import styles from "./LoveButton.module.css";
import { VscHeartFilled } from "react-icons/vsc";
type Props = {
  icon?: ReactElement;
  activeicon?: ReactElement;
  text?: string;
};

const AnimateButton = ({ icon, activeicon = icon, text }: Props) => {
  const [active, setActive] = useState("inactive");
  const Click = () => {
    active == "active" ? setActive("inactive") : setActive("active");
  };
  return (
    <div
      id={styles.Button}
      className={`${active == "active" ? styles.inactive : styles.active}`}
      onClick={Click}
    >
      <div
        id={styles.outerIcon}
        // className={`${active == "active" ? styles.inactive : styles.active}`}
      >
        {activeicon}
      </div>{" "}
      <div
        id={styles.innerIcon}
        // className={`${active == "active" ? styles.inactive : styles.active}`}
      >
        {icon}
      </div>
      <span id={styles.text}>{text}</span>
    </div>
  );
};

export default function LoveButton({ icon }: Props) {
  return (
    <div className={styles.buttonContainer}>
      <AnimateButton
        icon={<VscHeartFilled />}
        activeicon={<VscHeartFilled />}
        text="Love"
      />
    </div>
  );
}
