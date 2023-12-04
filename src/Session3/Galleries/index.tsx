import React from "react";
import styles from "./Galleries.module.css";
import StandardSlider from "./StandardSlider";
import SliderThumbnail from "./SliderThumbnail";
import LightboxGrid from "./LightboxGrid";

export default function Galleries() {
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
            `${process.env.PUBLIC_URL}/Day03/Galleries/1.jpg`,
            `${process.env.PUBLIC_URL}/Day03/Galleries/2.jpg`,
            `${process.env.PUBLIC_URL}/Day03/Galleries/3.jpg`,
            `${process.env.PUBLIC_URL}/Day03/Galleries/4.jpg`,
          ]}
        />
        <h3 className={styles.title}>Slider Thumbnail Controls</h3>
        <span className={styles.description}>
          Image slider gallery with thumbnail controls. Initialize with
          'slider-thumb-controls' class.
        </span>
        <SliderThumbnail
          images={[
            `${process.env.PUBLIC_URL}/Day03/Galleries/1.jpg`,
            `${process.env.PUBLIC_URL}/Day03/Galleries/2.jpg`,
            `${process.env.PUBLIC_URL}/Day03/Galleries/3.jpg`,
            `${process.env.PUBLIC_URL}/Day03/Galleries/4.jpg`,
          ]}
        />
        <h3 className={styles.title}>Lightbox Grid Gallery</h3>
        <span className={styles.description}>
          A simple lightbox grid with square thumbnails.
        </span>
        <LightboxGrid
          images={[
            `${process.env.PUBLIC_URL}/Day03/Galleries/1.jpg`,
            `${process.env.PUBLIC_URL}/Day03/Galleries/2.jpg`,
            `${process.env.PUBLIC_URL}/Day03/Galleries/3.jpg`,
            `${process.env.PUBLIC_URL}/Day03/Galleries/4.jpg`,
            `${process.env.PUBLIC_URL}/Day03/Galleries/5.jpg`,
            `${process.env.PUBLIC_URL}/Day03/Galleries/6.jpg`,
            `${process.env.PUBLIC_URL}/Day03/Galleries/7.jpg`,
            `${process.env.PUBLIC_URL}/Day03/Galleries/8.jpg`,
          ]}
        />
      </div>
    </div>
  );
}
