import React, { Fragment, ReactElement, useState } from "react";
import styles from "./CV.module.css";
import {
  MdPersonOutline,
  MdOutlineContacts,
  MdLocalPhone,
  MdWeb,
  MdHome,
  MdShare,
} from "react-icons/md";
import { FaFacebookF, FaGithub } from "react-icons/fa";
import { FaPersonArrowUpFromLine } from "react-icons/fa6";
import { type } from "os";

type Props = {};

const RandomColor = () => {
  return (
    "#" +
    Math.floor(Math.random() * 2 ** 24)
      .toString(16)
      .padStart(6, "0")
  );
};

const LeftWidget = ({
  children,
  title,
  icon,
}: {
  children?: ReactElement;
  title?: string;
  icon?: ReactElement;
}) => {
  return (
    <div className={styles.LeftWidget}>
      <div className={styles.title}>
        <div className={styles.icon}>{icon}</div>
        {title}
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

const LeftInfo = ({ icon, info }: { icon?: ReactElement; info?: string }) => {
  return (
    <div className={styles.LeftInfo}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.info}>{info}</div>
    </div>
  );
};

type TabListProps = {
  tabs: tabProps[];
};
type tabProps = {
  name: string;
  value: string[];
};
const TabList = ({ tabs }: TabListProps) => {
  const [currentTab, setCurrentTab] = useState(1);
  return (
    <div className={styles.TabList}>
      <div className={styles.tabs}>
        {tabs.map((item, index) => (
          <div
            key={index}
            className={`${styles.tab} ${
              index == currentTab && styles.currentTab
            }`}
            onClick={() => setCurrentTab(index)}
          >
            {index == currentTab && <div id={styles.currentTabBackground} />}
            <p>{item.name}</p>
          </div>
        ))}
      </div>

      {tabs.map((item, index) => (
        <Fragment key={index}>
          {index === currentTab && (
            <div className={styles.skillList}>
              {item.value.map((item, index) => (
                <div
                  key={index}
                  className={styles.skill}
                  style={{ backgroundColor: RandomColor() }}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
};

const LeftSidebar = ({ avatar = "Day03/avatar.jpg" }: { avatar?: string }) => {
  return (
    <div className={styles.LeftSidebar}>
      <img className={styles.avatar} src={avatar} alt="avatar" />
      <LeftWidget title="About Me" icon={<MdPersonOutline />}>
        <p>Lorem Ipsum</p>
      </LeftWidget>
      <LeftWidget title="Contact Me" icon={<MdOutlineContacts />}>
        <>
          <LeftInfo icon={<MdLocalPhone />} info="+84 582 157078" />
          <LeftInfo
            icon={<MdWeb />}
            info="vuongle.dev@gmail.com
        devlv.com"
          />
          <LeftInfo icon={<MdHome />} info="235/15 Ton Dan, Da Nang" />
        </>
      </LeftWidget>
      <LeftWidget title="Follow Me" icon={<MdShare />}>
        <>
          <LeftInfo icon={<FaFacebookF />} info="fb.me/vuongle.dev" />
          <LeftInfo
            icon={<FaGithub />}
            info="github.com/vuongle-devongle.dev"
          />
        </>
      </LeftWidget>
      <LeftWidget title="Skills" icon={<FaPersonArrowUpFromLine />}>
        <>
          <TabList
            tabs={[
              {
                name: "Basic",
                value: [
                  "Linux VPS Management",
                  "PHP Server Management",
                  "Photoshop",
                  "Illustrator",
                  "Premiere",
                  "ReactJS",
                  "SEO",
                ],
              },
              {
                name: "Advanced",
                value: ["HTML", "CSS", "JS", "Jquery", "PHP", "Wordpress"],
              },
            ]}
          />
        </>
      </LeftWidget>
    </div>
  );
};

const RightSidebar = ({}) => {
  return (
    <div className={styles.RightSidebar}>
      <div style={{ width: "100%" }}>content</div>
    </div>
  );
};
export default function CV({}: Props) {
  return (
    <div className={styles.CV}>
      <LeftSidebar />
      <RightSidebar />
    </div>
  );
}
