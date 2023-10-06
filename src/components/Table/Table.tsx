import React from "react";
import styles from "./Table.module.css";
import up from "../../assets/filter-up.svg";
import down from "../../assets/filter-down.svg";
import downActive from "../../assets/filter-down-active.svg";
import upActive from "../../assets/filter-up-active.svg";
import { mokDataSource } from "../../utils/constant";
import { columnsTable } from "../../types/types";

interface TableProps {
  mokColumns: columnsTable[];
}

export default function Table({ mokColumns }: TableProps) {
  const [sortList, setSortList] = React.useState(mokDataSource);
  const [lastSortTitle, setlastSortTitle] = React.useState("");

  const tableRef = React.useRef<HTMLDivElement>(null);

  const customSort = (sortField: string, type: string) => {
    return function (a: any, b: any) {
      if (type == "add") {
        if (a[sortField] < b[sortField]) {
          return -1;
        }
        if (a[sortField] > b[sortField]) {
          return 1;
        }
        return 0;
      } else {
        if (a[sortField] > b[sortField]) {
          return -1;
        }
        if (a[sortField] < b[sortField]) {
          return 1;
        }
        return 0;
      }
    };
  };
  const handlerSort = (sortType: string, type: string) => {
    console.log(sortType);
    if (sortType === "TK") {
      setSortList([...sortList.sort(customSort("name", type))]);
    } else if (sortType === "Группа") {
      setSortList([...sortList.sort(customSort("group", type))]);
    } else if (sortType === "Категория") {
      setSortList([...sortList.sort(customSort("category", type))]);
    } else if (sortType === "Подкатегория") {
      setSortList([...sortList.sort(customSort("podcategory", type))]);
    } else if (sortType === "SKU") {
      setSortList([...sortList.sort(customSort("sku", type))]);
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
                  src={lastSortTitle == item.title + "up" ? upActive : up }
                  className={styles.table__columnFilter_icon}
                  alt="иконка"
                  onClick={() => {
                    const typeAdd = "add";
                    setlastSortTitle(item.title + "up");
                    handlerSort(item.title, typeAdd);
                  }}
                />
                <img
                  src={lastSortTitle == item.title + "down" ? downActive : down}
                  className={styles.table__columnFilter_icon}
                  alt="иконка"
                  onClick={() => {
                    const typeDecrase = "decrease";
                    setlastSortTitle(item.title + "down");
                    handlerSort(item.title, typeDecrase);
                  }}
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
              <div className={styles.table__rowCell}>10</div>
              <div className={styles.table__rowCell}>10</div>
              
    
            </div>
          );
        })}
      </div>
    </section>
  );
}
