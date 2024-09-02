import React from 'react';
import paymentService from '@/lib/solanasClient';

const page = async () => {

    const response = await paymentService.fetchPayments();
    console.log('All Payments:', response);

  return (
    <div>page</div>
  )
}

export default page