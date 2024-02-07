import React, { useState } from 'react';
import apiService from '../services/apiService';
import { useNavigate } from 'react-router-dom';

const RazorpayPaymentComponent = () => {
  const navigate = useNavigate();
  const [orderStatus, setOrderStatus] = useState('');

  const handleBuyButtonClick = async (e) => {
    e.preventDefault();
    try {
      const order = await apiService.post('/createOrder');
      console.log('Order Response:', order);
      const parsedOrder = order.data;

      const options = {
        key: 'rzp_test_vx3Eg3PqiTEmHO',
        amount: parsedOrder.amount_due.toString(),
        currency: 'INR',
        name: 'TuneHub',
        description: 'Test Transaction',
        order_id: parsedOrder.id,
        handler: function (response) {
          verifyPayment(response.razorpay_order_id, response.razorpay_payment_id, response.razorpay_signature);
        },
        prefill: {
          name: 'Your Name',
          email: 'test@example.com',
          contact: '9999999999',
        },
        notes: {
          address: 'Your Address',
        },
        theme: {
          color: '#333333',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const verifyPayment = async (orderId, paymentId, signature) => {
    try {
      const requestData = { params: { orderId, paymentId, signature } };
      console.log('Request Data:', requestData);
      alert(JSON.stringify(requestData));
      const isValid = await apiService.post('/verify', { orderId, paymentId, signature } );

      if (isValid.data) {
        setOrderStatus('success');
        const email = sessionStorage.getItem('email')
        const res = apiService.get('/payment-success',{params: {email}})
        if(res.data === 'success'){
          navigate('/login');
        }

      } else {
        
        navigate('/pay');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  (orderStatus === 'success') ? alert("payment success") : "";

  return (
    <div>
      <h1>Why premium?</h1>
      <p>text...................</p>

      <form id="payment-form">
        <button type="submit" className="buy-button" onClick={handleBuyButtonClick}>
          BUY
        </button>
      </form>

      {orderStatus && (
        <div>
          {orderStatus === 'success' ? (
            <p>Payment successful</p>
          ) : (
            <p>Payment failed</p>
          )}
        </div>
      )}
    </div>
  );
};

export default RazorpayPaymentComponent;
