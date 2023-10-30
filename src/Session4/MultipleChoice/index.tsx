import React from "react";
import styles from "./MultipleChoice.module.css";
import * as yup from "yup";

type Props = {};

type AnswerProps = {
  answer: string;
  icon?: React.ReactElement;
};

const MultipleChoice = ({
  title,
  answerlist,
  style,
  questionnumber,
  register,
}: {
  title: string;
  answerlist?: string[];
  style?: React.CSSProperties;
  questionnumber: string;
  register: any;
}) => {
  const Alphabet = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
  const [pick, setPick] = React.useState<number[]>([]);
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
                  pick.includes(index) ? styles.active : ""
                }`}
                onClick={() => {
                  pick.includes(index)
                    ? setPick((pick) => pick.filter((i) => i != index))
                    : setPick((pick) => [...pick, index]);
                }}
              >
                {Alphabet[index]}. {answer}
              </label>
              <input
                type="checkbox"
                {...register(questionnumber)}
                value={answer}
                id={questionnumber + "-" + index}
                defaultChecked={pick.includes(index)}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default MultipleChoice;
