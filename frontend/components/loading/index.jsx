import React from "react";
import styles from "./loading.module.css";

const CustomLoading = () => (
  <div className={`${styles.custom}`}>
    <div className={`${styles.box}`}>
      <div className={`${styles.balls}`}>
        <div className={`${styles.ball} ${styles.ball1}`}></div>
        <div className={`${styles.ball} ${styles.ball2}`}></div>
        <div className={`${styles.ball} ${styles.ball3}`}></div>
      </div>
      <span className={`${styles.customText}`}>Loading...</span>
    </div>
  </div>
);
const Loading = () => {
  return <CustomLoading />;
};

export default Loading;
