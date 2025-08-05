import { Elements } from '@stripe/react-stripe-js';
import React from 'react';

import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
const Payment = () => {
    return (
       <Elements stripe={stripePromise}>
         <CheckoutForm></CheckoutForm>
       </Elements>
    );
};

export default Payment;