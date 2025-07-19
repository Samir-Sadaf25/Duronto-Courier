import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../How It Works/HowItWorks';

const Home = () => {
    return (
        <div>
            <section className='w-11/12 mx-auto mt-[60px]'>
                <Banner></Banner>
            </section>
            <section className=''>
                <HowItWorks></HowItWorks>
            </section>
        </div>
    );
};

export default Home;