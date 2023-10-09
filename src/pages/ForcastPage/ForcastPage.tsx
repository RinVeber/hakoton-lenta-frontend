import React from "react";
import Tabs from "../../components/Tabs/Tabs";
import styles from "./ForcastPage.module.css";
import ButtonExcel from "../../components/ButtonExcel/ButtonExcel";
import { mokColumnsTable } from "../../utils/constant";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getDataForcast } from "../../redux/slices/dataForcastSlice";
import TableForcast from "../../components/Table/TableForcast/TableForcast";
import ModalFilterState from "../../components/ModalFilter/ModalFilterState";
import { getCategory } from "../../redux/slices/dataCategorySlice";
import { getShops } from "../../redux/slices/shopSlice";
import { Header } from "../../components";

export default function ForcastPage() {
  const [isActive, setIsActive] = React.useState(false);

  const dispatch = useAppDispatch();
  const tableForcast = useAppSelector((state) => state.forcast.data);
  const tableForcastSearch = useAppSelector(
    (state) => state.forcast.searchData
  );

  // временный костыль для отрисовки изначально загруженных данных и после поиска. 
  const { isExistSearch } = useAppSelector((state) => state.forcast);

  console.log("tableFor", tableForcast);
  console.log("searchData", tableForcastSearch);

  React.useEffect(() => {
    dispatch(getDataForcast());
    //dispatch(getShops());
  }, []);

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
      <section className={styles.forcastPage}>
      <Header />
        <ModalFilterState
          isActive={isActive}
          handleOpenModal={handleOpenModal}
        />
        <Tabs handleOpenModal={handleOpenModal} />


        {isExistSearch == true ? (
          <TableForcast
            columns={mokColumnsTable}
            tableForcast={tableForcastSearch}
          />
        ) : (
          <TableForcast columns={mokColumnsTable} tableForcast={tableForcast} />
        )}
        {/* <TableForcast columns={mokColumnsTable} tableForcast={tableForcast} /> */}
        <ButtonExcel />
      </section>
    </>
  );
}
