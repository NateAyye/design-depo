import React from 'react';

import { Button } from '../components/ui/button';
import { Link } from "react-router-dom";
import images from './images/giphy.gif';



export default function Home() {
  

  return (
    <div className="bg-white flex">
     

      <div className="relative isolate px-6 pt-14 lg:px-8 ">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="flex justify-between max-w-7xl mx-auto relative">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Start designing your vision today with Design Depo{' '}
              {/*<a href="#" className="font-semibold text-indigo-600">
                <span className="absolute inset-0" aria-hidden="true" />
                Sign Up Here <span aria-hidden="true">&rarr;</span>
          </a>*/}
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Generate custom color stories at the click of button
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
            Our app offers an extensive repository of hex codes, ensuring that you'll never 
        run out of unique colors and gradients to elevate your projects. With our user-friendly 
        interface, you can organize your creative assets by saving individual hex codes, 
        gradients, and fonts to your personal library. What's more, you can create themed
        collections of complementary colors, gradients, and fonts, streamlining your workflow for 
        specific projects. Say goodbye to costly subscriptions and payloads 
        our app is free and here to empower your creativity without limitations. 
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <Button variant="primary" asChild>
                    <Link to='/auth'>Login</Link>
                </Button>
                
              </a>
              <a className="text-sm font-semibold leading-6 text-gray-900">
              <Button variant="primary" asChild>
                    <Link to='/auth'>Sign Up</Link>
                </Button>
              </a>
            </div>
          </div>
        </div>
        

          
         
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="h-screen w-1/2 bg-transparent"></div>

      </div>
      <div className="hidden lg:block bg-transparent w-1/2 h-screen">
          <div className="h-screen w-1/2 right-0 bg-transparent"></div>
            <img
              src={images}
              alt="gif of color wheel"
              className="h-480 w-480 object-cover absolute top-12 right-0 bg-transparent"
            />

           

          </div> 
      
    </div>
  )
};


