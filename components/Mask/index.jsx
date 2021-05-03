import React from 'react'
import styles from '@components/Mask/index.module.scss'

export default function Mask({ children }) {
  return <div className={styles.mask}>{children}</div>
}
