import styles from "./NoSkuFound.module.css";

interface NoSkuFoundProps {
    handleOpenModal: () => void,
    handleReset: () => void
}

export default function NoSkuFound({handleOpenModal, handleReset}: NoSkuFoundProps) {
  return (
    <section className={styles.noSkuFound}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>SKU не найдены</div>
        <div className={styles.subtitle}>Попробоуйте изменить фильтры</div>
      </div>
      <div className={styles.buttonContainer}>
        <div className={styles.buttonFilter} onClick={handleOpenModal}>Изменить фильтры</div>
        <div className={styles.buttonReset} onClick={handleReset}>Сбросить</div>
      </div>
    </section>
  );
}
