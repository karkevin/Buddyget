import React, { Fragment } from "react";

// Components
import Buttons from "../components/Buttons";
import Card from "../components/Card";
import Footer from "../components/Footer";

// assets
import favicon from "../../public/favicon.png";
import logo from "../../public/logo.png";
import buddyget from "../../public/buddyget.png";
import circle from "../../public/circle.png";
import triangle from "../../public/triangle.png";
import hexagon from "../../public/hexagon.png";
import rectangle from "../../public/rectangle.png";
import cards from "../../public/cards.png";
import expenses from "../../public/expenses.png";

export default function Welcome() {
  return (
    <Fragment>
      {/* landing page */}
      <div id="landing" className="h-screen">
        <img
          src={circle}
          alt=""
          className="-z-1 absolute right-0 hidden h-screen md:block"
        />
        <div
          id="top"
          className="flex flex-wrap justify-between items-center px-5 py-2 mb-6 sm:px-8 sm:py-5 max-w-9xl lg:mx-auto"
        >
          <div className="flex items-center">
            <img src={logo} alt="Buddyget" className="h-16 xs:hidden" />
            <img
              src={favicon}
              alt="Buddyget"
              className="hidden xs:block h-16 sm:h-20 lg:h-24"
            />
            <p className="hidden xs:inline-block font-bold text-2xl ml-2 sm:text-3xl sm:ml-6 md:text-4xl">
              Buddyget
            </p>
          </div>
          <div className="md:mr-24 md:pr-4 lg:pr-0 xl:mr-16">
            <Buttons />
          </div>
        </div>

        {/* Landing screen content */}
        <div className="md:flex justify-around mx-4 md:mt-20">
          <div className="mx-auto md:mx-0 text-center max-w-xs md:text-left lg:max-w-sm xl:max-w-md">
            <p className="text-3xl font-bold mb-5 md:text-4xl xl:text-5xl">
              Budgeting made simple
            </p>
            <p className="opacity-70 font-medium mb-10 sm:text-lg lg:text-xl xl:text-2xl">
              Roommates are the best. Except when it comes to money.
              Effortlessly manage shared expenses with Bud(dy)get.{" "}
            </p>
            <div className="hidden md:flex xl:mt-20">
              <Buttons />
            </div>
          </div>
          <div className="">
            <img
              src={buddyget}
              alt=""
              className="h-64 mx-auto mb-8 md:max-w-sm md:h-auto lg:max-w-xl xl:max-w-2xl"
            />
          </div>
        </div>
        <div className="flex justify-center md:hidden">
          <Buttons />
        </div>
      </div>

      {/* home page content */}
      <div className="sm:mt-10">
        <img src={triangle} alt="" className="-z-1 left-0 absolute" />
        <div className="flex flex-wrap justify-center max-w-sm mx-auto mb-16 md:max-w-full md:mb-64">
          <Card
            title="Simplicity is the key"
            content="Simply add, update, and delete expenses, we handle the
              rest. See real time results about split costs as you changeprices."
          />
          <Card
            title="Everything at your fingertips"
            content="We only show you the important details: split costs, expenses, 
            activity. Everything you need to manage shared expenses."
          />
          <Card
            title="Math? Not with Buddyget"
            content="You input the prices, we do the calcuations. Information about 
            split costs are automatically calculated, no math invovled."
          />
        </div>

        {/* Focus on living */}
        <div className="md:flex items-center justify-around mb-32 md:mb-40 xl:mb-56">
          {/* text */}
          <div className="max-w-xs mx-6 xs:mx-auto sm:max-w-sm mb-16 md:max-w-xs lg:max-w-md">
            <p className="font-bold text-3xl mb-8 sm:text-4xl lg:text-5xl">
              Focus on living, less on who owes who
            </p>
            <p className="opacity-70 sm:text-lg lg:text-2xl">
              Stop wasting time arguing over expenses. Split costs are calcuated
              behind the scenes, and update in real time when you manipulate
              prices.{" "}
            </p>
          </div>
          <img
            src={rectangle}
            alt=""
            className="-z-1 -mt-16 right-0 absolute max-w-sm xs:max-w-md sm:max-w-lg sm:-mt-24 md:mt-0 lg:max-w-2xl"
          />
          <img
            src={cards}
            alt=""
            className="max-w-xs mx-auto xs:max-w-sm sm:max-w-lg"
          />
        </div>

        {/* Mistakes */}
        <div className="md:flex flex-row-reverse items-center justify-around mb-48 md:mb-24 lg:mb-32">
          {/* text */}
          <div className="max-w-xs mx-6 xs:mx-auto sm:max-w-sm mb-24 md:max-w-xs lg:max-w-md">
            <p className="font-bold text-3xl mb-8 sm:text-4xl lg:text-5xl">
              Effortlessly prevent mistakes
            </p>
            <p className="opacity-70 sm:text-lg lg:text-2xl">
              Did your roommate input expenses incorrectly? Check the activity
              log and make updates to prices. Split costs will be automatically
              updated, guarenteed.{" "}
            </p>
          </div>
          <img
            src={hexagon}
            alt=""
            className="-z-1 -mt-32 left-0 absolute max-w-xs xs:max-w-sm sm:max-w-lg md:mt-0"
          />
          <img
            src={expenses}
            alt=""
            className="max-w-xs mx-auto xs:max-w-sm sm:max-w-xl md:w-auto"
          />
        </div>

        {/* Sign up */}
        <div className="mx-2 bg-gray-100 mb-32 rounded shadow-card p-4 xs:p-8 sm:mx-10 lg:p-12 lg:max-w-4xl lg:mx-auto">
          <p className="font-bold text-2xl text-center mb-8 sm:text-3xl lg:text-4xl">
            Get started with Buddyget
          </p>
          <div className="flex justify-center">
            <Buttons />
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}
