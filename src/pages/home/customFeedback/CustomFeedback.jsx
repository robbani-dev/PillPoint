"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const feedbacks = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Web Developer",
    feedback:
      "The project exceeded my expectations. The attention to detail and smooth UX made a huge difference.",
  },
  {
    id: 2,
    name: "Michael Lee",
    role: "UI/UX Designer",
    feedback:
      "I loved the design consistency and responsiveness across all devices. Great job!",
  },
  {
    id: 3,
    name: "Amina Khan",
    role: "Software Engineer",
    feedback:
      "Code quality and structure were excellent. Everything was easy to follow and maintain.",
  },
  {
    id: 4,
    name: "David Parker",
    role: "Project Manager",
    feedback:
      "Timely delivery and great communication throughout the project lifecycle. Highly recommended!",
  },
  {
    id: 5,
    name: "Liam Brown",
    role: "Entrepreneur",
    feedback:
      "They truly understood our business needs and delivered a product that matched our vision perfectly.",
  },
  {
    id: 6,
    name: "Sophia Martinez",
    role: "Digital Marketer",
    feedback:
      "User engagement improved significantly after implementing their design. Great results!",
  },
  {
    id: 7,
    name: "James Wilson",
    role: "Backend Developer",
    feedback:
      "Clean API integration and well-documented endpoints. Development was smooth and efficient.",
  },
  {
    id: 8,
    name: "Olivia Davis",
    role: "Content Creator",
    feedback:
      "Beautiful design and great usability. It’s clear the developer put a lot of thought into this.",
  },
  {
    id: 9,
    name: "Ethan Anderson",
    role: "Product Owner",
    feedback:
      "The team went above and beyond to make sure everything was just right. Fantastic experience!",
  },
  {
    id: 10,
    name: "Isabella White",
    role: "Data Analyst",
    feedback:
      "The performance optimization was impressive — everything loads fast and runs smoothly.",
  },
];

const CustomFeedback = () => {
  return (
    <section className="bg-base-200 py-8 rounded-2xl">
      <div className="container flex flex-col gap-4">
        <h2 className="title-section">Customer Feedback</h2>
        <div>
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            modules={[Pagination, Autoplay]}
            className="max-w-6xl mx-auto"
          >
            {feedbacks.map(({ id, name, role, feedback }) => (
              <SwiperSlide key={id}>
                <div className="bg-white shadow-md rounded-2xl p-6 my-10 hover:shadow-lg transition min-h-[200px]">
                  <p className="text-gray-700 italic mb-4">"{feedback}"</p>
                  <h3 className="font-semibold text-lg">{name}</h3>
                  <p className="text-sm text-gray-500">{role}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default CustomFeedback;
