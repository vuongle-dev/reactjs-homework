import React, { ReactElement } from "react";
import styles from "./BlockUI7.module.css";
import { Reviewstars } from "../BasicUI/BasicUI2";

type Props = {
  category?: string;
  productname?: string;
  rating?: number;
  sold?: number;
  soldpercentage?: number;
  price?: number;
  ogprice?: number;
  image?: string;
};
type SaleWidgetProps = {
  SaleWidgetType: Props;
};
type BlockUI7Props = {
  SaleWidgets: Props[];
  title?: string;
  saleend?: Date;
};

const SaleOffNumber = (price: number, ogprice: number) =>
  (((ogprice - price) / ogprice) * 100).toFixed(0);
const PriceRow = ({ price = 0, ogprice = 0 }: Props) => {
  return (
    <div className={styles.PriceRow}>
      <div className={styles.price}>${price.toLocaleString("en-US")}</div>
      <div className={styles.ogprice}>${ogprice.toLocaleString("en-US")}</div>
      <div className={styles.saleoff}>{SaleOffNumber(price, ogprice)}% off</div>
    </div>
  );
};
const PercentageBar = ({ soldpercentage = 0 }: Props) => {
  return (
    <div className={styles.PercentageBar}>
      <div
        className={styles.percentage}
        style={{ width: `${soldpercentage}%` }}
      ></div>
    </div>
  );
};

const Content = ({ productname, rating, sold, soldpercentage }: Props) => {
  return (
    <div className={styles.content}>
      <h3 className={styles.productname}>{productname}</h3>
      <Reviewstars stars={rating} size={13} gap={5} />
      <PercentageBar soldpercentage={soldpercentage} />
      <div className={styles.sold}>Sold: {sold}</div>
    </div>
  );
};

const SaleWidget = ({ SaleWidgetType }: SaleWidgetProps) => {
  return (
    <div className={styles.SaleWidget}>
      <div className={styles.saleoffTag}>
        -
        {SaleWidgetType.ogprice &&
          SaleWidgetType.price &&
          SaleOffNumber(SaleWidgetType.price, SaleWidgetType.ogprice)}
        %
      </div>
      <img
        className={styles.image}
        src={SaleWidgetType.image}
        alt={SaleWidgetType.productname}
      />
      <div className={styles.category}>{SaleWidgetType.category}</div>
      <PriceRow price={SaleWidgetType.price} ogprice={SaleWidgetType.ogprice} />
      <Content
        productname={SaleWidgetType.productname}
        rating={SaleWidgetType.rating}
        sold={SaleWidgetType.sold}
        soldpercentage={SaleWidgetType.soldpercentage}
      />
    </div>
  );
};

export default function BlockUI7({
  SaleWidgets,
  title,
  saleend,
}: BlockUI7Props) {
  return (
    <div className={styles.BlockUI7}>
      <div className={styles.titleBar}>
        <div className={styles.titleStart}>
          <div className={styles.title}>{title}</div>
          <div className={styles.countdown}>
            <p>End in: </p>
            <p> 6:17:17:39</p>
          </div>
        </div>
        <div className={styles.viewAll}>View all</div>
      </div>
      <div className={styles.saleList}>
        {SaleWidgets.map((item, index) => (
          <SaleWidget key={index} SaleWidgetType={item} />
        ))}
      </div>
    </div>
  );
}
