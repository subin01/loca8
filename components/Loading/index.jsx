import React from 'react'
import Mask from '../Mask'
import styles from '@components/Loading/index.module.scss'

export default function Loading({ children }) {
  return (
    <Mask>
      <div initial={{ opacity: 0, translateY: 30 }} animate={{ opacity: 1, translateY: 0 }} className={styles.loading}>
        {children}
      </div>
    </Mask>
  )
}
