import React from "react";
import styles from "./OneChoice.module.css";

// type Props = {};

// type AnswerProps = {
//   answer: string;
//   icon?: React.ReactElement;
// };

const OneChoice = ({
  questionnumber,
  title,
  answerlist,
  style,
  register,
}: {
  questionnumber: string;
  title: string;
  answerlist?: string[];
  style?: React.CSSProperties;
  register: any;
}) => {
  const Alphabet = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
  const [pick, setPick] = React.useState(0);
  return (
    <div className={styles.answerPick} style={style}>
      {title}
      <div className={styles.answerList}>
        {answerlist &&
          answerlist.map((answer, index) => (
            <div key={index} className={styles.answer}>
              <label
                htmlFor={questionnumber + "-" + index}
                className={`${styles.answerlabel} ${
                  index === pick ? styles.active : styles.inactive
                }`}
                onClick={() => {
                  setPick(index);
                }}
              >
                {Alphabet[index]}. {answer}
              </label>
              <input
                {...register(questionnumber)}
                type="radio"
                value={answer}
                id={questionnumber + "-" + index}
                defaultChecked={index === pick}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default OneChoice;
