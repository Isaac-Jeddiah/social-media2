import React, { useState, useEffect, useRef } from 'react';
import { User, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import gsap from 'gsap';
import LoginForm from '../../components/login/LoginForm';
import RegisterForm from '../../components/login/RegisterForm';
const ModernLoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    gender: ''
  });

  // Refs for animations
  const containerRef = useRef(null);
  const bicycleRef = useRef(null);
  const leftSideRef = useRef(null);
  const rightSideRef = useRef(null);
  const loginCardRef = useRef(null);
  const signupCardRef = useRef(null);
  const signupButtonRef = useRef(null);
  const ballsRef = useRef([]);

  // Form validation
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Generate options for date selectors
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  useEffect(() => {
    // Initialize GSAP animations
    const initAnimations = () => {
      // Floating animation for bicycle
      if (bicycleRef.current) {
        const tl = gsap.timeline({ repeat: -1, yoyo: true });
        tl.to(bicycleRef.current, {
          y: -15,
          rotation: 10,
          duration: 3,
          ease: "power2.inOut"
        });
      }

      // Floating balls animation
      ballsRef.current.forEach((ball, index) => {
        if (ball) {
          gsap.to(ball, {
            y: Math.random() * 40 - 20,
            x: Math.random() * 20 - 10,
            rotation: 360,
            duration: 2 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: index * 0.3
          });
        }
      });

      // Initial card animations
      gsap.fromTo(loginCardRef.current, {
        x: -100,
        opacity: 0,
        scale: 0.9
      }, {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out"
      });

      gsap.fromTo(bicycleRef.current, {
        scale: 0,
        rotation: -180
      }, {
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
        delay: 0.3
      });
    };

    // Add GSAP script if not already loaded
    if (!window.gsap) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
      script.onload = initAnimations;
      document.head.appendChild(script);
    } else {
      initAnimations();
    }
  }, []);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (isSignUp) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Confirm password is required';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.gender) newErrors.gender = 'Gender is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      console.log('Form submitted:', formData);
      // Handle successful submission
    }, 2000);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gray-100">
      {/* Main Container */}
      <div ref={containerRef} className="flex transition-transform duration-1000 ease-in-out" style={{ width: '200vw' }}>
        
        {/* Left Side - Login */}
        <div ref={leftSideRef} className="w-screen h-screen flex relative">
          {/* Login Card Side */}
          {/* <div className="w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-8">
            <div ref={loginCardRef} className="w-full max-w-md">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/30">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full mb-4">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                  <p className="text-gray-600">Sign in to your account</p>
                </div>

                <div className="space-y-6">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-12 py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-12 py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Signing in...
                      </div>
                    ) : (
                      'Sign In'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div> */}
          <LoginForm />
          {/* Center Divider with Bicycle and Signup Button */}
          <div className="absolute left-1/2 top-0 w-10 h-full bg-white shadow-2xl transform -translate-x-1/2 z-10 flex flex-col items-center justify-center">
            {/* Bicycle Animation */}
            <div ref={bicycleRef} className="mb-8">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-600">
                <circle cx="18.5" cy="17.5" r="3.5"/>
                <circle cx="5.5" cy="17.5" r="3.5"/>
                <path d="m15 6-3.5 7 3.5 7"/>
                <path d="m12 6 3.5 7-3.5 7"/>
                <path d="M9 12h3"/>
                <path d="m6 9 6-3 6 3"/>
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
          <div className="w-1/2 bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-500 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold mb-4">Join Us Today</h1>
              <p className="text-xl opacity-90">Create your account and explore amazing features</p>
            </div>
          </div>
        </div>

        {/* Right Side - Signup */}
        <div className="w-screen h-screen flex relative">
          {/* Left Visual Background */}
          <div className="w-1/2 bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-600 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold mb-4">Welcome!</h1>
              <p className="text-xl opacity-90">Already have an account? Sign in to continue</p>
            </div>
          </div>

          {/* Center Divider */}
          <div className="absolute left-1/2 top-0 w-20 h-full bg-white shadow-2xl transform -translate-x-1/2 z-10 flex flex-col items-center justify-center">
            <button
              onClick={handleToggleForm}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-3 rounded-full hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-110 shadow-lg"
            >
              <ArrowLeft size={20} />
            </button>
          </div>

          {/* Signup Card Side */}
          <div className="w-1/2 bg-gradient-to-br from-rose-500 via-pink-500 to-purple-500 flex items-center justify-center p-6">
            <div ref={signupCardRef} className="w-full max-w-md opacity-0">
              <RegisterForm />
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default ModernLoginPage;