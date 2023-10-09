import styles from "../../styles/ErrorPath.module.css";
import { Link } from "react-router-dom";
import bad from "../../assets/404.svg";

const ErrorPath = () => {
  return (
    <section className={styles.errorPath}>
      <img src={bad} alt="404" className={styles.zeroNumber} />
      <p className={styles.errorDescription}>Страница не найдена</p>
      <Link to={"/"}>
        <button className={styles.button} type="button">
          {/* <img src={reload} alt="перезагрузка" className={styles.image} /> */}
          <span className={styles.span}>Вернуться на главную</span>
        </button>
      </Link>
    </section>
  );
};

export default ErrorPath;
