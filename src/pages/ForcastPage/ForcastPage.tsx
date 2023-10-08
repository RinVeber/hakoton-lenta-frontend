import React from "react";
import Tabs from "../../components/Tabs/Tabs";
import Table from "../../components/Table/Table";
import styles from "./ForcastPage.module.css";
import ButtonExcel from "../../components/ButtonExcel/ButtonExcel";
import { mokColumnsStatic, mokDataSource, mokColumnsTable } from "../../utils/constant";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getDataForcast } from "../../redux/slices/dataForcastSlice";
import TableForcast from "../../components/Table/TableForcast/TableForcast";


export default function ForcastPage() {
  const [isActive, setIsActive] = React.useState(false);

  function handleOpenModal() {
    setIsActive(!isActive);

  }

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getDataForcast());
    //dispatch(getShops());
  }, [dispatch]);

  const tableForcast = useAppSelector((state) => state.forcast.data);
  
  return (
    <section className={styles.forcastPage}>
      <Tabs handleOpenModal={handleOpenModal} />
        <TableForcast columns = {mokColumnsTable}  tableForcast={tableForcast}/>
      <ButtonExcel />
    </section>
  );
}
