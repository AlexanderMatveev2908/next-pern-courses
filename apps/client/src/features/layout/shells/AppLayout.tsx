import type { FC } from "react";
import Header from "../../../features/layout/components/Header/Header";
import Sidebar from "../../../features/layout/components/Sidebar/Sidebar";
import Popup from "../../../features/layout/components/Popup/Popup";
import Footer from "../../../features/layout/components/Footer/Footer";
import Providers from "./Providers";

type PropsType = {
  children: React.ReactNode;
};
const AppLayout: FC<PropsType> = ({ children }) => {
  return (
    <Providers>
      <Header />

      <Sidebar />

      <Popup />

      {children}

      <Footer />
    </Providers>
  );
};

export default AppLayout;
