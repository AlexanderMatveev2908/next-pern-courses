import type { FC } from "react";
import Header from "../../../features/layout/components/Header/Header";
import Sidebar from "../../../features/layout/components/Sidebar/Sidebar";
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

      <div className="pad__app pt-[20px] sm:pt-30px pb-[100px] sm:pb-[150px] w-full h-full flex flex-col">
        {children}
      </div>

      <Footer />
    </Providers>
  );
};

export default AppLayout;
