import React, { ReactElement } from "react";
import styles from "./BlockUI6.module.css";
import { FaShoppingCart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

type Props = {
  productname?: string;
  description?: string;
  variants?: string;
  price?: number;
  ogprice?: number;
  image?: string;
};
type ProductWidgetProps = {
  ProductWidgetType: Props;
};
type BlockUI6Props = {
  ProductWidgets: Props[];
};

type buttonProps = {
  text?: string;
  icon?: ReactElement;
  color?: string;
  backgroundcolor?: string;
};

const Button = ({ text, icon, color, backgroundcolor }: buttonProps) => {
  return (
    <div
      className={styles.button}
      style={{ backgroundColor: backgroundcolor, color: color }}
    >
      {icon} {text}
    </div>
  );
};

type contentProps = {
  productname?: string;
  description?: string;
};

const Content = ({
  productname,
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
}: contentProps) => {
  return (
    <div className={styles.content}>
      <h3 className={styles.productname}>{productname}</h3>
      <span className={styles.description}>{description}</span>
    </div>
  );
};

type orderProps = {
  variant?: string;
  ogprice?: number;
  price?: number;
};

const Order = ({
  variant = "XL / XXL / S",
  ogprice,
  price = 25,
}: orderProps) => {
  return (
    <div className={styles.order}>
      <div className={styles.variant}>{variant}</div>
      <div className={styles.price}>
        ${price} {ogprice && <span>${ogprice}</span>}
      </div>
      <Button
        text="Add to cart"
        icon={<FaShoppingCart />}
        color="#fff"
        backgroundcolor="#4EC67F"
      />
    </div>
  );
};

const ProductWidget = ({ ProductWidgetType }: ProductWidgetProps) => {
  return (
    <div className={styles.ProductWidget}>
      <img
        className={styles.image}
        src={ProductWidgetType.image}
        alt={ProductWidgetType.productname}
      />
      <Content
        productname={ProductWidgetType.productname}
        description={ProductWidgetType.description}
      />
      <Order
        variant={ProductWidgetType.variants}
        price={ProductWidgetType.price}
        ogprice={ProductWidgetType.ogprice}
      />
    </div>
  );
};

export default function BlockUI6({ ProductWidgets }: BlockUI6Props) {
  return (
    <div className={styles.BlockUI6}>
      {ProductWidgets.map((item, index) => (
        <ProductWidget key={index} ProductWidgetType={item} />
      ))}
    </div>
  );
}
