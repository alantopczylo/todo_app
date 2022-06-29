import React from 'react'
import styles from "../styles/NavBar.module.css"

const NavBar = ({children, ...rest}) => {
  return (
    <h1 className={styles.title} {...rest}>
      {children}
    </h1>
  )
}

export default NavBar