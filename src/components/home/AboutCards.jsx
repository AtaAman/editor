/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AnimatedCards = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const cardData = [
    {
      id: 1,
      image: "/lead.jpg",
      heading: "Lead Management",
      title:
        "Effortlessly track and manage leads from initial contact to closing deals with precision.",
    },
    {
      id: 2,
      image: "/project.jpg",
      heading: "Project Management",
      title:
        "Unlock seamless solar project execution with Lead2Solar's all-in-one management tool.",
    },
    {
      id: 3,
      image: "/task.jpg",
      heading: "Task Management",
      title:
        "Stay ahead! Daily reminders ensure you never miss a critical task or deadline.",
    },
    {
      id: 4,
      image: "/proposal.jpg",
      heading: "Proposal Management",
      title:
        "Create stunning, customized solar proposals in minutes, wherever you are.",
    },
  ];

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 1,
        type: "spring",
      },
    }),
  };

  return (
    <div className="container my-8 md:my-20 mx-auto">
      <div
        ref={ref}
        className="flex flex-col lg:flex-row gap-4 justify-center items-center lg:space-x-8"
      >
        {cardData.map((card, index) => (
          <motion.div
            key={card.id}
            custom={index}
            initial="hidden"
            animate={controls}
            variants={cardVariants}
            className="flex flex-col items-center w-[320px] h-auto p-4 m-4 bg-white shadow-xl shadow-primary/40 rounded-lg"
          >
            <div className="w-full">
              <img
                src={card.image}
                alt={card.heading}
                width={300}
                height={160}
                className="object-cover rounded-t-lg"
              />
            </div>

            <div className="mt-4">
              <h2 className="text-xl font-semibold">{card.heading}</h2>
            </div>

            <div className="mt-2 text-center">
              <p className="text-gray-600">{card.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedCards;
