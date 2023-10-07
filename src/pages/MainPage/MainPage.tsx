import React from "react";
import styles from "./MainPage.module.css";
import Tabs from "../../components/Tabs/Tabs";
import ButtonExcel from "../../components/ButtonExcel/ButtonExcel";
import ModalFilter from "../../components/ModalFilter/ModalFilter";
import { mokColumnsTable } from "../../utils/constant";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getDataSales } from "../../redux/slices/dataSalesSlice";
import { mokDataSource } from "../../utils/constant";
import Table from "../../components/Table/Table";
import { getDataForcast } from "../../redux/slices/dataForcastSlice";

export default function MainPage() {
  const [isActive, setIsActive] = React.useState(false);

  function handleOpenModal() {
    setIsActive(!isActive);
  }
  const dispatch = useAppDispatch();
  const data = {
    email: "front@lenta.com",
    password: '392750YBST'
  }

  React.useEffect(() => {
    dispatch(getDataSales());
    dispatch(getDataForcast());
  }, []);

  const {token} = useAppSelector((state) => state.form);
console.log(token);


  return (
    <section className={styles.MainPage}>
      <ModalFilter isActive={isActive} handleOpenModal={handleOpenModal} />
      <Tabs handleOpenModal={handleOpenModal} />
      <Table mokColumns={mokColumnsTable} mokDataSource={mokDataSource}/>
      <ButtonExcel />
    </section>
  );
}
