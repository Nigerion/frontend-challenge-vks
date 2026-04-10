import { Outlet } from "react-router-dom";

import { Header } from "../../components/header/Header";
import cl from "./layoutPage.module.scss";

export const LayoutPage = () => {
  return (
    <div>
      <Header />
      <main className={cl.wrapper}>
        <Outlet />
      </main>
    </div>
  );
};
