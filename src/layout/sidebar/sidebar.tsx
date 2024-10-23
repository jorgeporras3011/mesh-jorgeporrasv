import { Dispatch, SetStateAction, useState } from "react";
import styles from "./sidebar.module.css";

interface MenuItems {
  label: string;
  route: string;
}

interface ISidebar {
  setItem: Dispatch<SetStateAction<string>>;
}

export const Sidebar = ({ setItem }: ISidebar) => {
  const defaultItemSelected = {
    label: "Performance Crypto",
    route: "/",
  };
  const [selectedItems, setSelectedItem] = useState(defaultItemSelected);
  const menu: MenuItems[] = [
    defaultItemSelected,
    {
      label: "Compare Crytpos",
      route: "",
    },
  ];
  return (
    <div className={styles.sidebarContent}>
      {menu.map((item) => {
        return (
          <div
            key={item.label}
            className={`${styles.menuItem} ${
              item.label === selectedItems.label ? styles.menuItemSelected : ""
            }`}
            onClick={() => {
              setSelectedItem(item);
              setItem(item.label);
            }}
          >
            {item.label}
          </div>
        );
      })}
    </div>
  );
};
