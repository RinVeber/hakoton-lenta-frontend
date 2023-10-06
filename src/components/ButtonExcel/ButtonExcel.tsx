import React from "react";
import styles from "./ButtonExce.module.css";
import upload from "../../assets/Upload.svg";

export default function ButtonExcel() {
  return (
    <button className={styles.buttonExcel}>
      <img src={upload} className={styles.icon} alt="иконка" />
      <div className={styles.btnText}> Загрузить Excel</div>
    </button>
  );
}
