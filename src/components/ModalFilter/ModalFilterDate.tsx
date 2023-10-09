import styles from "../../styles/ModalFilterDate.module.css";
import { Radio, RadioChangeEvent, DatePicker } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import React, { useState, useEffect, FC } from "react";

interface IPropModal {
  isActive?: boolean;
  setCurrentDate: React.Dispatch<React.SetStateAction<string[]>>
}

const { RangePicker } = DatePicker;

const ModalFilterDate: FC<IPropModal> = ({ isActive, setCurrentDate }) => {
  const [value, setValue] = useState<string>("day");
  const [activeDate, setIsActiveDate] = useState<boolean>(false);
  const [activeWeek, setIsActiveWeek] = useState<boolean>(false);
  const [activeMonths, setIsActiveMonths] = useState<boolean>(false);

  const [disabledDate, setIsDisabledDate] = useState<boolean>(false);
  const [disabledWeek, setIsDisabledWeek] = useState<boolean>(false);
  const [disablesMonths, setIsDisablesMonths] = useState<boolean>(false);

  const [dateValue, setDateValue] = useState<string[]>([]);

  const style: React.CSSProperties = {
    borderRadius: "16px",
  };

  useEffect(() => {
    if (isActive) {
      setIsActiveDate(true);
    }
  }, [isActive]);

  // useEffect(() => {
  //   if (dateValue.length != 0) {
  //     switch (value) {
  //       case "day":
  //         setIsDisabledDate(false);
  //         setIsDisabledWeek(true);
  //         setIsDisablesMonths(true);
  //         break;
  //       case "week":
  //         setIsDisabledDate(true);
  //         setIsDisabledWeek(false);
  //         setIsDisablesMonths(true);
  //         break;
  //       case "months":
  //         setIsDisabledDate(true);
  //         setIsDisabledWeek(true);
  //         setIsDisablesMonths(false);
  //         break;

  //       default:
  //         break;
  //     }
  //   }
  //   for (let key of dateValue) {
  //     if (key == "") {
  //       setIsDisabledDate(false);
  //       setIsDisabledWeek(false);
  //       setIsDisablesMonths(false);
  //     }
  //   }
  // }, [dateValue]);

  const onChangeRadio = (e: RadioChangeEvent) => {
    setValue(e.target.value);
    switch (e.target.value) {
      case "day":
        setIsActiveDate(true);
        setIsActiveWeek(false);
        setIsActiveMonths(false);
        break;
      case "week":
        setIsActiveDate(false);
        setIsActiveWeek(true);
        setIsActiveMonths(false);
        break;
      case "months":
        setIsActiveDate(false);
        setIsActiveWeek(false);
        setIsActiveMonths(true);
        break;

      default:
        break;
    }
  };

  const onChange: RangePickerProps["onChange"] = (date, rengerDate) => {
    const newDate = Object.assign({}, rengerDate);
    setCurrentDate(newDate);
    setDateValue(rengerDate);
  };

  return (
    <section className={styles.filterDate}>
      <Radio.Group
        onChange={onChangeRadio}
        value={value}
        className={styles.radioGroup}
      >
        <Radio
          value={"day"}
          className={styles.radio}
          defaultChecked={true}
          disabled={disabledDate}
        >
          День
        </Radio>
        <RangePicker
          onChange={onChange}
          className={
            activeDate ? styles.dateRangerActive : styles.dateRangerUnvisible
          }
          popupStyle={style}
        />
        <Radio
          value={"week"}
          className={styles.radio}
          defaultChecked={false}
          disabled={disabledWeek}
        >
          Неделя
        </Radio>
        <RangePicker
          picker="week"
          onChange={onChange}
          className={
            activeWeek ? styles.dateRangerActive : styles.dateRangerUnvisible
          }
          popupStyle={style}
        />
        <Radio
          value={"months"}
          className={styles.radio}
          defaultChecked={false}
          disabled={disablesMonths}
        >
          Месяц
        </Radio>
        <RangePicker
          picker="month"
          onChange={onChange}
          className={
            activeMonths ? styles.dateRangerActive : styles.dateRangerUnvisible
          }
          popupStyle={style}
        />
      </Radio.Group>
    </section>
  );
};

export default ModalFilterDate;
