import React from "react";
import styles from "./Chips.module.css";
import { SelectOption, categoryType } from "../types/types";

interface ChipsPropsType {
  type: categoryType;
  chip: SelectOption | null | undefined;
  setFormDataByType: (type: categoryType, searchData: SelectOption | SelectOption[] | null) => void
}

export default function ChipsState({ type, chip, setFormDataByType  }: ChipsPropsType) {
  const [isExist, setIsExist] = React.useState(false);

  const [selectedChip, setSelectedChip] = React.useState(chip);

  React.useEffect(() => {
    setSelectedChip(chip);
    if (chip == null) {
      setIsExist(false);
    } else {
      setIsExist(true);
    }
  }, [chip, selectedChip]);

  function onDelete() {
    setSelectedChip(null);
    setFormDataByType(type, null);
  }

  if (!isExist) {
    return null;
  }
  return (
    <div className={styles.chips}>
      <div className={styles.chip}>
        <div className={styles.text}>{selectedChip?.title}</div>
        <div className={styles.btnDelete} onClick={() => onDelete()} />
      </div>
    </div>
  );
}
