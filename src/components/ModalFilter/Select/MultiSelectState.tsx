import React from "react";
import styles from "./Select.module.css";
import { SelectOption, categoryType } from "../types/types";

interface SelectProps {
  openSelect: () => void;
  isSelect: boolean;
  type: "sku";
  selectOptions: SelectOption[];
  selectedOptions: SelectOption[] | null | undefined;
  setFormDataByType: (type: categoryType, searchData: SelectOption | SelectOption[] | null) => void
}

export default function MultiSelectState({
  openSelect,
  isSelect,
  selectOptions,
  type,
  selectedOptions,
  setFormDataByType
}: SelectProps) {
  const [isLoading, setLoading] = React.useState(false);

  function onMultiSelect(item: SelectOption) {
    let newMultiSelect = selectedOptions || [];
    if (newMultiSelect.find((v) => item.id == v.id)) {
      newMultiSelect = [...newMultiSelect.filter((v) => v.id != item.id)];
    } else {
      newMultiSelect = [...newMultiSelect, { id: item.id, title: item.title }];
    }
    setFormDataByType(type, newMultiSelect);
  }

  React.useEffect(() => {
    if (selectOptions == undefined) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [selectOptions]);

  function selectAll() {
    setFormDataByType(type, selectOptions);
  }

  if (!isLoading) {
    return null;
  } else {
    return (
      <div className={isSelect ? styles.select : styles.select_hide}>
        <div className={styles.selectAll} onClick={() => selectAll()}>Выбрать все</div>
        <ul className={styles.options}>
          {selectOptions.map((item) => {
            return (
              <li
                key={item.id}
                className={
                  selectedOptions?.find((value) => value.id === item.id)
                    ? styles.optionActive
                    : styles.option
                }
                onClick={() => {
                  onMultiSelect(item);
                }}
              >
                <div className={styles.option__rowText}>{item?.title}</div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
