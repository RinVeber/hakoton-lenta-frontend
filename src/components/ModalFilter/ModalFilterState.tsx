import React from "react";
import styles from "./ModalFilter.module.css";
import MultiSelectState from "./Select/MultiSelectState";
import up from "../../assets/arrow-up.svg";
import down from "../../assets/arrow-down.svg";
import { useAppSelector, useAppDispatch } from "../../redux/store";
import { getBy } from "../../utils/helperFunction";
import SelectState from "./Select/SelectState";
import ChipsState from "./Chips/ChipsState";
import MultiChipsState from "./Chips/MultiChipsState";
import { SearchForm, SelectOption } from "./types/types";
import { getDataForcastSearch } from "../../redux/slices/dataForcastSlice";

interface ModalProps {
  isActive: boolean;
  handleOpenModal: () => void;
}

export default function ModalFilterState({
  isActive,
  handleOpenModal,
}: ModalProps) {
  const [isSelectCity, setIsSelectCity] = React.useState(false);
  const [isSelectTK, setIsSelectTK] = React.useState(false);
  const [isSelectGroup, setIsSelectGroup] = React.useState(false);
  const [isSelectCategory, setIsSelectCategory] = React.useState(false);
  const [isSelectPodcategory, setIsSelectPodcategory] = React.useState(false);
  const [isSelectSKU, setIsSelectSKU] = React.useState(false);
  const [isHideTK, setIsHideTK] = React.useState(false);
  const [isHideGroup, setIsHideGroup] = React.useState(false);
  const [isHideCategory, setIsHideCategory] = React.useState(true);
  const [isHidePodcategory, setIsHidePodcategory] = React.useState(true);
  const [isHideSKU, setIsHideSKU] = React.useState(true);
  const category = useAppSelector((state) => state.category.data);
  const shops = useAppSelector((state) => state.shop.data);
  let listSelect = getBy(category);
  let listSelectShop = getBy(shops);
  const dispatch = useAppDispatch();

  const [formData, setFormData] = React.useState<SearchForm>({
    city: null,
    store: null,
    group: null,
    category: null,
    subcategory: null,
    sku: null,
  });

  function setFormDataByType(
    type: string,
    searchData: SelectOption | SelectOption[] | null
  ) {
    //let newFormData = formData;
    //(newFormData as any)[type] = searchData;

    setFormData({ ...formData, [type]: searchData });
  }

  React.useEffect(() => {
    // city
    // if (formData.city != null) {
    //   setIsHideTK(false);
    // } else {
    //   setIsHideTK(true);
    //   if (formData.store != null) {
    //     setFormData({
    //       ...formData,
    //       store: null,
    //       group: null,
    //       category: null,
    //       subcategory: null,
    //       sku: null,
    //     });
    //   }
    // }

    // // store
    // if (formData.store != null) {
    //   setIsHideGroup(false);
    // } else {
    //   setIsHideGroup(true);
    //   if (formData.group != null) {
    //     setFormData({
    //       ...formData,
    //       group: null,
    //       category: null,
    //       subcategory: null,
    //       sku: null,
    //     });
    //   }
    // }

    // group
    if (formData.group != null) {
      setIsHideCategory(false);
    } else {
      setIsHideCategory(true);
      if (formData.category != null) {
        setFormData({
          ...formData,
          group: null,
          category: null,
          subcategory: null,
          sku: null,
        });
      }
    }

    // category
    if (formData.category != null) {
      setIsHidePodcategory(false);
    } else {
      setIsHidePodcategory(true);
      if (formData.subcategory != null) {
        setFormData({ ...formData, subcategory: null, sku: null });
      }
    }

    // subcategory || podcategory
    if (formData.subcategory != null) {
      setIsHideSKU(false);
    } else {
      setIsHideSKU(true);
      if (formData.sku != null) {
        setFormData({ ...formData, sku: null });
      }
    }
  }, [formData]);

  function openSelectCity() {
    setIsSelectCity(!isSelectCity);
  }
  function openSelectTK() {
    setIsSelectTK(!isSelectTK);
  }
  function openSelectGroup() {
    setIsSelectGroup(!isSelectGroup);
  }
  function openSelectCategory() {
    setIsSelectCategory(!isSelectCategory);
  }
  function openSelectPodcategory() {
    setIsSelectPodcategory(!isSelectPodcategory);
  }
  function openSelectSKU() {
    setIsSelectSKU(!isSelectSKU);
  }

  const handleSumbit = (event: any) => {
    event.preventDefault();
    dispatch(getDataForcastSearch(formData));
    handleOpenModal();
  };
  const handleReset = (event: any) => {
    event.preventDefault();
    setFormData({
      city: null,
      store: null,
      group: null,
      category: null,
      subcategory: null,
      sku: null,
    });
  };
  return (
    <form className={isActive ? styles.modal_active : styles.modal}>

      <div className={styles.modal__header}>
        <div className={styles.modal__title}>Выбор торгового комплекса</div>
        <div className={styles.modal__close} onClick={handleOpenModal} />
      </div>
      <div className={styles.modal__content}>
        <div className={styles.modal__selectContent}>
          <div className={styles.modal__container}>
            <div className={styles.modal__wrap}>
              <div className={styles.modal__select} onClick={openSelectCity}>
                <div className={styles.modal__selectName}>Город</div>
                <img
                  src={isSelectCity ? up : down}
                  className={styles.iconSelect}
                  alt="иконка"
                />
              </div>
              <ChipsState
                type={"city"}
                setFormDataByType={setFormDataByType}
                chip={formData.city}
              />
            </div>
            <SelectState
              openSelect={openSelectCity}
              isSelect={isSelectCity}
              selectOptions={listSelectShop.st_city_id}
              selectedOptions={formData.city}
              type={"city"}
              setFormDataByType={setFormDataByType}
            />
          </div>
          {isHideTK ? null : (
            <div className={styles.modal__container}>
              <div className={styles.modal__wrap}>
                <div className={styles.modal__select} onClick={openSelectTK}>
                  <div className={styles.modal__selectName}>
                    Торговый комплекс
                  </div>
                  <img
                    src={isSelectTK ? up : down}
                    className={styles.iconSelect}
                    alt="иконка"
                  />
                </div>
                <ChipsState
                  type={"store"}
                  setFormDataByType={setFormDataByType}
                  chip={formData.store}
                />
              </div>
              <SelectState
                openSelect={openSelectTK}
                isSelect={isSelectTK}
                selectOptions={listSelectShop.st_division_code}
                selectedOptions={formData.store}
                type={"store"}
                setFormDataByType={setFormDataByType}
              />
            </div>
          )}

          <div className={styles.modal__title}>Выбор товаров</div>

          {isHideGroup ? null : (
            <div className={styles.modal__container}>
              <div className={styles.modal__wrap}>
                <div className={styles.modal__select} onClick={openSelectGroup}>
                  <div className={styles.modal__selectName}>Группа товаров</div>
                  <img
                    src={isSelectGroup ? up : down}
                    className={styles.iconSelect}
                    alt="иконка"
                  />
                </div>
                <ChipsState
                  type={"group"}
                  setFormDataByType={setFormDataByType}
                  chip={formData.group}
                />
              </div>
              <SelectState
                openSelect={openSelectGroup}
                isSelect={isSelectGroup}
                selectOptions={listSelect.pr_group_id}
                selectedOptions={formData.group}
                type={"group"}
                setFormDataByType={setFormDataByType}
              />
            </div>
          )}
          {isHideCategory ? null : (
            <div className={styles.modal__container}>
              <div className={styles.modal__wrap}>
                <div
                  className={styles.modal__select}
                  onClick={openSelectCategory}
                >
                  <div className={styles.modal__selectName}>Категория</div>
                  <img
                    src={isSelectCategory ? up : down}
                    className={styles.iconSelect}
                    alt="иконка"
                  />
                </div>
                <ChipsState
                  type={"category"}
                  setFormDataByType={setFormDataByType}
                  chip={formData.category}
                />
              </div>
              <SelectState
                openSelect={openSelectCategory}
                isSelect={isSelectCategory}
                selectOptions={listSelect.pr_cat_id}
                selectedOptions={formData.category}
                type={"category"}
                setFormDataByType={setFormDataByType}
              />
            </div>
          )}
          {isHidePodcategory ? null : (
            <div className={styles.modal__container}>
              <div className={styles.modal__wrap}>
                <div
                  className={styles.modal__select}
                  onClick={openSelectPodcategory}
                >
                  <div className={styles.modal__selectName}>Подкатегория</div>
                  <img
                    src={isSelectPodcategory ? up : down}
                    className={styles.iconSelect}
                    alt="иконка"
                  />
                </div>
                <ChipsState
                  type={"subcategory"}
                  setFormDataByType={setFormDataByType}
                  chip={formData.subcategory}
                />
              </div>
              <SelectState
                openSelect={openSelectPodcategory}
                isSelect={isSelectPodcategory}
                selectOptions={listSelect.pr_subcat_id}
                selectedOptions={formData.subcategory}
                type={"subcategory"}
                setFormDataByType={setFormDataByType}
              />
            </div>
          )}

          {isHideSKU ? null : (
            <div className={styles.modal__container}>
              <div className={styles.modal__wrap}>
                <div className={styles.modal__select} onClick={openSelectSKU}>
                  <div className={styles.modal__selectName}>SKU</div>
                  <img
                    src={isSelectSKU ? up : down}
                    className={styles.iconSelect}
                    alt="иконка"
                  />
                </div>
                <MultiChipsState
                  chips={formData.sku}
                  setFormDataByType={setFormDataByType}
                />
              </div>
              <MultiSelectState
                openSelect={openSelectSKU}
                isSelect={isSelectSKU}
                selectOptions={listSelect.pr_sku_id}
                selectedOptions={formData.sku}
                type={"sku"}
                setFormDataByType={setFormDataByType}
              />
            </div>
          )}
        </div>
        <div className={styles.modal__btnСontainer}>
          <button
            type="submit"
            className={styles.modal__submit}
            onClick={(e) => handleSumbit(e)}
          >
            Показать
          </button>
          <button
            className={styles.modal__cancel}
            onClick={(evt) => handleReset(evt)}
          >
            Сбросить
          </button>
        </div>
      </div>
    </form>
  );
}
