import { useState } from "react";
import styles from "./ModalFilter.module.css";
import Select from "./Select/Select";
import up from "../../assets/arrow-up.svg";
import down from "../../assets/arrow-down.svg";
import ModalFilterDate from "./ModalFilterDate";

interface ModalProps {
  isActive: boolean;
  handleOpenModal: () => void;
}

export default function ModalFilter({ isActive, handleOpenModal }: ModalProps) {
  const path = window.location.pathname;
  const [isSelectCity, setIsSelectCity] = React.useState(false);
  const [isSelectTK, setIsSelectTK] = React.useState(false);
  const [isSelectGroup, setIsSelectGroup] = React.useState(false);
  const [isSelectCategory, setIsSelectCategory] = React.useState(false);
  const [isSelectPodcategory, setIsSelectPodcategory] = React.useState(false);
  const [isSelectSKU, setIsSelectSKU] = React.useState(false);

  function openSelectCity() {
    setIsSelectCity(!isSelectCity);
  }
  function openSelectTK() {
    setIsSelectTK(!isSelectTK);
  }
  function openSelectGroup() {
    setIsSelectGroup(!isSelectGroup);
  }
  function openSelectCategory() {
    setIsSelectCategory(!isSelectCategory);
  }
  function openSelectPodcategory() {
    setIsSelectPodcategory(!isSelectPodcategory);
  }
  function openSelectSKU() {
    setIsSelectSKU(!isSelectSKU);
  }
  const city = [
    {
      id: 1,
      title: "Moskva",
    },
    {
      id: 2,
      title: "Piter",
    },
    {
      id: 3,
      title: "Samara",
    },
  ];
  const tk = [
    {
      id: 1,
      title: "tk-1",
    },
    {
      id: 2,
      title: "tk-2",
    },
    {
      id: 3,
      title: "tk-3",
    },
  ];

  return (
    <section className={isActive ? styles.modal_active : styles.modal}>
      <div className={styles.modal__header}>
        <div className={styles.modal__title}>
          {path == "/obzor" ? "Выбор периода" : "Выбор торгового комплекса"}
        </div>
        <div className={styles.modal__close} onClick={handleOpenModal} />
      </div>

      <div className={styles.modal__content}>
        <div className={styles.modal__selectContent}>
          <div className={styles.modal__container}>
            <div className={styles.modal__wrap}>
              <div className={styles.modal__select} onClick={openSelectCity}>
                <div className={styles.modal__selectName}>Город</div>
                <img
                  src={isSelectCity ? up : down}
                  className={styles.iconSelect}
                  alt="иконка"
                />
              </div>
              <div className={styles.modal__selectChips}>chips</div>
            </div>
            <Select
              openSelect={openSelectCity}
              isSelect={isSelectCity}
              selectOptions={city}
            />
          </div>
          <div className={styles.modal__container}>
            <div className={styles.modal__wrap}>
              <div className={styles.modal__select} onClick={openSelectTK}>
                <div className={styles.modal__selectName}>
                  Торговый комплекс
                </div>
                <img
                  src={isSelectTK ? up : down}
                  className={styles.iconSelect}
                  alt="иконка"
                />
              </div>
              <div className={styles.modal__selectChips}>chips</div>
            </div>
            <Select
              openSelect={openSelectTK}
              isSelect={isSelectTK}
              selectOptions={city}
            />
          </div>
          <div className={styles.modal__title}>Выбор товаров</div>

          <div className={styles.modal__container}>
            <div className={styles.modal__wrap}>
              <div className={styles.modal__select} onClick={openSelectGroup}>
                <div className={styles.modal__selectName}>Группа товаров</div>
                <img
                  src={isSelectGroup ? up : down}
                  className={styles.iconSelect}
                  alt="иконка"
                />
              </div>
              <div className={styles.modal__selectChips}>chips</div>
            </div>
            <Select
              openSelect={openSelectGroup}
              isSelect={isSelectGroup}
              selectOptions={city}
            />
          </div>
          <div className={styles.modal__container}>
            <div className={styles.modal__wrap}>
              <div
                className={styles.modal__select}
                onClick={openSelectCategory}
              >
                <div className={styles.modal__selectName}>Категория</div>
                <img
                  src={isSelectCategory ? up : down}
                  className={styles.iconSelect}
                  alt="иконка"
                />
              </div>
              <div className={styles.modal__selectChips}>chips</div>
            </div>
            <Select
              openSelect={openSelectCategory}
              isSelect={isSelectCategory}
              selectOptions={city}
            />
          </div>
          <div className={styles.modal__container}>
            <div className={styles.modal__wrap}>
              <div
                className={styles.modal__select}
                onClick={openSelectPodcategory}
              >
                <div className={styles.modal__selectName}>Подкатегория</div>
                <img
                  src={isSelectPodcategory ? up : down}
                  className={styles.iconSelect}
                  alt="иконка"
                />
              </div>
              <div className={styles.modal__selectChips}>chips</div>
            </div>
            <Select
              openSelect={openSelectPodcategory}
              isSelect={isSelectPodcategory}
              selectOptions={city}
            />
          </div>
          <div className={styles.modal__container}>
            <div className={styles.modal__wrap}>
              <div className={styles.modal__select} onClick={openSelectSKU}>
                <div className={styles.modal__selectName}>SKU</div>
                <img
                  src={isSelectSKU ? up : down}
                  className={styles.iconSelect}
                  alt="иконка"
                />
              </div>
              <div className={styles.modal__selectChips}>chips</div>
            </div>
            <Select
              openSelect={openSelectSKU}
              isSelect={isSelectSKU}
              selectOptions={city}
            />
          </div>
        </div>
        <div className={styles.modal__btnСontainer}>
          <button type="submit" className={styles.modal__submit}>
            Показать
          </button>
          <button className={styles.modal__cancel}>Сбросить</button>
        </div>
      </div>
    </section>
  );
}
