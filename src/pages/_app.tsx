import type { AppProps } from "next/app";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "modern-normalize/modern-normalize.css";
import "react-html5-camera-photo/build/css/index.css";
import GlobalStyle from "../styles/styles.global";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import modalConfirmContext from "../context/modalConfirmContext";
import useModalConfirm from "../hooks/useModalConfirm";
import ModalConfirm from "../features/shared/components/modalConfirm";
const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
  const useValueModalConfirm = useModalConfirm();

  return (
    <>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <modalConfirmContext.Provider value={useValueModalConfirm}>
          <Component {...pageProps} />
          <ModalConfirm />
        </modalConfirmContext.Provider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}
export default MyApp;
