import { FC } from "react";
import styles from "./Tabs.module.css";
import { Link } from "react-router-dom";
import { navLinks } from "../../utils/constant";

interface ITabsProps {
  handleOpenModal: () => void;
}

const Tabs: FC<ITabsProps> = ({ handleOpenModal }) => {
  const pathname = window.location.pathname;
  return (
    <div className={styles.Tabs__menu}>
      <div className={styles.Tabs__container}>
        <div className={styles.Tabs__buttons}>
          <button
            className={styles.Tabs__button}
            onClick={() => {
              handleOpenModal();
            }}
          >
            <div className={styles.Tabs__buttonIcon} />
            <div className={styles.Tabs_buttonText}>Фильтры</div>
          </button>

          <button
            className={

              pathname == "/" ? styles.Tabs__button : styles.Tabs__button_hide
            }
            onClick={() => {
              handleOpenModal();
            }}
          >

            <div className={styles.Tabs__buttonIconForcast} />
            <div className={styles.Tabs_buttonText}>Период</div>

          </button>
        </div>
        <div className={styles.Tabs__tabs}>
          {navLinks.map((item) => {
            return (
              <Link
                to={item.link}
                key={item.id}
                className={
                  pathname == item.link
                    ? styles.Tabs__tabLink
                    : styles.Tabs__tabLink_noActive
                }
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className={styles.Tabs__hideDiv}></div>

      </div>
    </div>
  );
};

export default Tabs;
