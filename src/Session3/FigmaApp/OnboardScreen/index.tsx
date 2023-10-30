import React, { ReactElement, ReactNode, useState } from "react";
import styles from "./OnboardScreen.module.css";
import { type } from "os";
import SignUp from "../SignUp";

type Props = {
  logo?: string;
  slide: SlideProps[];
  setNextPage(data: {
    change: string;
    effect: string;
    component: ReactElement;
  }): void;
};
type SlideProps = {
  images?: string;
  backgroundmage?: string;
  title?: string;
  description?: string;
};

const SlideItem = ({
  images,
  backgroundmage = "Day03/FigmaApp/background1.svg",
  title,
  description,
}: SlideProps) => {
  return (
    <div className={styles.SlideItem}>
      <div
        className={styles.slideTop}
        style={{ backgroundImage: "url(" + backgroundmage + ")" }}
      >
        <img className={styles.slideImage} src={images} alt={title} />
      </div>
      <div className={styles.slideContent}>
        <h3>{title}</h3>
        <span>{description}</span>
      </div>
    </div>
  );
};

const SlideNavigation = ({
  currentSlide = 0,
  setCurrentSlide,
  slide,
}: {
  currentSlide?: number;
  setCurrentSlide(data: number): void /* get function from parent */;
  slide: SlideProps[];
}) => {
  return (
    <div className={styles.SlideNavigation}>
      {slide.map((item, index) => (
        <div
          key={index}
          className={`${styles.normalNavigation} ${
            index == currentSlide ? styles.currentNavigation : ""
          }`}
          onClick={() => setCurrentSlide(index)}
        ></div>
      ))}
    </div>
  );
};

export const Button = (props: any) => {
  return (
    <button {...props} className={`${styles.button} ${props.className}`}>
      {props.children}
    </button>
  );
};
export default function OnboardScreen({
  logo = "Day03/FigmaApp/logo.svg",
  slide,
  setNextPage,
}: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <div className={styles.container}>
      <img className={styles.logo} src={logo} alt="logo" />
      <div className={styles.slideContainer}>
        <div
          className={styles.slide}
          style={{ transform: `translateX(-${currentSlide * 375}px)` }}
        >
          {slide.map((item, index) => (
            <SlideItem key={index} {...item} />
          ))}
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <SlideNavigation
          slide={slide}
          currentSlide={currentSlide}
          setCurrentSlide={
            setCurrentSlide
          } /* Parsing function to child component */
        />
        <div className={styles.buttonsContainer}>
          <div
            id={styles.skipButton}
            className={currentSlide == slide.length - 1 ? styles.hide : ""}
            onClick={() =>
              setNextPage({
                change: "next",
                effect: "vertical",
                component: (
                  <SignUp
                    logo="Day03/FigmaApp/logo.svg"
                    title="Getting Started"
                    description="Create an account to continue!"
                    setNextPage={setNextPage}
                  />
                ),
              })
            }
          >
            Skip
          </div>
          <Button
            id={styles.nextButton}
            style={currentSlide == slide.length - 1 ? { width: "100%" } : {}}
            onClick={() => {
              currentSlide < slide.length - 1
                ? setCurrentSlide((currentSlide) => currentSlide + 1)
                : setNextPage({
                    change: "next",
                    effect: "vertical",
                    component: (
                      <SignUp
                        logo="Day03/FigmaApp/logo.svg"
                        title="Getting Started"
                        description="Create an account to continue!"
                        setNextPage={setNextPage}
                      />
                    ),
                  });
            }}
          >
            {currentSlide == slide.length - 1 ? "Let's Get Started" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}
