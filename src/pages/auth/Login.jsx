import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { FiArrowRight, FiLock, FiMail } from 'react-icons/fi';
import { FaPrayingHands, FaChurch } from 'react-icons/fa';
import Lottie from 'lottie-react';
import spiritualAnimation from './Animation - 1740908498205.json'; // Same Lottie file as before

const Login = () => {
  const containerRef = useRef();
  const formRef = useRef();
  const floatingIcons = useRef([]);

  useEffect(() => {
    // Floating icons animation
    floatingIcons.current.forEach((icon, index) => {
      gsap.to(icon, {
        y: index % 2 === 0 ? -15 : 15,
        rotation: index % 2 === 0 ? 5 : -5,
        duration: 4 + index,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    // Form entrance animation
    gsap.from(formRef.current, {
      y: 50,
      opacity: 1,
      duration: 1,
      ease: "power3.out"
    });

    // Background pulse animation
    gsap.to(".bg-pulse", {
      opacity: 0.2,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FaPrayingHands 
          ref={el => floatingIcons.current[0] = el}
          className="absolute top-1/4 left-10 text-purple-100 text-4xl opacity-20" 
        />
        <FaChurch 
          ref={el => floatingIcons.current[1] = el}
          className="absolute bottom-1/3 right-20 text-indigo-100 text-4xl opacity-15" 
        />
        
        {/* Pulsing background */}
        <div className="absolute top-0 left-0 w-full h-full bg-pulse">
          <div className="absolute top-1/3 left-1/4 w-48 h-48 rounded-full bg-purple-50 blur-xl bg-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full bg-blue-50 blur-xl bg-pulse" />
        </div>
      </div>

      <div className="container mx-auto px-5 flex flex-col lg:flex-row items-center justify-center gap-12">
        {/* Left side - Animation and welcome text */}
        <div className="lg:w-1/2 max-w-lg text-center lg:text-left">
          <h1 className="text-5xl font-bold text-gray-900  mt-20">
            Welcome to <span className="text-purple-600">Sacred Journey</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed mt-5">
            Continue your spiritual path with us. Sign in to access your personalized dashboard, prayer groups, and sacred resources.
          </p>
          
          <div className="hidden lg:block w-full max-w-md mx-auto">
            <Lottie 
              animationData={spiritualAnimation} 
              loop={true} 
              className="w-70 h-80"
            />
          </div>
        </div>

        {/* Right side - Login form */}
        <div 
          ref={formRef}
          className="lg:w-1/2 max-w-md w-full bg-purple-50 rounded-2xl shadow-xl p-8 relative z-10 border border-gray-100"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Log in to continue your sacred journey</p>
          </div>

          <form className="space-y-6">
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
                <FiLock className="text-gray-400" />
              </div>
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all flex items-center justify-center shadow-lg hover:shadow-xl"
            >
              Log In
              <FiArrowRight className="ml-2" />
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0110 4.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                </svg>
              </button>

              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
              Join our spiritual community
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;