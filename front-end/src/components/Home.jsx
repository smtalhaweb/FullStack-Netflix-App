import React from "react";
import { Link } from "react-router-dom";
import { FaDownload } from "react-icons/fa";
import Faqs from './Faqs';
import Footer from './Footer';
import Header from "./Header";

const Home = () => {

  return (
    <div className="min-h-[500vh]">
      <Header />
      <div className="w-full absolute inset-0 flex flex-col justify-center items-center -mt-10">
        <h1 className="text-white font-extrabold text-[3.5vh] md:text-[5.5vh] xl:text-[8vh]">
          Unlimited movies, TV shows, and more
        </h1>
        <p className="text-white text-[2.5vh] md:text-[3.5vh] xl:text-[4.5vh] font-extralight tracking-tighter">
          Watch anywhere. Cancel anytime.
        </p>
      </div>
      <div className="text-center mt-10">
        <Link
          to={"/register"}
          className="text-white text-center cursor-pointer hover:text-red-800 transition-all duration-500 text-[3vh] md:text-[5vh]"
        >
          Don't have an account? Please sign up and get started watching movies
        </Link>
      </div>
      <div className="w-full flex flex-col xl:flex-row justify-center items-center p-20 mt-20">
        <div className="text-center">
          <h1 className="text-white font-extrabold text-[4vh] md:text-[6vh]">
            Enjoy on your TV
          </h1>
          <p className="text-white font-extralight text-[3vh] md:text-[5vh] mt-5 tracking-tighter">
            Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray
            players, and more.
          </p>
        </div>
        <div className="relative">
          <img
            className="absolute w-full"
            src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png"
            alt=""
          />
          <video
            autoPlay
            loop
            muted
            playsInline
            className=""
            src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v"
          ></video>
        </div>
      </div>
      <div className="w-full flex flex-col xl:flex-row justify-center items-center p-20 mt-20">
        <div className="text-center xl:mt-16">
          <h1 className="text-white font-extrabold text-[4vh] md:text-[6vh]">
            Download your shows to watch offline
          </h1>
          <p className="text-white font-extralight text-[3vh] md:text-[5vh] mt-5 tracking-tighter">
            Save your favorites easily and always have something to watch.
          </p>
        </div>
        <div className="relative">
          <img
            className="w-full h-full"
            src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg"
            alt=""
          />
          <div className="border-slate-500 rounded-xl border w-full absolute flex items-center gap-5 p-2 justify-between">
            <img
              className="w-15 h-10"
              src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/boxshot.png"
              alt=""
            />
            <div className="flex flex-col">
              <p className="text-sm text-white tracking-tighter">
                Stranger Things
              </p>
              <p className="text-sm text-red-800 tracking-tighter">
                Downloading...
              </p>
            </div>
            <FaDownload className="w-5 h-5 animate-pulse text-red-800" />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col xl:flex-row justify-center items-center p-20 mt-20">
        <div className="w-full md:w-1/2">
          <img
            src="https://occ-0-4163-58.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABejKYujIIDQciqmGJJ8BtXkYKKTi5jiqexltvN1YmvXYIfX8B9CYwooUSIzOKneblRFthZAFsYLMgKMyNfeHwk16DmEkpIIcb6A3.png?r=f55"
            alt=""
          />
        </div>
        <div className="w-full xl:w-1/2 mt-10 text-center">
          <h1 className="text-white font-extrabold text-[4vh] md:text-[6vh]">
            Create profiles for kids
          </h1>
          <p className="text-white font-extralight text-[3vh] md:text-[5vh] mt-5 tracking-tighter">
            Send kids on adventures with their favorite characters in a space
            made just for them—free with your membership.
          </p>
        </div>
      </div>
      <Faqs />
      <Footer />
    </div>
  );
};

export default Home;
