import React from "react";
import styles from "./FigmaApp.module.css";
import OnboardScreen from "./OnboardScreen";
type Props = {};

export default function FigmaApp({}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.mobileFrame}>
        <OnboardScreen
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
      </div>
    </div>
  );
}
