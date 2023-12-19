'use client'

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation';
enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}

enum GenderEnum {
  "6-7AM" = "6-7 AM",
  "7-8AM" = "7-8 AM",
  "8-9AM" = "8-9 AM",
  "5-6PM" = "5-6 PM",
}

type IFormInput  = {
  name: string
  email: string
  gender: GenderEnum
  age: number
  timing: TimingEnum
}

export default function Form() {
  const router = useRouter();
  const [formData, setformData] = useState<Inputs>()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Inputs>({
    defaultValues: {
      name: '',
      email: '',
      gender:'',
      age:'',
      timing:''
    }
  })

  //   console.log(watch('email'))
  //   console.log('rendering')
  const ageOptions = Array.from({ length: 100 }, (_, index) => index + 1);
  const processForm: SubmitHandler<IFormInput > = async (formdata) => {

    // console.log(formdata);
    try{
      const data = await fetch('/api/form', {
        method: 'POST',
        body: JSON.stringify(formdata)
      })

      if (!data.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await data.json();
      console.log(result);
      const id=result.data.id;
      router.push(`/payment?id=${id}`);
    }
    catch(error){
      console.error(error);
    }

    
    reset();
  }

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form onSubmit={handleSubmit(processForm)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
            <input
              type="text"
              id="name"
              {...register('name', { required: 'Name is required' })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
            <input
              type="email"
              id="email"
              {...register('email', { required: 'Email is required' })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="age" className="block text-gray-700 text-sm font-bold mb-2">Age:</label>
            <input
              type="number"
              id="age"
              {...register('age', { required: 'Age is required',min:{value: 18, message: 'Minimum age is 18' },max: { value: 65, message: 'Maximum age is 65' }})}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.age && <p className="text-red-500 text-xs italic">{errors.age.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="gender" className="block text-gray-700 text-sm font-bold mb-2">Gender:</label>
            <select
              id="gender"
              {...register('gender', { required: 'Gender is required' })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-xs italic">{errors.gender.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="timing" className="block text-gray-700 text-sm font-bold mb-2">Timing:</label>
            <select
              id="timing"
              {...register('timing', { required: 'timing is required' })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="6-7AM">6-7 AM</option>
              <option value="7-8AM">7-8 AM</option>
              <option value="8-9AM">8-9 AM</option>
              <option value="5-6PM">5-6 PM</option>
            </select>
            {errors.timing && <p className="text-red-500 text-xs italic">{errors.timing.message}</p>}
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      </div>
    </div>

  )
}