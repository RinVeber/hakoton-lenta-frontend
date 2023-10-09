import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/Header.module.css";
import logo from "../../assets/logo.svg";
import message from "../../assets/message.svg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { FC, useEffect } from "react";
import { getUser, logOut } from "../../redux/slices/userSlice";

interface IPropHeader {
  user?: {
    first_name: string;
    last_name: string;
  };
  Response?: {
    status?: number;
    statusText?: string;
    error?: Error;
  };
}

const Header: FC<IPropHeader> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);
  const [firstLatter, setFirstLatter] = useState<string>("");
  const { first_name, last_name } = user;

  useEffect(() => {
    dispatch(getUser());
    setFirstLatter(first_name.slice(0, 1));
  }, []);

  const handleLogout = async () => {
    await dispatch(logOut())
      .then((res) => {
        if (res) {
          navigate("/auth");
          localStorage.clear();
        }
        return;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <header className={styles.header}>
      <Link to={"/hakoton-lenta-frontend"} className={styles.linkHeader}>
        <img src={logo} alt="логотип" className={styles.logo} />
      </Link>
      <div className={styles.infoContainer}>
        <button type="button" className={styles.headerButton}>
          <img
            src={message}
            alt="написать сообщение"
            className={styles.imageMessage}
          />
        </button>
        <div className={styles.letterBox}>
          <span className={styles.letterSpan}>{firstLatter}</span>
        </div>
        <div className={styles.yorNameBox}>
          <span className={styles.nameSpan}>
            {first_name} {last_name}
          </span>
          <button
            className={styles.logout}
            type="button"
            onClick={handleLogout}
          >
            <span className={styles.logoutSpan}>Выйти</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
