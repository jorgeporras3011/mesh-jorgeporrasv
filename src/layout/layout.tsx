import { Sidebar } from "./sidebar/sidebar";
import { Toolbar } from "./toolbar/toolbar";
import styles from "./layout.module.css";
import { useState } from "react";
import { PerformanceCrypto } from "../pages/performanceCrypto/performanceCrypto";
import { CompareCryptos } from "../pages/compareCryptos/compareCryptos";

export const Layout = () => {
  const compare = "Performance Crypto";
  const [showPage, setShowPage] = useState("Performance Crypto");
  return (
    <>
      <Toolbar />
      <div className={styles.layoutContainer}>
        <Sidebar setItem={setShowPage} />
        <div className={styles.childrenContainer}>
          {showPage === compare ? <PerformanceCrypto /> : <CompareCryptos />}
        </div>
      </div>
    </>
  );
};
