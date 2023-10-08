import React from "react";
import Tabs from "../../components/Tabs/Tabs";
import Table from "../../components/Table/TableSales/TableSales";
import styles from "./ForcastPage.module.css";
import ButtonExcel from "../../components/ButtonExcel/ButtonExcel";
import {
  mokColumnsStatic,
  mokDataSource,
  mokColumnsTable,
} from "../../utils/constant";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getDataForcast } from "../../redux/slices/dataForcastSlice";
import TableForcast from "../../components/Table/TableForcast/TableForcast";
import ModalFilterState from "../../components/ModalFilter/ModalFilterState";

export default function ForcastPage() {
  const [isActive, setIsActive] = React.useState(false);
  const dispatch = useAppDispatch();
  const tableForcast = useAppSelector((state) => state.forcast.data);

  React.useEffect(() => {
    dispatch(getDataForcast());
    //dispatch(getShops());
  }, [dispatch]);

  function handleOpenModal() {
    setIsActive(!isActive);
  }
  function closeModal() {
    setIsActive(false);
  }

  return (
    <>
    <div className={isActive ? styles.noBlur + ' '+ styles.blur : styles.noBlur} onClick={() => closeModal()}></div>
    <section className={styles.forcastPage}>
      <ModalFilterState isActive={isActive} handleOpenModal={handleOpenModal} />
      <Tabs handleOpenModal={handleOpenModal} />
      <TableForcast columns={mokColumnsTable} tableForcast={tableForcast} />
      <ButtonExcel />
    </section>
    </>
  );
}
