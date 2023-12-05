import React, { ReactElement, useState } from "react";
import styles from "./LikeButton.module.css";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
type Props = {
  icon?: ReactElement;
  activeicon?: ReactElement;
  text?: string;
};

const AnimateButton = ({ icon, activeicon = icon, text }: Props) => {
  const [active, setActive] = useState<"active" | "inactive">("inactive");
  const Click = () => {
    active === "active" ? setActive("inactive") : setActive("active");
  };
  if (active === "inactive")
    return (
      <div className={`${styles.Button} ${styles.inactive}`} onClick={Click}>
        {icon} {text}
      </div>
    );
  else
    return (
      <div className={`${styles.Button} ${styles.active}`} onClick={Click}>
        {activeicon} {text}
      </div>
    );
};

export default function LikeButton({ icon }: Props) {
  return (
    <AnimateButton
      icon={<AiOutlineLike />}
      activeicon={<AiFillLike />}
      text="Like"
    />
  );
}
