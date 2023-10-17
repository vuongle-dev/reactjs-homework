import React from "react";
import "./App.css";
import BasicUI1 from "./Session2/BasicUI/BasicUI1";
import BasicUI2 from "./Session2/BasicUI/BasicUI2";
import BasicUI3 from "./Session2/BasicUI/BasicUI3";
import BlockUI1 from "./Session2/BlockUI/BlockUI1";
import BlockUI2 from "./Session2/BlockUI/BlockUI2";
import BlockUI3 from "./Session2/BlockUI/BlockUI3";
import BlockUI4 from "./Session2/BlockUI/BlockUI4";

import {
  AiFillAndroid,
  AiFillApple,
  AiOutlineDropbox,
  AiOutlineTwitter,
  AiOutlineGooglePlus,
} from "react-icons/ai";
import { FaDrupal, FaFacebookF, FaPinterest } from "react-icons/fa";
import BlockUI5 from "./Session2/BlockUI/BlockUI5";
import BlockUI6 from "./Session2/BlockUI/BlockUI6";
import BlockUI7 from "./Session2/BlockUI/BlockUI7";
import CV from "./Session2/CV";
import LikeButton from "./Session3/LikeButton";
import ReviewstarsAnimate from "./Session3/RateButton";
import ImageViewer from "./Session3/ImageViewer";
import TabModules from "./Session3/Tabs";
import AccordionModules from "./Session3/Accordions";
import Galleries from "./Session3/Galleries";

function App() {
  return (
    <div className="container">
      <BasicUI1
        catimage="Day02/basic-images/1.jpg"
        category="Clothing & Apparel"
        subcategory={["Accessories", "Bags", "Kid's Fashion", "Mens"]}
      />
      <BasicUI2
        title="Samsung UHD TV 24inch"
        category="Young Shop"
        stars={4}
        ratingnumber="02"
        price={599}
        image="Day02/basic-images/2.jpg"
      />
      <BasicUI3
        title="Harman Kadon Onyx Studio Mini, Reviews & Experiences"
        category="Technology"
        publishdate="Feb 21, 2021"
        author="drfurion"
        thumbnail="Day02/basic-images/3.jpg"
      />
      <BlockUI1
        percentages={[
          {
            darkcolor: "#E54D4C",
            lightcolor: "#F75354",
            text: "Bandwidth",
            percentage: 20,
          },
          {
            darkcolor: "#2DB8CD",
            lightcolor: "#31C8DD",
            text: "Storage",
            percentage: 50,
          },
          {
            darkcolor: "#4AC25E",
            lightcolor: "#51D567",
            text: "user",
            percentage: 70,
          },
          {
            darkcolor: "#E9C318",
            lightcolor: "#FCD518",
            text: "Visitor",
            percentage: 30,
          },
          {
            darkcolor: "#BB70D5",
            lightcolor: "#CB79E7",
            text: "Email",
            percentage: 45,
          },
          {
            darkcolor: "#EB59D6",
            lightcolor: "#FE60E8",
            text: "Basic",
            percentage: 80,
          },
          {
            darkcolor: "#5890DA",
            lightcolor: "#619CEC",
            text: "Others",
            percentage: 37,
          },
        ]}
      />

      <BlockUI2
        percentages={[
          {
            color: "#51D567",
            text: "HTML",
            percentage: 60,
            icon: <AiFillAndroid />,
          },
          {
            color: "#F65352",
            text: "CSS",
            percentage: 50,
            icon: <AiFillApple />,
          },
          {
            color: "#33C8DF",
            text: "PHP",
            percentage: 30,
            icon: <AiOutlineDropbox />,
          },
          {
            color: "#FCD518",
            text: "Java",
            percentage: 80,
            icon: <AiFillAndroid />,
          },
          {
            color: "#CB79E6",
            text: ".Net",
            percentage: 40,
            icon: <FaDrupal />,
          },
        ]}
      />
      <BlockUI3
        socialwidgets={[
          {
            title: "Facebook",
            subtitle: "5,00,000 Likes",
            backgroundcolor: "#619CEC",
            icon: <FaFacebookF />,
          },
          {
            title: "Twitter",
            subtitle: "40,000 Tweets",
            backgroundcolor: "#31C8DD",
            icon: <AiOutlineTwitter />,
          },
          {
            title: "Google +",
            subtitle: "4,60,000 Plus",
            backgroundcolor: "#F78153",
            icon: <AiOutlineGooglePlus />,
          },
          {
            title: "Pinterest",
            subtitle: "34,000 Pins",
            backgroundcolor: "#F75354",
            icon: <FaPinterest />,
          },
        ]}
      />
      <BlockUI4
        analyticswidgets={[
          {
            title: "Today's Visitors",
            number: "24,599",
          },
          {
            title: "Yesterday's Visitors",
            number: "15,699",
          },
          {
            title: "Total Downloads",
            number: "1,24,599",
          },
          {
            title: "Current Income",
            number: "$54,599",
          },
        ]}
      />
      <BlockUI5
        InfoWidgets={[
          {
            name: "Robort Pattison",
            career: "Developing",
            dob: "23/05/2014",
            bg: "B+",
            edu: "MCA",
            res: "Bangalore",
            email: "robot12@gmail.com",
            phone: "8665543219",
            avatar: "Day02/block-ui-5-images/1.jpg",
          },
          {
            name: "James Smith",
            career: "Designer",
            dob: "23/05/2014",
            bg: "B+",
            edu: "MCA",
            res: "Bangalore",
            email: "smith12@gmail.com",
            phone: "8225543219",
            avatar: "Day02/block-ui-5-images/2.jpg",
          },
          {
            name: "Tom Hanks",
            career: "UI Designer",
            dob: "23/05/2014",
            bg: "B+",
            edu: "MCA",
            res: "Bangalore",
            email: "peter1@gmail.com",
            phone: "8225543929",
            avatar: "Day02/block-ui-5-images/3.jpg",
          },
          {
            name: "Silvester Stalin",
            career: "Testing",
            dob: "23/05/2014",
            bg: "B+",
            edu: "MCA",
            res: "Bangalore",
            email: "point12@gmail.com",
            phone: "9937924265",
            avatar: "Day02/block-ui-5-images/4.jpg",
          },
        ]}
      />
      <BlockUI6
        ProductWidgets={[
          {
            productname: "Eodem modo typi",
            image: "Day02/block-ui-6-images/1.jpg",
          },
          {
            productname: "Sequitur mutationem",
            image: "Day02/block-ui-6-images/2.jpg",
          },
          {
            productname: "Consuetudium lectorum",
            image: "Day02/block-ui-6-images/3.jpg",
          },
          {
            productname: "Parum claram",
            image: "Day02/block-ui-6-images/4.jpg",
          },
        ]}
      />
      <BlockUI7
        SaleWidgets={[
          {
            productname: "LG White Front Load Steam Washer",
            image: "Day02/block-ui-7-images/1.jpg",
            category: "Young Shop",
            price: 1025.5,
            ogprice: 1422.7,
            rating: 4,
            sold: 10,
            soldpercentage: 90,
          },
          {
            productname: "Edifier Powered Bookshelf Speakers",
            image: "Day02/block-ui-7-images/2.jpg",
            category: "Young Shop",
            price: 85,
            ogprice: 96,
            rating: 4,
            sold: 15,
            soldpercentage: 80,
          },
          {
            productname: "Amcrest Security Camera in White Color",
            image: "Day02/block-ui-7-images/3.jpg",
            category: "Young Shop",
            price: 45.9,
            ogprice: 62.99,
            rating: 4,
            sold: 20,
            soldpercentage: 80,
          },
          {
            productname: "Grand Slam Indoor Of Show Jumping Novel",
            image: "Day02/block-ui-7-images/4.jpg",
            category: "Young Shop",
            price: 32.99,
            ogprice: 41.99,
            rating: 4,
            sold: 22,
            soldpercentage: 80,
          },

          {
            productname: "Sound Intone I65 Earphone White Version",
            image: "Day02/block-ui-7-images/5.jpg",
            category: "Young Shop",
            price: 100.99,
            ogprice: 106.99,
            rating: 4,
            sold: 10,
            soldpercentage: 90,
          },
          {
            productname: "Korea Long Sofa Fabric In Blue Navy Color",
            image: "Day02/block-ui-7-images/6.jpg",
            category: "Young Shop",
            price: 567.9,
            ogprice: 670.2,
            rating: 4,
            sold: 79,
            soldpercentage: 100,
          },
        ]}
        title="Deal of the day"
      />
      <CV />
      <LikeButton />
      <ReviewstarsAnimate />
      <ImageViewer
        images={[
          "Day02/block-ui-7-images/1.jpg",
          "Day02/block-ui-7-images/2.jpg",
          "Day02/block-ui-7-images/3.jpg",
          "Day02/block-ui-7-images/4.jpg",
          "Day02/block-ui-7-images/5.jpg",
        ]}
      />
      <TabModules />
      <AccordionModules />
      <Galleries />
    </div>
  );
}

export default App;
