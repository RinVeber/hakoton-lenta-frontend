import React from 'react';
import styles from './Select.module.css';

interface SelectProps {
    openSelect: () => void,
    isSelect: boolean,
    city?: [],
    TK?: []
    group?: []
    category?: [],
    podcategory?: [],
    sku?: [],
    selectOptions: {
        id: number,
        title: string
    }[]

}

export default function Select({openSelect, isSelect, selectOptions}: SelectProps) {
  return (
    <div className={isSelect ? styles.select : styles.select_hide}>
        <ul className={styles.options}>
            {selectOptions.map((item) => {
                return (
                    <li key={item.id} className={styles.option}>
                  {item.title}
                </li>
                )
            })}
    
        </ul>
    </div>
  )
}
