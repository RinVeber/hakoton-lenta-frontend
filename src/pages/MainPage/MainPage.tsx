import React from "react";
import styles from "./MainPage.module.css";
import Tabs from "../../components/Tabs/Tabs";
import ButtonExcel from "../../components/ButtonExcel/ButtonExcel";
import { mokColumnsStatic } from "../../utils/constant";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getDataSalesDiff } from "../../redux/slices/dataSalesDiffSlice";
import TableSales from "../../components/Table/TableSales/TableSales";
import { getShops } from "../../redux/slices/shopSlice";
import { getCategory } from "../../redux/slices/dataCategorySlice";
import ModalFilterState from "../../components/ModalFilter/ModalFilterState";
import { Header } from "../../components";
import { Spin } from "antd";
import { handleChangeIsExistSearch } from "../../redux/slices/dataForcastSlice";
// import NoSkuFound from "../../components/NoSkuFound/NoSkuFound";

export default function MainPage() {
  const [isActive, setIsActive] = React.useState(false);
  const [isNeedToReset, setIsNeedToReset] = React.useState(false);

  const dispatch = useAppDispatch();
  const {
    status,
    dataSalesDiff: tableSales,
    nextPage,
  } = useAppSelector((state) => state.salesDiff);

  React.useEffect(() => {
    dispatch(getDataSalesDiff(null));
    //dispatch(getShops());
    //dispatch(getCategory());
  }, [dispatch]);

  function handleOpenModal() {
    dispatch(getCategory());
    dispatch(getShops());
    setIsActive(!isActive);
  }
  function closeModal() {
    setIsActive(false);
    handleReset();
  }

  function getNextPage() {
    debugger;
    dispatch(getDataSalesDiff(nextPage));
  }

  function handleReset(){
    dispatch(handleChangeIsExistSearch(false))
    setIsNeedToReset(!isNeedToReset);
  }

  return (
    <>
      <div
        className={isActive ? styles.noBlur + " " + styles.blur : styles.noBlur}
        onClick={() => closeModal()}
      ></div>
      <section className={styles.MainPage}>
        <Header />
        <ModalFilterState
          isActive={isActive}
          handleOpenModal={handleOpenModal}
          isNeedToReset = {isNeedToReset}

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
            <TableSales
              columns={mokColumnsStatic}
              tableSales={tableSales}
              onNextPage={getNextPage}
            />
            <ButtonExcel />
        
          </>
        )}
        
      </section>
    </>
  );
}
