import React, { Fragment, useState } from "react";
import styles from "./Quiz.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import OneChoice from "./OneChoice";
import MultipleChoice from "./MultipleChoice";
import FillInTheBlanks from "./FillInTheBlanks";
import ArrangeAnswers from "./ArrangeAnswers";

type Props = {};

const schema = yup
  .object({
    0: yup.string(),
    // .test("is-1", "Sai cmnr", (value) => value == "1 năm"),
    1: yup.array(yup.string()),
    2: yup.array(yup.string()),
    3: yup.array(yup.string()),
  })
  .required();
const questionlist = [
  {
    question: "Hai bàn tay của thầy Huấn có tổng cộng bao nhiêu ngón",
    questiontype: "onechoice",
    answerlist: ["8.5 ngón", "9 ngón", "9.5 ngón", "10 ngón"],
    answer: "9.5 ngón",
  },
  {
    question: "Thầy Huấn có những biệt danh gì",
    questiontype: "multiplechoice",
    answerlist: [
      "Huấn hoa cứt lợn",
      "Huấn hoa vạn thọ",
      "Huấn hoa hồng",
      "Huấn Rose",
    ],
    answer: ["Huấn hoa hồng", "Huấn Rose"],
  },
  {
    question: "Hãy điền vào chỗ trống",
    questiontype: "fillintheblanks",
    text: "Không ___ mà đòi có ăn thì chỉ có ăn ___, ăn ___.",
    answer: ["làm", "cứt", "đầu buồi"],
  },
  {
    question: "Thầy Huấn có những biệt danh gì",
    questiontype: "arrangeanswer",
    answerlist: [
      "Huấn hoa cứt lợn",
      "Huấn hoa vạn thọ",
      "Huấn hoa hồng",
      "Huấn Rose",
    ],
    answer: [
      "1_Huấn hoa cứt lợn",
      "2_Huấn hoa vạn thọ",
      "3_Huấn Rose",
      "4_Huấn hoa hồng",
    ],
  },
];
export default function Quiz({}: Props) {
  const [answerValidate, setAnswerValidate] = useState(<></>);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: any) => {
    let error = (
      <>
        {questionlist.map((item, index) => {
          return (
            <Fragment key={index}>
              {JSON.stringify(item.answer) !== JSON.stringify(data[index]) ? (
                <>
                  {"Câu số " + (index + 1) + " sai rồi bạn ơi"}
                  <br />
                </>
              ) : (
                ""
              )}
            </Fragment>
          );
        })}
      </>
    );
    setAnswerValidate(error);
    console.log(data);
  };
  return (
    <form className={styles.Quiz} onSubmit={handleSubmit(onSubmit)}>
      {questionlist.map((item, index) => {
        let question = <></>;
        item.questiontype == "onechoice"
          ? (question = (
              <OneChoice
                key={index}
                questionnumber={index.toString()}
                title={item.question}
                answerlist={item.answerlist}
                register={register}
              />
            ))
          : item.questiontype == "multiplechoice"
          ? (question = (
              <MultipleChoice
                key={index}
                questionnumber={index.toString()}
                title={item.question}
                answerlist={item.answerlist}
                register={register}
              />
            ))
          : item.questiontype == "fillintheblanks"
          ? (question = (
              <FillInTheBlanks
                key={index}
                questionnumber={index.toString()}
                title={item.question}
                text={item.text}
                register={register}
              />
            ))
          : (question = (
              <ArrangeAnswers
                register={register}
                answerlist={item.answerlist}
                questionnumber={index.toString()}
                title={item.question}
              />
            ));
        return question;
      })}

      <input type="submit" value={"Kiểm tra"} className={styles.submit} />
      <h4>{answerValidate}</h4>
    </form>
  );
}
