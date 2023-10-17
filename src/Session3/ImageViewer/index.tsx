import React, { useState } from "react";
import styles from "./ImageViewer.module.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

type Props = {
  images: string[];
};

const previousIndex = (index: number, length: number) =>
  index == 0 ? length - 1 : index - 1;
const forwardIndex = (index: number, length: number) =>
  index == length - 1 ? 0 : index + 1;

export default function ImageViewer({ images }: Props) {
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
      </div>
      <div className={styles.thumbnailList}>
        {images.map((item, index) => (
          <div
            key={index}
            className={styles.thumbnail}
            onClick={() => {
              setCurrentImage(index);
            }}
          >
            <img alt={"img-" + index} src={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
