import { Spin } from "antd";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";

import {
  AiFillAndroid,
  AiFillApple,
  AiOutlineDropbox,
  AiOutlineGooglePlus,
  AiOutlineTwitter,
} from "react-icons/ai";
import { FaDrupal, FaFacebookF, FaPinterest } from "react-icons/fa";
import OnlineShop, { Notice } from "./Session6";
import ErrorPage from "./Session6/ErrorPage";
import Categoryant from "./Session6/Category/Categoryant";
import Supplierant from "./Session6/Supplier";
import Employeeant from "./Session6/Employee";
import Customerant from "./Session6/Customer";
import Productant from "./Session6/Product";
import Orderant from "./Session6/Order";
import BasicUI1 from "./Session2/BasicUI/BasicUI1";
import BasicUI2 from "./Session2/BasicUI/BasicUI2";
import BasicUI3 from "./Session2/BasicUI/BasicUI3";
import BlockUI1 from "./Session2/BlockUI/BlockUI1";
import BlockUI2 from "./Session2/BlockUI/BlockUI2";
import BlockUI3 from "./Session2/BlockUI/BlockUI3";
import BlockUI4 from "./Session2/BlockUI/BlockUI4";
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
import LoveButton from "./Session3/LoveButton";
import FigmaApp from "./Session3/FigmaApp";
import Quiz from "./Session4";
import App, { Welcome } from "./App";
import useAuth from "./Session6/hooks/useAuth";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Welcome />,
        },
        {
          path: "onlineshop",
          element: <OnlineShop />,
          children: [
            {
              path: "/onlineshop",
              element: <Notice />,
            },
            {
              path: "category",
              element: <Categoryant />,
            },
            {
              path: "supplier",
              element: <Supplierant />,
            },
            {
              path: "employee",
              element: <Employeeant />,
            },
            {
              path: "customer",
              element: <Customerant />,
            },
            {
              path: "product",
              element: <Productant />,
            },
            {
              path: "order",
              element: <Orderant />,
            },
          ],
        },

        {
          path: "homework",
          children: [
            {
              path: "session2",
              children: [
                {
                  path: "BasicUI",
                  children: [
                    {
                      path: "BasicUI1",
                      element: (
                        <BasicUI1
                          catimage={`${process.env.PUBLIC_URL}/Day02/basic-images/1.jpg`}
                          category="Clothing & Apparel"
                          subcategory={[
                            "Accessories",
                            "Bags",
                            "Kid's Fashion",
                            "Mens",
                          ]}
                        />
                      ),
                    },
                    {
                      path: "BasicUI2",
                      element: (
                        <BasicUI2
                          title="Samsung UHD TV 24inch"
                          category="Young Shop"
                          stars={4}
                          ratingnumber="02"
                          price={599}
                          image={`${process.env.PUBLIC_URL}/Day02/basic-images/2.jpg`}
                        />
                      ),
                    },
                    {
                      path: "BasicUI3",
                      element: (
                        <BasicUI3
                          title="Harman Kadon Onyx Studio Mini, Reviews & Experiences"
                          category="Technology"
                          publishdate="Feb 21, 2021"
                          author="drfurion"
                          thumbnail={`${process.env.PUBLIC_URL}/Day02/basic-images/3.jpg`}
                        />
                      ),
                    },
                  ],
                },
                {
                  path: "BlockUI",
                  children: [
                    {
                      path: "BlockUI1",
                      element: (
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
                      ),
                    },
                    {
                      path: "BlockUI2",
                      element: (
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
                      ),
                    },
                    {
                      path: "BlockUI3",
                      element: (
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
                      ),
                    },
                    {
                      path: "BlockUI4",
                      element: (
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
                      ),
                    },
                    {
                      path: "BlockUI5",
                      element: (
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
                              avatar: `${process.env.PUBLIC_URL}/Day02/block-ui-5-images/1.jpg`,
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
                              avatar: `${process.env.PUBLIC_URL}/Day02/block-ui-5-images/2.jpg`,
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
                              avatar: `${process.env.PUBLIC_URL}/Day02/block-ui-5-images/3.jpg`,
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
                              avatar: `${process.env.PUBLIC_URL}/Day02/block-ui-5-images/4.jpg`,
                            },
                          ]}
                        />
                      ),
                    },
                    {
                      path: "BlockUI6",
                      element: (
                        <BlockUI6
                          ProductWidgets={[
                            {
                              productname: "Eodem modo typi",
                              image: `${process.env.PUBLIC_URL}/Day02/block-ui-6-images/1.jpg`,
                            },
                            {
                              productname: "Sequitur mutationem",
                              image: `${process.env.PUBLIC_URL}/Day02/block-ui-6-images/2.jpg`,
                            },
                            {
                              productname: "Consuetudium lectorum",
                              image: `${process.env.PUBLIC_URL}/Day02/block-ui-6-images/3.jpg`,
                            },
                            {
                              productname: "Parum claram",
                              image: `${process.env.PUBLIC_URL}/Day02/block-ui-6-images/4.jpg`,
                            },
                          ]}
                        />
                      ),
                    },
                    {
                      path: "BlockUI7",
                      element: (
                        <BlockUI7
                          SaleWidgets={[
                            {
                              productname: "LG White Front Load Steam Washer",
                              image: `${process.env.PUBLIC_URL}/Day02/block-ui-7-images/1.jpg`,
                              category: "Young Shop",
                              price: 1025.5,
                              ogprice: 1422.7,
                              rating: 4,
                              sold: 10,
                              soldpercentage: 90,
                            },
                            {
                              productname: "Edifier Powered Bookshelf Speakers",
                              image: `${process.env.PUBLIC_URL}/Day02/block-ui-7-images/2.jpg`,
                              category: "Young Shop",
                              price: 85,
                              ogprice: 96,
                              rating: 4,
                              sold: 15,
                              soldpercentage: 80,
                            },
                            {
                              productname:
                                "Amcrest Security Camera in White Color",
                              image: `${process.env.PUBLIC_URL}/Day02/block-ui-7-images/3.jpg`,
                              category: "Young Shop",
                              price: 45.9,
                              ogprice: 62.99,
                              rating: 4,
                              sold: 20,
                              soldpercentage: 80,
                            },
                            {
                              productname:
                                "Grand Slam Indoor Of Show Jumping Novel",
                              image: `${process.env.PUBLIC_URL}/Day02/block-ui-7-images/4.jpg`,
                              category: "Young Shop",
                              price: 32.99,
                              ogprice: 41.99,
                              rating: 4,
                              sold: 22,
                              soldpercentage: 80,
                            },

                            {
                              productname:
                                "Sound Intone I65 Earphone White Version",
                              image: `${process.env.PUBLIC_URL}/Day02/block-ui-7-images/5.jpg`,
                              category: "Young Shop",
                              price: 100.99,
                              ogprice: 106.99,
                              rating: 4,
                              sold: 10,
                              soldpercentage: 90,
                            },
                            {
                              productname:
                                "Korea Long Sofa Fabric In Blue Navy Color",
                              image: `${process.env.PUBLIC_URL}/Day02/block-ui-7-images/6.jpg`,
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
                      ),
                    },
                  ],
                },
                {
                  path: "CV",
                  element: <CV />,
                },
              ],
            },
            {
              path: "Session3",
              children: [
                {
                  path: "likebutton",
                  element: <LikeButton />,
                },
                {
                  path: "ratebutton",
                  element: <ReviewstarsAnimate />,
                },
                {
                  path: "imageviewer",
                  element: (
                    <ImageViewer
                      images={[
                        `${process.env.PUBLIC_URL}/Day02/block-ui-7-images/1.jpg`,
                        `${process.env.PUBLIC_URL}/Day02/block-ui-7-images/2.jpg`,
                        `${process.env.PUBLIC_URL}/Day02/block-ui-7-images/3.jpg`,
                        `${process.env.PUBLIC_URL}/Day02/block-ui-7-images/4.jpg`,
                        `${process.env.PUBLIC_URL}/Day02/block-ui-7-images/5.jpg`,
                      ]}
                    />
                  ),
                },
                {
                  path: "tabs",
                  element: <TabModules />,
                },
                {
                  path: "accordions",
                  element: <AccordionModules />,
                },
                {
                  path: "galleries",
                  element: <Galleries />,
                },
                {
                  path: "lovebutton",
                  element: <LoveButton />,
                },
                {
                  path: "figma",
                  element: <FigmaApp />,
                },
              ],
            },
            {
              path: "Quiz",
              element: <Quiz />,
            },
          ],
        },
      ],
    },
  ]);
  const queryClient = new QueryClient();
  const auth = useAuth();
  React.useEffect(() => {
    auth.loggedInUser && auth.refresh();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <React.Suspense fallback={<Spin />}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </React.Suspense>
  );
}
