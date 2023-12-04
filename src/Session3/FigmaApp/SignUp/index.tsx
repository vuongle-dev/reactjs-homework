import React, { ReactElement } from "react";
import styles from "./SignUp.module.css";
import {
  CheckedIcon,
  EyeIcon,
  FacebookIcon,
  GoogleColorfulIcon,
} from "../../../icon";
import OnboardScreen, { Button } from "../OnboardScreen";
import RiderReview from "../RiderReview";

type Props = {
  logo?: string;
  title?: string;
  description?: string;
  setNextPage(data: {
    change: string;
    effect: string;
    component: ReactElement;
  }): void;
};
// type SlideProps = {
//   images?: string;
//   backgroundmage?: string;
// };
type TextInputProps = {
  name?: string;
  icon?: React.ReactElement;
  iconcolor?: string;
  value?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
};

const TextInput = ({
  name,
  icon,
  iconcolor,
  value,
  placeholder,
  type,
  required = true,
}: TextInputProps) => {
  return (
    <div className={styles.inputContainer}>
      {name && (
        <label htmlFor={name} className={styles.inputname}>
          {name}
        </label>
      )}
      <div className={styles.input}>
        <input
          type={type}
          name={name}
          id={name}
          defaultValue={value}
          placeholder={placeholder}
          required={required}
        />
        {icon && (
          <div className={styles.icon} style={{ color: iconcolor }}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};
export default function SignUp({
  logo = `${process.env.PUBLIC_URL}/Day03/FigmaApp/logo.svg`,
  title,
  description,
  setNextPage,
}: Props) {
  // const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <div className={styles.container}>
      <img className={styles.logo} src={logo} alt="logo" />
      <div className={styles.title}>
        <h3>{title}</h3>
        <span>{description}</span>
      </div>
      <form className={styles.signUp}>
        <TextInput
          name="Email"
          type="email"
          value="armannijum@gmail.com"
          icon={<CheckedIcon />}
        />
        <TextInput
          name="Username"
          type="text"
          value="Arman Nijum"
          icon={<CheckedIcon />}
        />
        <TextInput
          name="Password"
          type="password"
          value="123456789"
          icon={<EyeIcon />}
        />
      </form>

      <div className={styles.submit}>
        <Button
          id={styles.signupButton}
          onClick={() =>
            setNextPage({
              change: "next",
              effect: "horizontal",
              component: (
                <RiderReview
                  riderinfo={{
                    name: "William Adams",
                    avatar: `${process.env.PUBLIC_URL}/Day03/FigmaApp/avatar.png`,
                    career: "Delivery Man",
                    delivered: true,
                  }}
                  setNextPage={setNextPage}
                />
              ),
            })
          }
        >
          Sign Up
        </Button>
        <p>
          Already have an account?{" "}
          <span
            onClick={() =>
              setNextPage({
                change: "back",
                effect: "vertical",
                component: (
                  <OnboardScreen
                    setNextPage={setNextPage}
                    slide={[
                      {
                        images: `${process.env.PUBLIC_URL}/Day03/FigmaApp/banner1.svg`,
                        title: "Choose a Favourite Food",
                        description:
                          "When you oder Eat Steet, we'll hook you up with exclusive coupon, specials and rewards",
                      },
                      {
                        images: `${process.env.PUBLIC_URL}/Day03/FigmaApp/banner2.svg`,
                        backgroundmage: "Day03/FigmaApp/background2.svg",
                        title: "Hot Delivery to Home",
                        description:
                          "We make food ordering fasr, simple and free-no matter if you order online or cash",
                      },
                      {
                        images: `${process.env.PUBLIC_URL}/Day03/FigmaApp/banner3.svg`,
                        title: "Receive the Great Food",
                        description:
                          "You’ll receive the great food within a hour. And get free delivery credits for every order.",
                      },
                    ]}
                  />
                ),
              })
            }
          >
            Sign In
          </span>
        </p>
      </div>
      <div className={styles.submit}>
        <Button id={styles.facebookSignIn}>
          <FacebookIcon />
          Continue With Facebook
        </Button>
        <Button id={styles.googleSignIn}>
          <GoogleColorfulIcon />
          Continue With Google
        </Button>
      </div>
    </div>
  );
}
