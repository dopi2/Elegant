import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { FiArrowRight, FiLock, FiMail, FiUser, FiCalendar } from 'react-icons/fi';
import { FaPrayingHands, FaChurch } from 'react-icons/fa';
import Lottie from 'lottie-react';
import spiritualAnimation from './Animation - 1740908498205.json';

const Register = () => {
  const formRef = useRef();

  useEffect(() => {
    gsap.from(formRef.current, {
      y: 50,
      opacity: 1,
      duration: 1,
      ease: "power3.out"
    });
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FaPrayingHands className="absolute top-1/4 left-10 text-purple-100 text-4xl opacity-20" />
        <FaChurch className="absolute bottom-1/3 right-20 text-indigo-100 text-4xl opacity-15" />
      </div>

      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 max-w-6xl">
        {/* Left side - Welcome content */}
        <div className="lg:w-1/2 max-w-lg text-center lg:text-left px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-purple-600">Sacred Journey</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
            Begin your spiritual journey with us. Register to access sacred resources, prayer groups, and a community of faith.
          </p>
          
          <div className="hidden lg:block w-full max-w-md mx-auto">
            <Lottie 
              animationData={spiritualAnimation} 
              loop={true} 
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Right side - Form */}
        <div className="lg:w-1/2 max-w-md w-full bg-white rounded-2xl p-8 relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-600">Continue your sacred journey</p>
          </div>
          
          <form ref={formRef} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiCalendar className="text-gray-400" />
              </div>
              <input
                type="date"
                placeholder="Date of Birth"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-400" />
              </div>
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-400" />
              </div>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the <a href="#" className="text-purple-600 hover:text-purple-500">terms and conditions</a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all flex items-center justify-center shadow-lg hover:shadow-xl"
            >
              Create Account
              <FiArrowRight className="ml-2" />
            </button>

            <p className="mt-8 text-center text-sm text-gray-500">
              Already have an account?{' '}
              <a href="/auth/login" className="font-medium text-purple-600 hover:text-purple-500">
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;