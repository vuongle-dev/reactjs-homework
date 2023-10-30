import React, {
  ReactElement,
  StyleHTMLAttributes,
  useEffect,
  useState,
} from "react";
import styles from "./MyCards.module.css";
import RiderReview, { NormalPageTemplate } from "../RiderReview";
import { GoogleColorfulIcon, MastercardColorfulIcon } from "../../../icon";

type Props = {
  setNextPage(data: {
    change: string;
    effect: string;
    component: ReactElement;
  }): void;
};

type cardProps = {
  card: string;
  icon?: ReactElement;
};

const CardPick = ({
  title,
  cardlist,
  style,
}: {
  title?: string;
  cardlist?: cardProps[];
  style?: React.CSSProperties;
}) => {
  const [pick, setPick] = useState(0);
  return (
    <div className={styles.CardPick} style={style}>
      {title}
      <div className={styles.cardList}>
        {cardlist &&
          cardlist.map((card, index) => (
            <div key={index} className={styles.card}>
              <label
                htmlFor={index.toString()}
                className={`${styles.cardlabel} ${
                  index === pick ? styles.active : styles.inactive
                }`}
                onClick={() => {
                  setPick(index);
                }}
              >
                <div className={styles.cardIcon}>{card.icon}</div>
                {card.card}
              </label>
              <input
                type="radio"
                name={"cardpick-" + title}
                value={card.card}
                id={index.toString()}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default function MyCards({ setNextPage }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <NormalPageTemplate
      title="My Cards"
      submitbutton="Add"
      backPage={
        <RiderReview
          riderinfo={{
            name: "William Adams",
            avatar: "Day03/FigmaApp/avatar.png",
            career: "Delivery Man",
            delivered: true,
          }}
          setNextPage={setNextPage}
        />
      }
      setNextPage={setNextPage}
    >
      <CardPick
        cardlist={[
          { icon: <MastercardColorfulIcon />, card: "MasterCard" },
          {
            icon: <GoogleColorfulIcon width={20} height={20} />,
            card: "Google Pay",
          },
        ]}
      />
    </NormalPageTemplate>
  );
}
