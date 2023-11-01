import React from "react";
import styles from "./Networking.module.css";
import Login, { Button } from "./Login";
import { GetAll } from "./Category";
import ButtonTabs from "../Session3/Tabs/ButtonTabs";

type Props = {};

const Logout = ({ setIsLoggedIn }: { setIsLoggedIn: (data: any) => void }) => {
  let email = localStorage.getItem("email");
  let role = localStorage.getItem("role");
  const logoutHandle = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    alert("Logged Out");
  };
  return (
    <div className={styles.Logout}>
      <h4>
        {email} <span>{role}</span>
      </h4>
      <Button onClick={() => logoutHandle()}>Logout</Button>
    </div>
  );
};

const Header = ({ ...props }) => {
  return (
    <div className={styles.Header}>
      {props.isLoggedIn === false ? (
        <Login setIsLoggedIn={props.setIsLoggedIn} />
      ) : (
        <Logout setIsLoggedIn={props.setIsLoggedIn} />
      )}
    </div>
  );
};
const GetTab = ({}) => {
  return <GetAll url="/online-shop/categories" name="Categories" />;
};

export default function Networking({}: Props) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  return (
    <div className={styles.container}>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <ButtonTabs tablist={[{ name: "Category", content: <GetTab /> }]} />
    </div>
  );
}
