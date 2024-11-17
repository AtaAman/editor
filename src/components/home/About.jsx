import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedCards from "./AboutCards";

function AboutSection() {
  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: true, amount: 0.5 });

  return (
    <div id="about">
      <section className="flex flex-col lg:flex-row items-center justify-center lg:justify-between py-16 px-6 lg:px-24 bg-white">
        <div className="relative mb-10 lg:mb-0">
          <motion.div
            className="w-[220px] h-[280px] lg:w-[290px] lg:h-[400px] rounded-2xl shadow-2xl shadow-primary/40 overflow-hidden"
            initial={{ x: -70, opacity: 0.8 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <img
              src="/about1.jpg"
              alt="Solar Panels"
              className="object-cover w-full h-full"
            />
          </motion.div>

          <motion.div
            className="absolute bottom-[-60px] border-4 border-gray-200 left-20 md:left-40 shadow-2xl shadow-primary/40 w-[200px] h-[160px] lg:w-[280px] lg:h-[220px] rounded-2xl overflow-hidden shadow-lg"
            initial={{ y: 40, x: 0, opacity: 0.8 }}
            animate={{ y: -40, x: -40, opacity: 1 }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <img
              src="/about2.jpg"
              alt="Solar Installation"
              className="object-cover w-full h-full"
            />
          </motion.div>
        </div>

        <motion.div
          className="max-w-lg text-center lg:text-left mt-20 md:mt-16 lg:mt-0"
          ref={textRef}
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <h3 className="text-base sm:text-lg font-semibold text-secondary my-4">
            Why Choose Lead2Solar
          </h3>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            About Lead2Solar
          </h2>
          <p className="text-gray-700 mb-6 text-sm sm:text-base">
            At Lead2Solar, we connect homeowners and businesses with trusted
            local solar installers, making solar energy accessible and
            affordable. Our focus is on high-quality service, competitive rates,
            and sustainability.
          </p>
        </motion.div>
      </section>

      <AnimatedCards />
    </div>
  );
}

export default AboutSection;
