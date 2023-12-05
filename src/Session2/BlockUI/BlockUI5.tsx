import React, { ReactElement } from "react";
import styles from "./BlockUI5.module.css";
import {
  FaRegCalendarAlt,
  FaHeart,
  FaUserGraduate,
  FaRegEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

type Props = {
  name?: string;
  career?: string;
  dob?: string;
  bg?: string;
  edu?: string;
  res?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  color1?: string;
  color2?: string;
};
type infos = {
  info: Props;
};
type BlockUI5Props = {
  InfoWidgets: Props[];
};
type InfoProps = {
  info?: string;
  value?: string;
  icon?: ReactElement;
  backgroundcolor?: string;
};

const InfoRow = ({ info, value, icon }: InfoProps) => {
  return (
    <div className={styles.InfoRow}>
      <div className={styles.info}>
        {icon} {info}
      </div>
      <div className={styles.value}>{value}</div>
    </div>
  );
};
const InfoButton = ({ info, value, icon, backgroundcolor }: InfoProps) => {
  return (
    <div
      className={styles.InfoButton}
      style={{ backgroundColor: backgroundcolor }}
    >
      <div className={styles.info}>{info}</div>
      <div className={styles.value}>
        {icon}
        {value}
      </div>
    </div>
  );
};

const InfoWidget = ({ info }: infos) => {
  return (
    <div className={styles.InfoWidget}>
      <div className={styles.titleSession}>
        <img className={styles.avatar} src={info.avatar} alt={info.name} />
        <h3 className={styles.name}>{info.name}</h3>
        <span className={styles.career}>{info.career}</span>
      </div>
      <div className={styles.content}>
        <div className={styles.infoRows}>
          <InfoRow info="DOB" value={info.dob} icon={<FaRegCalendarAlt />} />
          <InfoRow info="BG" value={info.bg} icon={<FaHeart />} />
          <InfoRow info="edu" value={info.edu} icon={<FaUserGraduate />} />
          <InfoRow info="res" value={info.res} icon={<FaLocationDot />} />
        </div>
        <div className={styles.InfoButtons}>
          <InfoButton
            info="Email id"
            value={info.email}
            icon={<FaRegEnvelope />}
            backgroundcolor="#F75354"
          />
          <InfoButton
            info="Phone no"
            value={info.phone}
            icon={<FaPhoneAlt />}
            backgroundcolor="#51D567"
          />
        </div>
      </div>
    </div>
  );
};

export default function BlockUI5({ InfoWidgets }: BlockUI5Props) {
  return (
    <div className={styles.BlockUI5}>
      {InfoWidgets.map((item, index) => (
        <InfoWidget key={index} info={item} />
      ))}
    </div>
  );
}
