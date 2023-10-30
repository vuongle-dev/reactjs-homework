import React from "react";
import styles from "./FillInTheBlanks.module.css";
import * as yup from "yup";

type Props = {};

type AnswerProps = {
  answer: string;
  icon?: React.ReactElement;
};

const FillInTheBlanks = ({
  title,
  text,
  style,
  questionnumber,
  register,
}: {
  title: string;
  text?: string;
  style?: React.CSSProperties;
  questionnumber: string;
  register: any;
}) => {
  const [pick, setPick] = React.useState<number[]>([]);
  const processedText = text?.split("___");
  return (
    <div className={styles.answerPick} style={style}>
      {title}
      <div className={styles.answerList}>
        <div className={styles.answer}>
          {processedText &&
            processedText.map((answer, index) => (
              <React.Fragment key={index}>
                {answer}
                {index != processedText.length - 1 && (
                  <input
                    type="text"
                    {...register(questionnumber + "[" + index + "]")}
                    style={{ minWidth: 100 }}
                  />
                )}
              </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FillInTheBlanks;
