import type { FC, PropsWithChildren } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";
import "@/assets/styles/global.scss";

interface AppProps extends PropsWithChildren {}

const App: FC<AppProps> = ({ children }) => {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
};

export default App;