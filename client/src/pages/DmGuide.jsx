import React, { useContext } from "react";
import { Link } from "react-router-dom";

import UserContext from "../context/UserContext";

import DailyManifesExampleImage from "../assets/vvdm.png";

function DmGuide() {
  const user = useContext(UserContext);

  return (
    <div className="relative py-16 bg-white overflow-hidden">
      <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
        <div className="relative h-full text-lg max-w-prose mx-auto" aria-hidden="true">
          <svg className="absolute top-12 left-full transform translate-x-32" width="404" height="384" fill="none" viewBox="0 0 404 384">
            <defs>
              <pattern id="74b3fd99-0a6f-4271-bef2-e80eeafdf357" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="384" fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)" />
          </svg>
          <svg className="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32" width="404" height="384" fill="none" viewBox="0 0 404 384">
            <defs>
              <pattern id="f210dbf6-a58d-4871-961e-36d5016a0f49" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="384" fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
          </svg>
          <svg className="absolute bottom-12 left-full transform translate-x-32" width="404" height="384" fill="none" viewBox="0 0 404 384">
            <defs>
              <pattern id="d3eb07ae-5182-43e6-857d-35c643af9034" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="384" fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)" />
          </svg>
        </div>
      </div>

      {!user && (
        <div className="absolute top-6 px-6 lg:px-48">
          <Link to="/">
            <p className="text-3xl"><span className="font-black">Daily</span><span className="font-thin text-blue-800">Manifest</span></p>
          </Link>
        </div>
      )}

      <div className={`relative px-4 sm:px-6 lg:px-8 ${!user && "pt-16" }`}>
        <div className="text-lg max-w-prose mx-auto">
          <h1>
            <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">Introducing</span>
            <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">How to use DailyManifest</span>
          </h1>
          <img src={DailyManifesExampleImage} alt="daily-manifest-page" className="py-8" />
          <div className="text-xl text-gray-500 leading-8">
            <h2>SCHEDULE</h2>
            <p>
              For optimal results, complete your shcedule the day bofore.
              Avoid screens for as many hours as possible after waking up.
            </p>
          </div>
          <div className="text-xl text-gray-500 leading-8">
            <h2>GOALS</h2>
            <p>Goals for our time, happiness, and finances.</p>
            <br/><br/>
            <p>
              Each day articulate your 90 days goals,
              how you'll measure them in 30 days,
              and what you'll be working on today to get there.
              Reinforcing long term objectives on a daily
              basis helps us make conscious adjustment.
            </p>
          </div>
          <div className="text-xl text-gray-500 leading-8">
            <h2>HABITS</h2>
            <p>
              Making progress with our habits is as much
              about reducing harmful behavior as it is
              increasing beneficial behavior.
            </p>
            <br/><br/>
            <p>
              Recognize the daily progress you’re making by
              writing three good habits you’re maintaining,
              and three bad habits you’ve resisted. Well
              done, in advance.
            </p>
          </div>
          <div className="text-xl text-gray-500 leading-8">
            <h2>REFLECTIONS</h2>
            <p>
              Reflecting on why we’re managing ourselves
              and what we’re learning is an important part
              of this process.
            </p>
            <br/><br/>
            <p>
              Complete this at the end of each day to
              record where things went well, and where
              there’s room for improvement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DmGuide;