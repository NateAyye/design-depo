import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import colorPicker from '../assets/images/color-picker.png';
import gradientPicker from '../assets/images/gradient-picker.png';
import palettePicker from '../assets/images/palette-picker.png';
import { Button } from '../components/ui/button';
import images from './images/giphy.gif';
export default function Home() {
  return (
    <div className="bg-background flex-1 flex ">
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
        <div className="flex justify-between container relative">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-muted-foreground ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                Start designing your vision today with Design Depo{' '}
                {/*<a href="#" className="font-semibold text-indigo-600">
                <span className="absolute inset-0" aria-hidden="true" />
                Sign Up Here <span aria-hidden="true">&rarr;</span>
          </a>*/}
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                Generate custom color stories at the click of button
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Our app offers an extensive repository of hex codes, ensuring
                that you'll never run out of unique colors and gradients to
                elevate your projects. With our user-friendly interface, you can
                organize your creative assets by saving individual hex codes,
                gradients, and fonts to your personal library. What's more, you
                can create themed collections of complementary colors,
                gradients, and fonts, streamlining your workflow for specific
                projects. Say goodbye to costly subscriptions and payloads our
                app is free and here to empower your creativity without
                limitations.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <div className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  <Button variant="primary" asChild>
                    <Link to="/auth?tab=login">Login</Link>
                  </Button>
                </div>
                <div className="text-sm font-semibold leading-6 text-foreground">
                  <Button variant="primary" asChild>
                    <Link to="/auth?tab=sign-up">Sign Up</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <img
            src={images}
            alt="gif of color wheel"
            className="h-[280px] w-[280px] object-cover absolute -top-16 right-1/2 translate-x-1/2 "
          />
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
        <GridDisplay>
          <div className="flex flex-col items-center justify-center p-5 sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
              Color Picker
            </h2>
            <p className="mt-4 text-lg leading-6 text-muted-foreground">
              Our color picker allows you to generate hex codes for any color
              you can imagine. You can also save your favorite colors to your
              personal library for easy access.
            </p>
            <div className="mt-6">
              <Button asChild>
                <Link to="/color-picker">Go To Color Picker &rarr;</Link>
              </Button>
              <Button variant="link" asChild>
                <Link to="/dashboard">Go To Dashboard &rarr;</Link>
              </Button>
            </div>
          </div>
          <div className=" p-8">
            <img
              src={colorPicker}
              alt="color picker example"
              className="bg-white rounded-md overflow-hidden shadow-lg"
            />
          </div>
        </GridDisplay>
        <GridDisplay>
          <div className=" p-8">
            <img
              src={gradientPicker}
              alt="gradient picker example"
              className="bg-white rounded-md overflow-hidden shadow-lg"
            />
          </div>
          <div className="flex flex-col items-center justify-center p-5 sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
              Gradient Generator
            </h2>
            <p className="mt-4 text-lg leading-6 text-muted-foreground">
              Our gradient picker allows you to generate hex codes for any
              gradient you can imagine. You can also save your favorite
              gradients to your personal library for easy access.
            </p>
            <div className="mt-6">
              <Button asChild>
                <Link to="/gradient-generator">
                  Go To Gradient Picker &rarr;
                </Link>
              </Button>
              <Button variant="link" asChild>
                <Link to="/dashboard">Go To Dashboard &rarr;</Link>
              </Button>
            </div>
          </div>
        </GridDisplay>
        <GridDisplay>
          <div className="flex flex-col items-center justify-center p-5 sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
              Palette Picker
            </h2>
            <p className="mt-4 text-lg leading-6 text-muted-foreground">
              Our palette picker allows you to generate hex codes for any
              palette you can imagine. You can also save your favorite palettes
              to your personal library for easy access.
            </p>
            <div className="mt-6">
              <Button asChild>
                <Link to="/palette-generator">Go To Palette Picker &rarr;</Link>
              </Button>
              <Button variant="link" asChild>
                <Link to="/dashboard">Go To Dashboard &rarr;</Link>
              </Button>
            </div>
          </div>
          <div className=" p-8">
            <img
              src={palettePicker}
              alt="palette picker example"
              className="bg-white rounded-md overflow-hidden shadow-lg"
            />
          </div>
        </GridDisplay>
      </div>
    </div>
  );
}

const GridDisplay = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  place-content: center;

  @media (max-width: 768px) {
    padding: 1rem;
    grid-template-columns: repeat(1, 1fr);
  }
`;
