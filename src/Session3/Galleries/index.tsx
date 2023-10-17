import React from "react";
import styles from "./Galleries.module.css";
import StandardSlider from "./StandardSlider";
import SliderThumbnail from "./SliderThumbnail";

type Props = {};

export default function Galleries({}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.containerItem}>
        <h3 className={styles.title}>Standard Slider</h3>
        <span className={styles.description}>
          Image slider gallery with all controls. Initialize with
          'slider-all-controls' class.
        </span>
        <StandardSlider
          images={[
            "Day03/Galleries/1.jpg",
            "Day03/Galleries/2.jpg",
            "Day03/Galleries/3.jpg",
            "Day03/Galleries/4.jpg",
          ]}
        />
        <h3 className={styles.title}>Slider Thumbnail Controls</h3>
        <span className={styles.description}>
          Image slider gallery with thumbnail controls. Initialize with
          'slider-thumb-controls' class.
        </span>
        <SliderThumbnail
          images={[
            "Day03/Galleries/1.jpg",
            "Day03/Galleries/2.jpg",
            "Day03/Galleries/3.jpg",
            "Day03/Galleries/4.jpg",
          ]}
        />
      </div>
    </div>
  );
}
