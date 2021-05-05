import React from 'react'
import styles from '@components/LoadingInline/index.module.scss'

export default function LoadingInline({ children }) {
  return (
    <div className={styles.loadingInline}>
      <svg width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <circle cx={50} cy={23} r={13} fill="#e15b64">
          <animate
            attributeName="cy"
            dur="1s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.45 0 0.9 0.55;0 0.45 0.55 0.9"
            keyTimes="0;0.5;1"
            values="23;77;23"
          />
        </circle>
      </svg>
      {children}
    </div>
  )
}