import Image from 'next/image'
import Form from '@/components/form'
import PaymentForm from '@/components/payment'

export default function Home() {
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
            Yoga Admission Form
        </h2>
      </div>
      <Form/>      
  </div>
  )
}
