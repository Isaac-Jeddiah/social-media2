import React, { useState, useEffect, useRef } from 'react';
import { User, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import gsap from 'gsap';
import LoginForm from '../../components/login/LoginForm';
import RegisterForm from '../../components/login/RegisterForm';
const ModernLoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
 

  // Refs for animations
  const containerRef = useRef(null);
  const bicycleRef = useRef(null);
  const leftSideRef = useRef(null);
  const rightSideRef = useRef(null);
  const loginCardRef = useRef(null);
  const signupCardRef = useRef(null);
  const signupButtonRef = useRef(null);
  const ballsRef = useRef([]);


  
  // useEffect(() => {
  //   // Initialize GSAP animations
    
  // }, []);

  const handleToggleForm = () => {
    const tl = gsap.timeline();
    
    if (!isSignUp) {
      // Hide signup button first
      tl.to(signupButtonRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      })
      // Animate bicycle to right side
      .to(bicycleRef.current, {
        x: '100vw',
        y: -50,
        rotation: 180,
        scale: 0.8,
        duration: 1.2,
        ease: "power2.inOut"
      }, "-=0.1")
      // Animate balls to follow
      .to(ballsRef.current, {
        x: '80vw',
        scale: 0.6,
        duration: 1,
        stagger: 0.1,
        ease: "power2.inOut"
      }, "-=1")
      // Slide entire container to show signup
      .to(containerRef.current, {
        x: '-50%',
        duration: 1,
        ease: "power2.inOut"
      }, "-=0.8")
      // Fade in signup card
      .fromTo(signupCardRef.current, {
        x: 100,
        opacity: 0,
        scale: 0.9
      }, {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.5");
    } else {
      // Reverse animation
      tl.to(signupCardRef.current, {
        x: 100,
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        ease: "power2.in"
      })
      .to(containerRef.current, {
        x: '0%',
        duration: 1,
        ease: "power2.inOut"
      }, "-=0.3")
      .to(bicycleRef.current, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 1.2,
        ease: "power2.inOut"
      }, "-=1")
      .to(ballsRef.current, {
        x: 0,
        scale: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power2.inOut"
      }, "-=1")
      .to(signupButtonRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "back.out(1.7)"
      }, "-=0.3");
    }
    
    setIsSignUp(!isSignUp);
  };

  



  
  return (
    <div className="min-h-screen overflow-hidden bg-gray-100">
      {/* Main Container */}
      <div ref={containerRef} className="flex transition-transform duration-1000 ease-in-out" style={{ width: '200vw' }}>
        
        {/* Left Side - Login */}
        <div ref={leftSideRef} className="w-screen h-screen flex relative">
          {/* Login Card Side */}
        
             <div className="w-1/2 h-full bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-600 flex items-center justify-center">
        
          <LoginForm />
          </div>
          {/* Center Divider with Bicycle and Signup Button */}
          <div className="absolute left-1/2 top-0 w-0 h-full bg-white shadow-2xl transform -translate-x-1/2 z-10 flex flex-col items-center justify-center">
            {/* Bicycle Animation */}
            <div ref={bicycleRef} className="mb-8">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-600">
                
              </svg>
            </div>

            {/* Floating Decorative Balls */}
            <div 
              ref={(el) => ballsRef.current[0] = el}
              className="absolute top-20 left-2 w-3 h-3 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-60"
            />
            <div 
              ref={(el) => ballsRef.current[1] = el}
              className="absolute top-32 right-2 w-2 h-2 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-70"
            />
            <div 
              ref={(el) => ballsRef.current[2] = el}
              className="absolute bottom-32 left-1 w-4 h-4 bg-gradient-to-br from-green-400 to-teal-500 rounded-full opacity-50"
            />
            <div 
              ref={(el) => ballsRef.current[3] = el}
              className="absolute bottom-20 right-3 w-2.5 h-2.5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-65"
            />

            {/* Signup Button */}
            <button
              ref={signupButtonRef}
              onClick={handleToggleForm}
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-110 shadow-lg"
            >
              Sign Up
            </button>
          </div>

          {/* Right Side - Visual Background */}
          <div className="w-1/2 h-full bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-500 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold mb-4">Join Us Today</h1>
              <p className="text-xl opacity-90">Create your account and explore amazing features</p>
            </div>
          </div>
        </div>

        {/* Right Side - Signup */}
        <div className="w-screen h-screen flex relative">
          {/* Left Visual Background */}
          <div className="w-1/2 h-full bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-600 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold mb-4">Welcome!</h1>
              <p className="text-xl opacity-90">Already have an account? Sign in to continue</p>
            </div>
          </div>

          {/* Center Divider */}
          <div className="absolute left-1/2 top-0 w-0 h-full bg-white shadow-2xl transform -translate-x-1/2 z-10 flex flex-col items-center justify-center">
            <button
              onClick={handleToggleForm}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-3 rounded-full hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-110 shadow-lg"
            >
              <ArrowLeft size={20} />
            </button>
          </div>

          {/* Signup Card Side */}
          <div className="w-1/2 h-full bg-gradient-to-br from-rose-500 via-pink-500 to-purple-500 flex items-center justify-center p-6">
            <div ref={signupCardRef} className="w-full max-w-md opacity-0">
              <RegisterForm setVisible={true} />
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default ModernLoginPage;