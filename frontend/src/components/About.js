// src/components/About.js

import React from "react";
import { motion } from "framer-motion";
import RazProfile from "../assets/RazProfile.JPG"; // Import Raz's Profile
import NivProfile from "../assets/NivProfile.jpeg"; // Import Niv's Profile

const About = () => {
  return (
    <div className="min-h-screen text-gray-900 dark:text-white flex flex-col justify-center items-center p-6">
      {/* Title Animation */}
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Meet the Creators
      </motion.h1>

      {/* Subtitle Animation */}
      <motion.p
        className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl text-center mb-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        Behind TradeSenseAI, there are two masterminds who combined brains, humor, and a pinch of chaos to create the ultimate AI stock prediction platform. Let’s get to know them!
      </motion.p>

      {/* Developers Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-4xl">
        {/* Developer 1 - Raz */}
        <motion.div
          className="bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Profile Picture */}
          <img
            src={RazProfile}
            alt="Raz Waiss"
            className="w-32 h-32 rounded-full mb-4 object-cover"
          />
          <h2 className="text-2xl font-bold mb-2">Raz Waiss</h2>
          <p className="text-gray-700 dark:text-gray-400 mb-4">
            The brains behind the operation. Known for his ability to turn coffee into code, Raz ensures every algorithm works seamlessly – except when he’s debugging (then it’s war).
          </p>
          <p className="text-blue-500 font-semibold">"When in doubt, just optimize it!"</p>
        </motion.div>

        {/* Developer 2 - Niv */}
        <motion.div
          className="bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Profile Picture */}
          <img
            src={NivProfile}
            alt="Niv Dahan"
            className="w-32 h-32 rounded-full mb-4 object-cover"
          />
          <h2 className="text-2xl font-bold mb-2">Niv Dahan</h2>
          <p className="text-gray-700 dark:text-gray-400 mb-4">
            The design wizard with a love for clean interfaces and intuitive user experiences. Niv’s secret? He’s also the team’s meme lord, keeping spirits high during deadlines.
          </p>
          <p className="text-green-500 font-semibold">"Good design is good business."</p>
        </motion.div>
      </div>

      {/* Call to Action */}
      <motion.a
        href="/"
        className="mt-12 px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-500 transition"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        Back to Home
      </motion.a>
    </div>
  );
};

export default About;