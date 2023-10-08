import React from "react";
import styles from "./Chips.module.css";
import { SelectOption, categoryType } from "../types/types";

interface ChipsPropsType {
  chips: SelectOption[] | null | undefined;
  setFormDataByType: (type: categoryType, searchData: SelectOption | SelectOption[] | null) => void
}

export default function MultiChipsState({ chips, setFormDataByType  }: ChipsPropsType) {
  const [isExist, setIsExist] = React.useState(false);

  React.useEffect(() => {
    if (chips == null) {
      setIsExist(false);
    } else {
      setIsExist(true);
    
    }
  }, [chips]);

  function onDelete(item: any) {
   let newChips = chips?.filter((value) => value.id != item.id) || null;
   setFormDataByType('sku', newChips);
  }

  if (!isExist) {
    return null;
  }
  return (
    <div className={styles.chips}>
      {chips?.map((item) => {
        return (
          <div key={item.id} className={styles.chip}>
            <div className={styles.text}>{item.title}</div>
            <div className={styles.btnDelete} onClick={() => onDelete(item)} />
          </div>
        );
      })}
    </div>
  );
}
