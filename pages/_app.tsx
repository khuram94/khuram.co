import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    // <AnimatePresence mode="popLayout">
    //   <motion.div
    //     initial="initialState"
    //     animate="animateState"
    //     exit="exitState"
    //     variants={{
    //       initialState: {
    //         y: "100vh",
    //       },
    //       animateState: {
    //         transition: { duration: 1 },
    //         y: 0,
    //       },
    //       exitState: {
    //         transition: { duration: 1 },
    //         y: "-100vh",
    //       },
    //     }}
    //     key={router.route}
    //   >

    <Component {...pageProps} />

    //   </motion.div>
    // </AnimatePresence>
  );
}
