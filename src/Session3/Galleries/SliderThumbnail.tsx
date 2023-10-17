import React, { useEffect, useState } from "react";
import styles from "./SliderThumbnail.module.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

type Props = {
  images: string[];
};

const previousIndex = (index: number, length: number) =>
  index == 0 ? length - 1 : index - 1;
const forwardIndex = (index: number, length: number) =>
  index == length - 1 ? 0 : index + 1;

export default function SliderThumbnail({ images }: Props) {
  const [currentImage, setCurrentImage] = useState(0);
  useEffect(() => {
    const autoSwitch = setTimeout(
      () => setCurrentImage(forwardIndex(currentImage, images.length)),
      3000
    );
    return () => clearInterval(autoSwitch);
  });

  return (
    <div className={styles.SliderThumbnail}>
      <ul
        className={styles.slide}
        style={{ transform: `translate(-${currentImage * 90}vw,0)` }}
      >
        {images.map((item, index) => (
          <li
            key={index}
            className={`${styles.slideitem} ${
              index == currentImage && styles.currentThumbnail
            }`}
          >
            <img alt={"img-" + index} src={item} />
          </li>
        ))}
      </ul>
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
      <ul className={styles.thumbnailList}>
        {images.map((item, index) => (
          <li
            key={index}
            className={`${styles.thumbnail} ${
              index == currentImage && styles.currentThumbnail
            }`}
            onClick={() => {
              setCurrentImage(index);
            }}
          >
            <img alt={"img-" + index} src={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
