import Footer from 'Components/Templates/Footer/Footer';
import Header from 'Components/Templates/Header/Header';
import type { NextPage } from 'next'
import Head from 'next/head';


const Home: NextPage = () => {
  return (
    <>
      <Header />
      <h1>LIFFAND</h1>
      <Footer />
    </>
  );
}

export default Home
