import Head from "next/head";
import Header from "../components/Header";
import Lotteryentrance from "../components/Lotteryentrance";
import ManualHeader from "../components/ManualHeader";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Smart contract lottery</title>
      </Head>
      <Header />
      <Lotteryentrance />
    </div>
  );
}
