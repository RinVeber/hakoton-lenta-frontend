import React from "react";
import styles from "./Table.module.css";
import { Table, TableHead, TableRow } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import up from "../../assets/filter-up.svg";
import down from "../../assets/filter-down.svg";
import downActive from "../../assets/filter-down-active.svg";
import upActive from "../../assets/filter-up-active.svg";
import { mokDataSource, mokColumnsTable } from "../../utils/constant";

export default function () {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

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
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead
          sx={{
            position: "sticky",
            top: 0,
            backgroundColor: "white",
          }}
        >
          <TableRow
            sx={{
              display: "flex",
            }}
          >
            {mokColumnsTable.map((item) => {
              return (
                <div key={item.key} className={styles.table__columnContainer}>
                  <div className={styles.table__columnName}>{item.title}</div>
                  <div className={styles.table__columnFilter}>
                    <img
                      src={lastSortTitle == item.title + "up" ? upActive : up}
                      className={styles.table__columnFilter_icon}
                      alt="иконка"
                      onClick={() => {
                        const typeAdd = "add";
                        setlastSortTitle(item.title + "up");
                        handlerSort(item.title, typeAdd);
                      }}
                    />
                    <img
                      src={
                        lastSortTitle == item.title + "down" ? downActive : down
                      }
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
          </TableRow>
        </TableHead>
        <div className={styles.table__rows}>
          <TableBody>
            {sortList.map((item) => {
              return (
                <div key={item.key} className={styles.table__row}>
                  <div className={styles.table__rowCell}>{item.name}</div>
                  <div className={styles.table__rowCell}>{item.group}</div>
                  <div className={styles.table__rowCell}>{item.category}</div>
                  <div className={styles.table__rowCell}>
                    {item.podcategory}
                  </div>
                  <div className={styles.table__rowCell}>{item.sku}</div>
                  <div className={styles.table__rowCell}>10</div>
                  <div className={styles.table__rowCell}>10</div>
                  <div className={styles.table__rowCell}>10</div>
                  <div className={styles.table__rowCell}>10</div>
                  <div className={styles.table__rowCell}>10</div>
                  <div className={styles.table__rowCell}>10</div>
                  <div className={styles.table__rowCell}>10</div>
                  <div className={styles.table__rowCell}>10</div>
                  <div className={styles.table__rowCell}>10</div>
                  <div className={styles.table__rowCell}>10</div>
                  <div className={styles.table__rowCell}>10</div>
                  <div className={styles.table__rowCell}>10</div>
                  <div className={styles.table__rowCell}>10</div>
                  <div className={styles.table__rowCell}>10</div>
                </div>
              );
            })}
          </TableBody>
        </div>
      </Table>
    </section>
  );
}
