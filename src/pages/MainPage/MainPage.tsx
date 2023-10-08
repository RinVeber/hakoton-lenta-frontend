import React from "react";
import styles from "./MainPage.module.css";
import Tabs from "../../components/Tabs/Tabs";
import ButtonExcel from "../../components/ButtonExcel/ButtonExcel";
import { mokColumnsTable } from "../../utils/constant";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getDataSales } from "../../redux/slices/dataSalesSlice";
import { mokDataSource } from "../../utils/constant";
import Table from "../../components/Table/Table";
import { getDataForcast } from "../../redux/slices/dataForcastSlice";
import { getShops } from "../../redux/slices/shopSlice";
import { getCategory } from "../../redux/slices/dataCategorySlice";
import ModalFilterState from "../../components/ModalFilter/ModalFilterState";

export default function MainPage() {
  const [isActive, setIsActive] = React.useState(false);

  function handleOpenModal() {
    dispatch(getCategory());
    dispatch(getShops());
    setIsActive(!isActive);
  }
  const dispatch = useAppDispatch();

  function closeModal() {
    setIsActive(false);
  }

  React.useEffect(() => {
    dispatch(getDataSales());
    //dispatch(getShops());
    //dispatch(getCategory());
  }, [dispatch]);

  const tableSales = useAppSelector((state) => state.sales.data);
  console.log("tablesales", tableSales);

  return (
    <>
      <div className={isActive ? styles.noBlur + ' '+ styles.blur : styles.noBlur} onClick={() => closeModal()}></div>
      <section className={styles.MainPage} >
        <ModalFilterState
          isActive={isActive}
          handleOpenModal={handleOpenModal}
        />
        <Tabs handleOpenModal={handleOpenModal} />
        <Table mokColumns={mokColumnsTable} mokDataSource={mokDataSource} />
        <ButtonExcel />
      </section>
    </>
  );
}
