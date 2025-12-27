import React from "react";
import {
  FaShieldAlt,
  FaTruck,
  FaUserMd,
  FaCapsules,
  FaCheckCircle,
  FaLock,
  FaLaptopCode,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-base-100 ">

      {/* HERO */}
      <section className="bg-secondary text-secondary-content py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About PillPoint
          </h1>
          <p className="max-w-3xl mx-auto text-lg opacity-90">
            PillPoint is a digital pharmacy platform designed to make medicine
            access simple, secure, and reliable for everyone.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className=" container mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold mb-4">
          Who We Are
        </h2>
        <p className="text-base-content/80 max-w-4xl leading-relaxed">
          PillPoint is an online medicine selling web application where users
          can search, order, and manage medicines from the comfort of their
          homes. Our platform focuses on trust, transparency, and technology-driven
          healthcare solutions.
        </p>
      </section>

      {/* MISSION / VISION */}
      <section className=" bg-base-200 py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div className="bg-base-100 p-8 rounded-2xl shadow">
            <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
            <p className="text-base-content/80">
              To provide fast, affordable, and secure access to essential
              medicines using modern web technologies.
            </p>
          </div>

          <div className="bg-base-100 p-8 rounded-2xl shadow">
            <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
            <p className="text-base-content/80">
              To become a trusted digital healthcare platform that connects
              people with reliable medicine solutions worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className=" container mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold mb-10 text-center">
          Our Core Values
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-base-200 rounded-2xl text-center">
            <FaShieldAlt className="text-4xl text-primary mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">Trust</h4>
            <p className="text-base-content/80">
              We ensure authenticity and reliability in every medicine we offer.
            </p>
          </div>

          <div className="p-6 bg-base-200 rounded-2xl text-center">
            <FaCheckCircle className="text-4xl text-primary mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">Quality</h4>
            <p className="text-base-content/80">
              High standards in service, security, and user experience.
            </p>
          </div>

          <div className="p-6 bg-base-200 rounded-2xl text-center">
            <FaUserMd className="text-4xl text-primary mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">Care</h4>
            <p className="text-base-content/80">
              Healthcare-focused design built around user needs.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className=" bg-base-200 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-10 text-center">
            What We Offer
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-base-100 p-6 rounded-2xl text-center shadow">
              <FaCapsules className="text-3xl text-primary mx-auto mb-3" />
              <p>Online medicine catalog</p>
            </div>
            <div className="bg-base-100 p-6 rounded-2xl text-center shadow">
              <FaTruck className="text-3xl text-primary mx-auto mb-3" />
              <p>Order & delivery tracking</p>
            </div>
            <div className="bg-base-100 p-6 rounded-2xl text-center shadow">
              <FaLock className="text-3xl text-primary mx-auto mb-3" />
              <p>Secure user authentication</p>
            </div>
            <div className="bg-base-100 p-6 rounded-2xl text-center shadow">
              <FaUserMd className="text-3xl text-primary mx-auto mb-3" />
              <p>User-focused healthcare UX</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className=" container mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold mb-10 text-center">
          How PillPoint Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-base-200 rounded-2xl">
            <h4 className="font-semibold mb-2">1. Browse Medicines</h4>
            <p className="text-base-content/80">
              Explore medicines with clear details and pricing.
            </p>
          </div>
          <div className="p-6 bg-base-200 rounded-2xl">
            <h4 className="font-semibold mb-2">2. Place Order</h4>
            <p className="text-base-content/80">
              Add medicines to cart and securely checkout.
            </p>
          </div>
          <div className="p-6 bg-base-200 rounded-2xl">
            <h4 className="font-semibold mb-2">3. Get Delivered</h4>
            <p className="text-base-content/80">
              Receive medicines quickly at your doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section className=" bg-base-200 py-16">
        <div className="container mx-auto px-4 text-center">
          <FaLaptopCode className="text-4xl text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-semibold mb-4">
            Technology Behind PillPoint
          </h2>
          <p className="max-w-3xl mx-auto text-base-content/80">
            Built using React, React Router, Tailwind CSS, DaisyUI, and Firebase
            to ensure performance, scalability, and security.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className=" bg-secondary text-secondary-content py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Start Your Healthcare Journey with PillPoint
          </h2>
          <p className="mb-6 opacity-90">
            Experience a smarter, safer way to order medicines online.
          </p>
          <a href="/shop" className="btn btn-primary shadow">
            Explore Medicines
          </a>
        </div>
      </section>

    </div>
  );
};

export default About;
