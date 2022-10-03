import React from "react";
import styles from "./navbar.module.css";
const Navbar = () => {
  return (
    <div className={`${styles.navbar}`}>
      <div className={`${styles.navbarContainer}`}>
        <div className={` ${styles.title}`}>STRIPE APP</div>

        <div className={styles.btnContainer}>
          <div className={`${styles.navbarBtnBox}`}>
            <div
              className={`${styles.navbarBtn} ${styles.navbarBtn2}`}
              onClick={() => {
                window.open("/subscriptionpage", "_self");
              }}
            >
              Buy Plans
            </div>
          </div>
          <div>
            <div
              className={`${styles.navbarBtn} ${styles.navbarBtn2}`}
              onClick={() => {
                window.open("/userprofile", "_self");
              }}
            >
              My Account
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
