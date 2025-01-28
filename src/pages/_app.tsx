import "@/styles/globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { client } from "./api/queryclient";
import { Provider } from "react-redux";
import { store } from "./api/redux/ReduxStore";

export default function App({ Component, pageProps }: AppProps) {
  return(
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Provider>
  ) 
  
}
