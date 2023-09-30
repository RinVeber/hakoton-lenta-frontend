import { FC } from "react";
import styles from "../../styles/Auth.module.css";
import logo from "../../images/logo-auth.svg.svg";
import background from "../../images/background_logo.svg.svg";
import Form from "../Form/Form";

const Auth: FC = () => {
  return (
    <section className={styles.auth}>
      <div className={styles.formContainer}>
        <img src={logo} alt="логотип" className={styles.logo} />
        <Form />
      </div>
      <div className={styles.backgroundSection}>
        <img
          src={background}
          alt="лого Лента"
          className={styles.backgroundImg}
        />
      </div>
    </section>
  );
};

export default Auth;
