import React from 'react';
// import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
// import Footer from '../Components/Footer';
import Home from '../pages/Home';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

const MainLayout = () => {
    return (
        <>
          <Navbar></Navbar>
          <Outlet>
            <Home></Home>
          </Outlet>
          <Footer></Footer>  
        </>
    );
};

export default MainLayout;