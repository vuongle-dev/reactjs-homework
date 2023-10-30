import React from "react";
import styles from "./FigmaApp.module.css";
import OnboardScreen from "./OnboardScreen";
import SignUp from "./SignUp";
import RiderReview from "./RiderReview";
type Props = {};

export default function FigmaApp({}: Props) {
  const [currentPage, setCurrentPage] = React.useState(<></>);
  const [nextPage, setNextPage] = React.useState({
    change: "no",
    effect: "horizontal",
    component: <></>,
  });
  const [beginNavigate, setBeginNavigate] = React.useState({
    change: "no",
    effect: "horizontal",
    component: <></>,
  });
  React.useEffect(() => {
    setCurrentPage(
      <OnboardScreen
        setNextPage={setNextPage}
        slide={[
          {
            images: "Day03/FigmaApp/banner1.svg",
            title: "Choose a Favourite Food",
            description:
              "When you oder Eat Steet, we'll hook you up with exclusive coupon, specials and rewards",
          },
          {
            images: "Day03/FigmaApp/banner2.svg",
            backgroundmage: "Day03/FigmaApp/background2.svg",
            title: "Hot Delivery to Home",
            description:
              "We make food ordering fasr, simple and free-no matter if you order online or cash",
          },
          {
            images: "Day03/FigmaApp/banner3.svg",
            title: "Receive the Great Food",
            description:
              "You’ll receive the great food within a hour. And get free delivery credits for every order.",
          },
        ]}
      />
    );
    console.log("Set Default CurrentPage");
  }, []);

  React.useEffect(() => {
    nextPage.change != "no" && setBeginNavigate(nextPage);
    nextPage.change != "no" &&
      setTimeout(() => {
        setCurrentPage(nextPage.component);
        console.log("Set CurrentPage to NextPage");
        setBeginNavigate({
          change: "no",
          effect: "horizontal",
          component: <></>,
        });
      }, 500);
  }, [nextPage]);
  let navigatestyle =
    beginNavigate.change == "back"
      ? beginNavigate.effect == "vertical"
        ? styles.backvertical
        : beginNavigate.effect == "horizontal"
        ? styles.backhorizontal
        : ""
      : beginNavigate.change == "next"
      ? beginNavigate.effect == "vertical"
        ? styles.nextvertical
        : beginNavigate.effect == "horizontal"
        ? styles.nexthorizontal
        : ""
      : "";
  return (
    <div className={styles.container}>
      <div className={styles.mobileFrame}>
        <div
          className={`${styles.navigationContainer} ${
            beginNavigate.change == "back" ? navigatestyle : ""
          }`}
        >
          {nextPage.component}
        </div>

        <div
          className={`${styles.navigationContainer} ${
            beginNavigate.change == "next" ? navigatestyle : ""
          }`}
        >
          {currentPage}
        </div>
      </div>
    </div>
  );
}
