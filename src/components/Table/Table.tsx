import React from "react";
import styles from "./Table.module.css";
import up from "../../assets/filter-up.svg";
import down from "../../assets/filter-down.svg";
import {mokDataSource} from '../../utils/constant';
import { columnsTable } from "../../types/types";

interface TableProps {
  mokColumns: columnsTable[]
}

export default function Table({mokColumns} : TableProps) {

  const [sortList, setSortList] = React.useState(mokDataSource);
  const tableRef = React.useRef<HTMLDivElement>(null);

  const customSort = (sortField : string) => {
    return function (a: any, b: any) {
       if (a[sortField] < b[sortField]) {
         return -1;
       }
       if (a[sortField] > b[sortField]) {
         return 1;
       }
       return 0;
     }
   }
   const handlerSort = (sortType: string) => {
    console.log(sortType)
     if (sortType === "TK") {
       setSortList([...sortList.sort(customSort("name"))]);
     } else if (sortType === "Группа") {
       setSortList([...sortList.sort(customSort("group"))]);
     } else if (sortType === "Категория") {
       setSortList([...sortList.sort(customSort("category"))]);
     } else if (sortType === "Подкатегория") {
       setSortList([...sortList.sort(customSort("podcategory"))]);
     } else if (sortType === "SKU") {
       setSortList([...sortList.sort(customSort("sku"))]);
     }
   };

  return (
    <section className={styles.table} ref={tableRef}>
      <div className={styles.table__columnField}>
        {mokColumns.map((item) => {
          return (
            <div key={item.key} className={styles.table__columnContainer}>
              <div className={styles.table__columnName}>{item.title}</div>
              <div className={styles.table__columnFilter}>
                <img
                  src={up}
                  className={styles.table__columnFilter_icon}
                  alt="иконка"
                  onClick={() => (handlerSort(item.title))}
                />
                <img
                  src={down}
                  className={styles.table__columnFilter_icon}
                  alt="иконка"
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.table__rows}>
        {sortList.map((item) => {
          return (
            <div key={item.key} className={styles.table__row}>
              <div className={styles.table__rowCell}>{item.name}</div>
              <div className={styles.table__rowCell}>{item.group}</div>
              <div className={styles.table__rowCell}>{item.category}</div>
              <div className={styles.table__rowCell}>{item.podcategory}</div>
              <div className={styles.table__rowCell}>{item.sku}</div>
              <div className={styles.table__rowCell}>{item.sku}</div>
              <div className={styles.table__rowCell}>{item.sku}</div>
              <div className={styles.table__rowCell}>{item.sku}</div>
              <div className={styles.table__rowCell}>{item.sku}</div>
              <div className={styles.table__rowCell}>{item.sku}</div>
              <div className={styles.table__rowCell}>{item.sku}</div>
              <div className={styles.table__rowCell}>{item.sku}</div>
              <div className={styles.table__rowCell}>{item.sku}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
