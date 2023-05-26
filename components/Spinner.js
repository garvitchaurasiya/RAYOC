import React from 'react'
import styles from '../styles/Spinner.module.css'

export default function Spinner() {
  return (
    <div>
      <div id={styles.background}>
        <div id={styles.spinner}></div>
        <div id={styles.base}></div>
      </div>
    </div>
  )
}