import React, { ReactElement, useState } from "react";
import styles from "./RiderReview.module.css";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Button } from "../OnboardScreen";
import { FaStar } from "react-icons/fa";
import ReviewstarsAnimate from "../../RateButton";
import SignUp from "../SignUp";
import MyCards from "../MyCards";

type RiderInfoProps = {
  avatar?: string;
  name?: string;
  career?: string;
  delivered?: boolean;
  rate?: number;
};
type Props = {
  riderinfo?: RiderInfoProps;
  setNextPage(data: {
    change: string;
    effect: string;
    component: ReactElement;
  }): void;
};

type TextAreaProps = {
  name?: string;
  icon?: React.ReactElement;
  iconcolor?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
};

const TextArea = ({
  name,
  icon,
  iconcolor,
  value,
  placeholder,
  required = true,
  rows = 1,
}: TextAreaProps) => {
  return (
    <div className={styles.inputContainer}>
      {name && <div className={styles.inputname}>{name}</div>}
      <div className={styles.input}>
        <textarea
          name={name}
          id={`styles.${name}`}
          defaultValue={value}
          placeholder={placeholder}
          required={required}
          rows={rows}
        />
        {icon && (
          <div className={styles.icon} style={{ color: iconcolor }}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export const NormalPageTemplate = ({
  title,
  submitbutton,
  backPage,
  nextPage,
  setNextPage,
  ...props
}: any) => {
  return (
    <div {...props} className={`${styles.container} ${props.className}`}>
      <div className={styles.topBar}>
        <div
          className={styles.backButton}
          onClick={() =>
            setNextPage({
              change: "back",
              effect: "horizontal",
              component: backPage,
            })
          }
        >
          <MdKeyboardArrowLeft />
        </div>
        <h1 className={styles.title}>{title}</h1>
      </div>
      {props.children}
      <Button
        id={styles.submitButton}
        onClick={() =>
          setNextPage({
            change: "next",
            effect: "horizontal",
            component: nextPage,
          })
        }
      >
        {submitbutton}
      </Button>
    </div>
  );
};

const RiderInfo = (props: any) => {
  return (
    <div {...props} className={`${styles.RiderInfo} ${props.className}`}>
      <div className={styles.avatar}>
        <img src={props.riderinfo.avatar} alt={props.riderinfo.name} />
      </div>
      <div className={styles.content}>
        <h2 className={styles.name}>{props.riderinfo.name}</h2>
        <span>{props.riderinfo.career}</span>
      </div>
      <div
        className={styles.deliverStatus}
        style={
          props.riderinfo.delivered
            ? { color: "#27AE60" }
            : { color: "#BBBDC1" }
        }
      >
        <div
          className={styles.statusDot}
          style={
            props.riderinfo.delivered
              ? { backgroundColor: "#27AE60" }
              : { backgroundColor: "#BBBDC1" }
          }
        />
        {props.riderinfo.delivered ? "Order Delivered" : "Order Delivering"}
      </div>
    </div>
  );
};

const RiderRating = ({ rate = 5 }: RiderInfoProps) => {
  return (
    <div className={styles.RiderRating}>
      <div className={styles.title}>Please Rate Delivery Service</div>
      <ReviewstarsAnimate
        stars={5}
        gap={16}
        size={32}
        icon={<FaStar />}
        color="#FFA133"
      />
    </div>
  );
};

const ButtonPick = ({
  title = "Add Tips",
  buttonlist = ["No Tips", "$5", "$10", "$15", "$20"],
  style,
}: {
  title?: string;
  buttonlist?: string[];
  style?: React.CSSProperties;
}) => {
  const [pick, setPick] = useState(0);
  return (
    <div className={styles.ButtonPick} style={style}>
      {title}
      <div className={styles.buttonList}>
        {buttonlist.map((button, index) => (
          <label
            htmlFor={button}
            key={index}
            className={`${styles.button} ${
              index === pick ? styles.active : styles.inactive
            }`}
            onClick={() => setPick(index)}
          >
            {button}
            <input
              type="radio"
              name={"buttonpick-" + title}
              value={button}
              id={button}
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default function RiderReview({ riderinfo, setNextPage }: Props) {
  // const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <NormalPageTemplate
      title="Rider Review"
      submitbutton="Submit Review"
      backPage={
        <SignUp
          logo={`${process.env.PUBLIC_URL}/Day03/FigmaApp/logo.svg`}
          title="Getting Started"
          description="Create an account to continue!"
          setNextPage={setNextPage}
        />
      }
      nextPage={<MyCards setNextPage={setNextPage} />}
      setNextPage={setNextPage}
    >
      <RiderInfo riderinfo={riderinfo} />
      <form className={styles.normalform}>
        <RiderRating rate={riderinfo?.rate} />
        <ButtonPick style={{ paddingTop: 48, paddingBottom: 34 }} />
        <TextArea placeholder="Add a comment" rows={7} />
      </form>
    </NormalPageTemplate>
  );
}
