import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../How It Works/HowItWorks';
import OurServices from '../Our Services/OurServices';

const Home = () => {
    return (
        <div>
            <section className='w-11/12 mx-auto mt-[60px]'>
                <Banner></Banner>
            </section>
            <section className=''>
                <HowItWorks></HowItWorks>
            </section>
            <section className='w-11/12 mx-auto mb-[100px]'>
                <OurServices></OurServices>
            </section>
        </div>
    );
};

export default Home;