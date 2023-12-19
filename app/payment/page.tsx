'use client'

import Image from 'next/image'
import PaymentForm from '@/components/payment'
import { useEffect } from 'react';
import { useRouter , useSearchParams} from 'next/navigation';


export default function Home() {

  const searchParams = useSearchParams()
  const search = searchParams.get('id')
  const router = useRouter();

  // console.log(search);

  return (
    <div 
      className="
        flex  
        flex-col 
        justify-center 
        py-12 
        sm:px-6 
        lg:px-8 
        bg-gray-100
        h-full
      "
    >
    {/*<a href="https://www.flaticon.com/free-icons/dating-app-android" title="dating app android icons">Dating app android icons created by Creartive - Flaticon</a>*/}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 
          className="
            mt-6 
            text-center 
            text-3xl 
            font-bold 
            tracking-tight 
            text-gray-900
          "
          >
            Payment
        </h2>
      </div>
      <PaymentForm id={search} />      
  </div>
  )
}
