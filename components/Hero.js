import React from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, planetVariants } from "../utils/motion";

export default function Hero() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      exit="hidden"
      transition={{ staggerChildren: 0.1 }}
      className="mt-14 md:mt-24"
    >
      <div className="flex flex-col justify-center items-center md:flex-row grid-col-1 md:grid-cols-2 mx-5 md:mx-16   ">
        {/* Blocks only small screen */}
        <motion.div
          variants={planetVariants("right")}
          className="sm:block md:hidden flex justify-center items-center w-full h-full "
        >
          <img
            height={100}
            width={100}
            className="w-64  md:w-full md:h-full"
            src="/hero.png"
          />
        </motion.div>
        {/* Every screen */}
        <motion.div
          variants={fadeIn("up", "tween", 0.2, 1)}
          className="flex flex-col justify-center  w-full h-full p-2 md:p-5 pt-5 md:pt-28 pr-20"
        >
          <h1 className="text-4xl md:text-6xl mb-3 ">
            Electronic<span className="text-yellow-300"> Repair</span>
          </h1>
          <h4>
            Experience seamless electronic repair services. Our expert
            technicians ensure swift, reliable solutions, restoring your devices
            to optimal performance. Trust us with your repairs today.
          </h4>
          <h1 className="bg-yellow-300 px-2 py-2 flex justify-center items-center w-32 mt-10">
            Book Now
          </h1>
        </motion.div>
        {/* Blocks on medium and large screen */}
        <motion.div
          variants={planetVariants("right")}
          className="hidden md:flex justify-center items-center w-full h-full "
        >
          <img className="w-96" src="/hero.png" />
        </motion.div>
      </div>
      {/* Wave image  */}
      <motion.div variants={fadeIn("up", "tween", 0.2, 1)}>
        <img src="/wave.svg" />
      </motion.div>
    </motion.div>
  );
}
