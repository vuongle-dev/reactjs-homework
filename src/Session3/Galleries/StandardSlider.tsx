import React, { useState } from "react";
import styles from "./StandardSlider.module.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

type Props = {
  images: string[];
};

const previousIndex = (index: number, length: number) =>
  index == 0 ? length - 1 : index - 1;
const forwardIndex = (index: number, length: number) =>
  index == length - 1 ? 0 : index + 1;

export default function StandardSlider({ images }: Props) {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className={styles.ImageViewer}>
      <div
        className={styles.image}
        style={{
          background: "url('" + images[currentImage] + "')",
        }}
      >
        <div
          className={styles.previoustButton}
          onClick={() =>
            setCurrentImage(previousIndex(currentImage, images.length))
          }
        >
          <MdKeyboardArrowLeft />
        </div>
        <div
          className={styles.nextButton}
          onClick={() =>
            setCurrentImage(forwardIndex(currentImage, images.length))
          }
        >
          <MdKeyboardArrowRight />
        </div>
        <div className={styles.navigationList}>
          {images.map((item, index) => (
            <div
              key={index}
              className={`${styles.navigation} ${
                index == currentImage && styles.currentNavigation
              }`}
              onClick={() => {
                setCurrentImage(index);
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
