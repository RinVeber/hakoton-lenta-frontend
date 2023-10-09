import React from "react";
import styles from "./MainPage.module.css";
import Tabs from "../../components/Tabs/Tabs";
import ButtonExcel from "../../components/ButtonExcel/ButtonExcel";
import { mokColumnsTable, mokColumnsStatic } from "../../utils/constant";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getDataSales } from "../../redux/slices/dataSalesSlice";
import { getDataSalesDiff } from "../../redux/slices/dataSalesDiffSlice";
import { mokDataSource } from "../../utils/constant";
import TableSales from "../../components/Table/TableSales/TableSales";
import { getDataForcast } from "../../redux/slices/dataForcastSlice";
import { getShops } from "../../redux/slices/shopSlice";
import { getCategory } from "../../redux/slices/dataCategorySlice";
import ModalFilterState from "../../components/ModalFilter/ModalFilterState";

export default function MainPage() {
  const [isActive, setIsActive] = React.useState(false);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getDataSalesDiff());
    //dispatch(getShops());
    //dispatch(getCategory());
  }, [dispatch]);

  const tableSales = useAppSelector((state) => state.salesDiff.data);

  function handleOpenModal() {
    dispatch(getCategory());
    dispatch(getShops());
    setIsActive(!isActive);
  }
  function closeModal() {
    setIsActive(false);
  }

  return (
    <>
      <div
        className={isActive ? styles.noBlur + " " + styles.blur : styles.noBlur}
        onClick={() => closeModal()}
      ></div>
      <section className={styles.MainPage}>
        <ModalFilterState
          isActive={isActive}
          handleOpenModal={handleOpenModal}
        />
        <Tabs handleOpenModal={handleOpenModal} />
        <TableSales columns={mokColumnsStatic} tableSales={tableSales} />
        <ButtonExcel />
      </section>
    </>
  );
}
