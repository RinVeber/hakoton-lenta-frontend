import React from "react";
import styles from "./MainPage.module.css";
import Tabs from "../../components/Tabs/Tabs";
 import Table from "../../components/Table/Table";
import ButtonExcel from "../../components/ButtonExcel/ButtonExcel";
import ModalFilter from "../../components/ModalFilter/ModalFilter";
import { mokColumnsTable } from "../../utils/constant";
import { useAppDispatch } from "../../redux/store";
import { getDataSales } from "../../redux/slices/dataSalesSlice";
import {
  mokDataSource,
  mokColumnsTableGrid,
  mokDataSourceGrid,
} from "../../utils/constant";
import TableMUI from "../../components/Table/TableMUI";

export default function MainPage() {
  const [isActive, setIsActive] = React.useState(false);

  function handleOpenModal() {
    setIsActive(!isActive);
  }
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getDataSales());
  });


  return (
    <section className={styles.MainPage}>
      <ModalFilter isActive={isActive} handleOpenModal={handleOpenModal} />
      <Tabs handleOpenModal={handleOpenModal} />
      {/* <Table mokColumns={mokColumnsTable}/> */}
      
      <TableMUI />
      <ButtonExcel />
    </section>
  );
}
