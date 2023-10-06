import React from "react";
import Tabs from "../../components/Tabs/Tabs";
import Table from "../../components/Table/Table";
import styles from "./ForcastPage.module.css";
import ButtonExcel from "../../components/ButtonExcel/ButtonExcel";
import { mokColumnsForcast } from "../../utils/constant";

export default function ForcastPage() {
  const [isActive, setIsActive] = React.useState(false);

  function handleOpenModal() {
    setIsActive(!isActive);
  }
  return (
    <section className={styles.forcastPage}>
      <Tabs handleOpenModal={handleOpenModal} />
      <Table mokColumns = {mokColumnsForcast}/>
      <ButtonExcel />
    </section>
  );
}
