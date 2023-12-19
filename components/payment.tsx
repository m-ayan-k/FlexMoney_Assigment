'use client'

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation';

type IFormInput  = {
  cardnumber:number
  expiryDate:string
  cvv:string
}

const PaymentForm: React.FC<{ id: any }> = ({ id }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Inputs>({
    defaultValues: {
      cardnumber: '',
      expiryDate:'',
      cvv:''
    }
  })

  const router = useRouter();

  const processForm: SubmitHandler<IFormInput > = async(formdata) =>{
    // console.log(formdata);
    try{
      const data = await fetch('/api/payment', {
        method: 'POST',
        body: JSON.stringify({amount: 500, usersId:id}),
      });

      if (!data.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await data.json();
      console.log(result);

      alert("Payment Successfull");
    }
    catch(error){
      console.error(error);
    }

    reset();
    setTimeout(() => {
        router.push('/');
      }, 3500);
  }

  return (
    <form onSubmit={handleSubmit(processForm)} className="max-w-sm mx-auto p-4 bg-white shadow-md rounded">
      <div className="payment-amount">Amount: Rs 500</div>  
      <div className="mb-4">
        <label htmlFor="cardNumber" className="block text-gray-700 text-sm font-bold mb-2">
          Card Number:
        </label>
        <input
          type="text"
          id="cardnumber"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register('cardnumber',{ required: 'Card number is required' })}
        />
        {errors.cardNumber && <p className="text-red-500 text-xs italic">{errors.cardNumber.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="expiryDate" className="block text-gray-700 text-sm font-bold mb-2">
          Expiry Date:
        </label>
        <input
          type="text"
          id="expirydate"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register('expirydate',{ required: 'Expiry date is required' })}
        />
        {errors.expiryDate && <p className="text-red-500 text-xs italic">{errors.expiryDate.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="cvv" className="block text-gray-700 text-sm font-bold mb-2">
          CVV:
        </label>
        <input
          type="text"
          id="cvv"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register('cvv',{ required: 'CVV is required' })}
        />
        {errors.cvv && <p className="text-red-500 text-xs italic">{errors.cvv.message}</p>}
      </div>

      <button
        type="submit"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit Payment
      </button>
    </form>
  );
};

export default PaymentForm;