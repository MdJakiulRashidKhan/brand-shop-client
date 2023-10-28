import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Banner from '../../components/Banner/Banner';
import BrandName from '../../components/BrandName/BrandName';
import Stat from '../../components/Stat/Stat';
import Steps from '../../components/Steps/Steps';

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Banner></Banner>
            <BrandName></BrandName>
            <Stat></Stat>
            <Steps></Steps>
            <Footer></Footer>
        </div>
    );
};

export default Home;