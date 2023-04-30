import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/portfolio/Layout";
import { AnimatePresence } from "framer-motion";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AnimatePresence>
      <Component {...pageProps} />
    </AnimatePresence>
  );
}

// clip-path: polygon(0 100%, 100% 100%, 50% 100%, 50% 100%);
