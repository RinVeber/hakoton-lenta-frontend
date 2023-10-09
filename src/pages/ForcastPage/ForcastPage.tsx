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
import { Spin } from "antd";

export default function ForcastPage() {
  const [isActive, setIsActive] = React.useState(false);

  const dispatch = useAppDispatch();
  const { dataForcast: tableForcast } = useAppSelector((state) => state.forcast);
  const tableForcastSearch = useAppSelector(
    (state) => state.forcast.searchData
  );



  const { status, isExistSearch, nextPage, previousPage } = useAppSelector(
    (state) => state.forcast
  );


  console.log("tableFor", tableForcast);
  console.log("searchData", tableForcastSearch);

  React.useEffect(() => {
    dispatch(getDataForcast(null));
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
  console.log(status);

  function getNextPage() {
    dispatch(getDataForcast(nextPage));
  }

  function getPreviousPage() {
    dispatch(getDataForcast(previousPage));
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

        {status != "success" ? (
          <section className={styles.loader}>
            <Spin size={"large"} />
            <div>Идет загрузка</div>

            <div>Пожалуйста подождите...</div>
          </section>
        ) : (
          <>
            <TableForcast
              columns={mokColumnsTable}
              tableForcast={isExistSearch ? tableForcastSearch : tableForcast}
              onNextPage={getNextPage}
            />
            <ButtonExcel />
          </>
        )}

      </section>
    </>
  );
}
