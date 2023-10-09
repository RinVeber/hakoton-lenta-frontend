import React from "react";
import styles from "./Select.module.css";
import { SelectOption, categoryType } from "../types/types";

interface SelectProps {
  openSelect?: () => void;
  isSelect: boolean;
  type: categoryType;
  selectOptions: SelectOption[];
  selectedOptions: SelectOption | null | undefined;
  setFormDataByType: (type: categoryType, searchData: SelectOption | SelectOption[] | null) => void
}

export default function SelectState({
  isSelect,
  selectOptions,
  type,
  selectedOptions,
  setFormDataByType
}: SelectProps) {
  const [isLoading, setLoading] = React.useState(false);

  function onSelect(item: SelectOption) {
    if (item.id == selectedOptions?.id) {
        setFormDataByType(type, null);

    } else {
      setFormDataByType(type, item);
    }
  }
  React.useEffect(() => {
    if (selectOptions == undefined) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [selectOptions]);

  if (!isLoading) {
    return null;
  } else {
    return (
      <div className={isSelect ? styles.select : styles.select_hide}>
        <ul className={styles.options}>
          {selectOptions.map((item) => {
            return (
              <li
                key={item?.id}
                className={
                    selectedOptions?.id !== item.id
                    ? styles.option
                    : styles.optionActive
                }
                onClick={() => {
                onSelect(item);
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
