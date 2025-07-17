import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "../styles/globals.css";
import Providers from "@/features/layout/shells/Providers";
import Header from "@/features/layout/components/Header/Header";
import Footer from "@/features/layout/components/Footer/Footer";
import Sidebar from "@/features/layout/components/Sidebar/Sidebar";
import "highlight.js/styles/github-dark.css";
import Toast from "@/features/layout/components/Toast/Toast";
import { genStoreRTK } from "@/core/store/store";
import { wakeUpSliceAPI } from "@/features/wakeUp/slices/sliceAPI";
import { wrapCallSSR } from "@/core/lib/api";
import { coursesSliceAPI } from "@/features/courses/slices/apiSlice";
import { genURLSearchParams } from "@/core/lib/processForm";
import { gabFormValsPagination } from "@/features/layout/components/SearchBar/lib/style";
import LeftSideBar from "@/features/layout/components/LeftSideBar/LeftSideBar";

const fira_code = Fira_Code({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Next PERN courses",
  description: "Next PERN App for courses development",
  icons: {
    icon: "/favicon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const store = genStoreRTK();

  await Promise.all([
    wrapCallSSR(() =>
      store.dispatch(wakeUpSliceAPI.endpoints.wakeUpFly.initiate()),
    ),
    wrapCallSSR(() =>
      store.dispatch(wakeUpSliceAPI.endpoints.getListDummyItems.initiate()),
    ),

    wrapCallSSR(() =>
      store.dispatch(
        coursesSliceAPI.endpoints.getCourses.initiate({
          vals: genURLSearchParams(
            gabFormValsPagination({ page: 0, limit: 2 }),
          ),
        }),
      ),
    ),

    wrapCallSSR(() =>
      store.dispatch(coursesSliceAPI.endpoints.getCoursesSummary.initiate({})),
    ),
  ]);

  const preloadedState = store.getState();

  return (
    <html lang="en">
      <body
        className={`${fira_code.className}  antialiased bg-neutral-950 min-h-screen min-w-screen`}
      >
        <Providers {...{ preloadedState }}>
          <div
            id="portal-root"
            className="w-full max-w-full min-h-full  overflow-x-hidden absolute pointer-events-none"
          ></div>

          <Header />

          <Toast />

          <Sidebar />

          <LeftSideBar />
          <div className="pad__app pt-[20px] sm:pt-30px pb-[100px] sm:pb-[150px] w-full h-full flex flex-col">
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
