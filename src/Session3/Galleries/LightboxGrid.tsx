import React from "react";
import styles from "./LightboxGrid.module.css";
import { TfiClose } from "react-icons/tfi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

type Props = {
  images: string[];
  currentimage?: number;
  ispopupopen?: boolean;
};

export default function LightboxGrid({ images }: Props) {
  const [currentImage, setCurrentImage] = React.useState(0);
  const [isPopupOpen, SetIsPopupOpen] = React.useState(false);
  return (
    <div className={styles.GridContainer}>
      {images.map((item, index) => (
        <div
          key={index}
          className={styles.gridItem}
          onClick={() => {
            SetIsPopupOpen(true);
            setCurrentImage(index);
            console.log(isPopupOpen);
          }}
        >
          <img src={item} alt={"img-" + index} />
        </div>
      ))}
      <div
        className={styles.popupOverlay}
        style={
          isPopupOpen == false
            ? { visibility: "hidden", opacity: "0" }
            : { visibility: "visible", opacity: "1" }
        }
      >
        <div
          className={styles.popupBackground}
          onClick={() => SetIsPopupOpen(false)}
        ></div>
        <div className={styles.popupContainer}>
          <div
            className={styles.image}
            style={{
              backgroundImage: "url('" + images[currentImage] + "')",
            }}
          >
            <img
              className={styles.placeholderImage}
              src={images[currentImage]}
              alt={"img-" + currentImage}
            />
            {currentImage > 0 && (
              <div
                className={styles.previous}
                onClick={() => setCurrentImage(currentImage - 1)}
              >
                <MdKeyboardArrowLeft />
              </div>
            )}
            {currentImage < images.length - 1 && (
              <div
                className={styles.next}
                onClick={() => setCurrentImage(currentImage + 1)}
              >
                <MdKeyboardArrowRight />
              </div>
            )}
          </div>
          <div className={styles.description}>
            Image {currentImage + 1} of {images.length}
          </div>
          <div
            className={styles.closePopup}
            onClick={() => SetIsPopupOpen(false)}
          >
            <TfiClose />
          </div>
        </div>
      </div>
    </div>
  );
}
