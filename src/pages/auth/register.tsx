import AOS from 'aos';
import { addDoc, collection, doc } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import 'aos/dist/aos.css';

import db from '@/lib/firebase';

import BgImg from '~/images/auth/registerBackground.png';
import Logo from '~/Logo.png';

interface SignupType {
  name: string;
  phone_number: string;
  email: string;
  password: string;
  password_confirm: string;
}

const Register = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const router = useRouter();

  const methods = useForm<SignupType>({ mode: 'onBlur' });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: SignupType) => {
    try {
      const { name, email, phone_number, password } = data;
      // await signUp(data.email, data.password);

      const userRef = await addDoc(collection(db, `users`), {
        name,
        phone_number,
      });

      await addDoc(collection(db, `account`), {
        detail: doc(db, `users/${userRef.id}`),
        email,
        password,
        type: 'user',
      });

      router.push('/auth/login');
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div
      className='min-h-screen py-40'
      style={{
        backgroundImage: 'linear-gradient(115deg, #20202B, #E97991)',
      }}
    >
      <div
        className='container mx-auto'
        data-aos='flip-right'
        data-aos-easing='ease-out-cubic'
        data-aos-duration='2500'
      >
        <div className='mx-auto flex w-10/12 flex-col overflow-hidden rounded-xl bg-white shadow-lg lg:w-8/12 lg:flex-row'>
          <div
            className='flex w-full flex-col items-center justify-center bg-cover bg-center bg-no-repeat p-12 lg:w-1/2'
            style={{
              backgroundImage: `url(${BgImg.src})`,
            }}
          >
            <h1 className='mb-3 text-3xl text-white'>Welcome</h1>
            <div>
              <p className='text-white'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                suspendisse aliquam varius rutrum purus maecenas ac{' '}
                <a href='#' className='font-semibold text-pink-400'>
                  Learn more
                </a>
              </p>
            </div>
          </div>
          <div className='w-full py-16 px-12 lg:w-1/2'>
            <Link href='/'>
              <Image src={Logo} alt='Logo' width={128} />
            </Link>
            <p className='mb-4'>
              Create your account. It’s free and only take a minute
            </p>
            <FormProvider {...methods}>
              <form action='#' onSubmit={handleSubmit(onSubmit)}>
                <div className='mt-5'>
                  <input
                    type='text'
                    placeholder='Name'
                    {...register('name')}
                    className='w-full border border-gray-400 py-1 px-2'
                  />
                </div>
                <div className='mt-5'>
                  <input
                    type='text'
                    placeholder='Phone Number'
                    {...register('phone_number')}
                    className='w-full border border-gray-400 py-1 px-2'
                  />
                </div>
                <div className='mt-5'>
                  <input
                    type='email'
                    {...register('email', { required: 'Email is required' })}
                    placeholder='Email'
                    className='w-full border border-gray-400 py-1 px-2'
                  />
                  {errors.email && (
                    <p className='text-red-400'>{errors.email.message}</p>
                  )}
                </div>
                <div className='mt-5'>
                  <input
                    type='password'
                    {...register('password', {
                      required: 'Password is required',
                    })}
                    placeholder='Password'
                    className='w-full border border-gray-400 py-1 px-2'
                  />
                  {errors.password && (
                    <p className='text-red-400'>{errors.password.message}</p>
                  )}
                </div>
                <div className='mt-5'>
                  <input
                    type='checkbox'
                    className='mr-5 border border-gray-400'
                  />
                  <span>
                    I accept the{' '}
                    <a href='#' className='font-semibold text-pink-400'>
                      Terms of Use
                    </a>{' '}
                    &{' '}
                    <a href='#' className='font-semibold text-pink-400'>
                      Privacy Policy
                    </a>
                  </span>
                </div>
                <div className='mt-5'>
                  <button
                    type='submit'
                    className='w-full rounded-xl bg-pink-400 py-3 text-center font-semibold text-white shadow-lg transition duration-500 hover:scale-110 hover:shadow-2xl'
                  >
                    Register Now
                  </button>
                </div>
                <p className='mt-2 mb-0 pt-1 text-sm font-semibold'>
                  Already have an account?
                  <Link
                    href='/auth/login'
                    className='text-red-600 transition duration-200 ease-in-out hover:text-red-700 focus:text-red-700'
                  >
                    {' '}
                    Log in
                  </Link>
                </p>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
