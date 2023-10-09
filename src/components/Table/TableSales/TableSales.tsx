import React from "react";
import styles from "./TableSales.module.css";
import up from "../../../assets/filter-up.svg";
import down from "../../../assets/filter-down.svg";
import downActive from "../../../assets/filter-down-active.svg";
import upActive from "../../../assets/filter-up-active.svg";
import { columnsTable } from "../../../types/types";

type TableSales = {
  store: string;
  group: string;
  category: string;
  subcategory: string;
  sku: string;
  date: string;
  sales_units: number;
  forecast_units: number;
  diff_sales_units: string;
  wape: string;
};

interface TableProps {
  columns: columnsTable[];
  tableSales: TableSales[];
  onNextPage: () => void;
}
export default function TableSales({
  columns,
  tableSales,
  onNextPage,
}: TableProps) {
  const [sortList, setSortList] = React.useState(tableSales);
  const [sortType, setSortType] = React.useState("");
  const [lastSortTitle, setlastSortTitle] = React.useState("");
  const [scrollTop, setScrollTop] = React.useState<number>(0);

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
    if (sortType === "TK") {
      setSortList([...Array.from(sortList).sort(customSort("store", type))]);
    } else if (sortType === "Группа") {
      setSortList([...Array.from(sortList).sort(customSort("group", type))]);
    } else if (sortType === "Категория") {
      setSortList([...Array.from(sortList).sort(customSort("category", type))]);
    } else if (sortType === "Подкатегория") {
      setSortList([
        ...Array.from(sortList).sort(customSort("subcategory", type)),
      ]);
    } else if (sortType === "SKU") {
      setSortList([...Array.from(sortList).sort(customSort("sku", type))]);
    }
  };

  function handleWheel(e: any) {
    console.log(tableRef.current?.scrollTop);

    console.log(e);


    // c бэкенд всегда шлется 2 одинаковых объекта
    if (scrollTop != 0 && scrollTop == tableRef.current?.scrollTop) {
      onNextPage();
    }
    setScrollTop(tableRef.current?.scrollTop || 0);

  }

  return (
    <section
      className={styles.tableSales}
      ref={tableRef}
      onWheel={(e) => handleWheel(e)}
    >
      <div className={styles.table__content}>
        <div className={styles.table__head}>
          <div className={styles.table__rowHead}>
            {columns.map((item) => {
              return (
                <div
                  key={item.key}
                  className={styles.table__columnField}
                  onClick={() => {
                    setSortType(sortType == "add" ? "decrease" : "add");
                    setlastSortTitle(
                      sortType == "add"
                        ? item.title + "down"
                        : item.title + "up"
                    );
                    handlerSort(item.title, sortType);
                  }}
                >
                  <div className={styles.table__columnName}>{item.title}</div>
                  <div className={styles.table__columnFilter}>
                    <img
                      src={lastSortTitle == item.title + "up" ? upActive : up}
                      className={styles.table__columnFilter_icon}
                      alt="иконка"
                    />
                    <img
                      src={
                        lastSortTitle == item.title + "down" ? downActive : down
                      }
                      className={styles.table__columnFilter_icon}
                      alt="иконка"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {sortList.map((item, index) => {
          return (
            <div key={index} className={styles.table__row}>
              <div className={styles.table__rowCell}>
                <div className={styles.table__rowCellText}>
                  {item.store.length > 32
                    ? item.store.slice(0, 29) + "..."
                    : item.store}
                </div>
              </div>
              <div className={styles.table__rowCell}>
                <div className={styles.table__rowCellText}>
                  {item.group.length > 32
                    ? item.group.slice(0, 29) + "..."
                    : item.group}
                </div>
              </div>
              <div className={styles.table__rowCell}>
                <div className={styles.table__rowCellText}>
                  {item.category.length > 32
                    ? item.category.slice(0, 29) + "..."
                    : item.category}
                </div>
              </div>
              <div className={styles.table__rowCell}>
                <div className={styles.table__rowCellText}>
                  {item.subcategory.length > 32
                    ? item.subcategory.slice(0, 29) + "..."
                    : item.subcategory}
                </div>
              </div>
              <div className={styles.table__rowCell}>
                <div className={styles.table__rowCellText}>
                  {item.subcategory.length > 32
                    ? item.sku.slice(0, 29) + "..."
                    : item.sku}
                </div>
              </div>
              <div className={styles.table__rowCell}>
                <div className={styles.table__rowCellText}>{item.date}</div>
              </div>
              <div className={styles.table__rowCell}>
                <div className={styles.table__rowCellText}>
                  {item.sales_units}
                </div>
              </div>
              <div className={styles.table__rowCell}>
                <div className={styles.table__rowCellText}>
                  {item.forecast_units}
                </div>
              </div>
              <div className={styles.table__rowCell}>
                <div className={styles.table__rowCellDiff}>
                  <div className={styles.table__rowCellTextDiff}>
                    {item.diff_sales_units.split(".")[0]}
                  </div>
                </div>
              </div>

              <div className={styles.table__rowCell}>
                <div className={styles.table__rowCellText}>{item.wape}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
