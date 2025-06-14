import React, { useState, useEffect, useRef } from 'react';
import { User, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import gsap from 'gsap';
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
  const ballsRef = useRef([]);
  const loginFormRef = useRef(null);
  const signupFormRef = useRef(null);
  const backgroundRef = useRef(null);

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
          y: -20,
          rotation: 5,
          duration: 3,
          ease: "power2.inOut"
        });
      }

      // Floating balls animation
      ballsRef.current.forEach((ball, index) => {
        if (ball) {
          gsap.to(ball, {
            y: Math.random() * 50 - 25,
            x: Math.random() * 30 - 15,
            rotation: 360,
            duration: 2 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: index * 0.2
          });
        }
      });

      // Background gradient animation
      if (backgroundRef.current) {
        gsap.to(backgroundRef.current, {
          backgroundPosition: "200% 0%",
          duration: 10,
          repeat: -1,
          ease: "none"
        });
      }
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
      // Animate to signup
      tl.to(bicycleRef.current, {
        x: -200,
        rotation: -20,
        duration: 0.8,
        ease: "power2.out"
      })
      .to(ballsRef.current, {
        x: -150,
        scale: 0.8,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.6")
      .to(loginFormRef.current, {
        x: -100,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.8")
      .fromTo(signupFormRef.current, {
        x: 100,
        opacity: 0
      }, {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.3");
    } else {
      // Animate to login
      tl.to(signupFormRef.current, {
        x: 100,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out"
      })
      .to(bicycleRef.current, {
        x: 0,
        rotation: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.3")
      .to(ballsRef.current, {
        x: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.6")
      .fromTo(loginFormRef.current, {
        x: -100,
        opacity: 0
      }, {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%)',
          backgroundSize: '200% 200%'
        }}
      />
      
      {/* Animated Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Custom Bicycle SVG */}
        <div 
          ref={bicycleRef}
          className="absolute top-1/4 left-1/4 text-white opacity-20"
        >
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="transform rotate-12">
            <circle cx="18.5" cy="17.5" r="3.5"/>
            <circle cx="5.5" cy="17.5" r="3.5"/>
            <path d="m15 6-3.5 7 3.5 7"/>
            <path d="m12 6 3.5 7-3.5 7"/>
            <path d="M9 12h3"/>
            <path d="m6 9 6-3 6 3"/>
          </svg>
        </div>
        
        {/* Floating Balls */}
        <div 
          ref={(el) => ballsRef.current[0] = el}
          className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full opacity-30 blur-sm"
        />
        <div 
          ref={(el) => ballsRef.current[1] = el}
          className="absolute top-1/2 right-1/6 w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-full opacity-40 blur-sm"
        />
        <div 
          ref={(el) => ballsRef.current[2] = el}
          className="absolute bottom-1/3 left-1/6 w-20 h-20 bg-gradient-to-br from-green-400 to-teal-600 rounded-full opacity-25 blur-sm"
        />
        <div 
          ref={(el) => ballsRef.current[3] = el}
          className="absolute bottom-1/4 right-1/3 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full opacity-35 blur-sm"
        />
      </div>

      {/* Main Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Login Form */}
          <div ref={loginFormRef} className={`${isSignUp ? 'hidden' : 'block'}`}>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                <p className="text-white/70">Sign in to your account</p>
              </div>

              <div onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-12 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-12 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
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

              <div className="mt-6 text-center">
                <button
                  onClick={handleToggleForm}
                  className="text-white/70 hover:text-white transition-colors duration-300"
                >
                  Don't have an account? <span className="text-purple-400 font-semibold">Sign up</span>
                </button>
              </div>
            </div>
          </div>

          {/* Signup Form */}
          <div ref={signupFormRef} className={`${!isSignUp ? 'hidden' : 'block'}`}>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
              <div className="text-center mb-6">
                <button
                  onClick={handleToggleForm}
                  className="absolute top-4 left-4 text-white/70 hover:text-white transition-colors duration-300"
                >
                  <ArrowLeft size={24} />
                </button>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full mb-4">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                <p className="text-white/70">Join us today</p>
              </div>

              <div onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    />
                    {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    />
                    {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-12 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-12 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-12 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  />
                  {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <select
                    name="birthDay"
                    value={formData.birthDay}
                    onChange={handleInputChange}
                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="" className="text-gray-800">Day</option>
                    {days.map(day => (
                      <option key={day} value={day} className="text-gray-800">{day}</option>
                    ))}
                  </select>
                  <select
                    name="birthMonth"
                    value={formData.birthMonth}
                    onChange={handleInputChange}
                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="" className="text-gray-800">Month</option>
                    {months.map(month => (
                      <option key={month} value={month} className="text-gray-800">{month}</option>
                    ))}
                  </select>
                  <select
                    name="birthYear"
                    value={formData.birthYear}
                    onChange={handleInputChange}
                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="" className="text-gray-800">Year</option>
                    {years.map(year => (
                      <option key={year} value={year} className="text-gray-800">{year}</option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-4">
                  {['male', 'female', 'custom'].map(gender => (
                    <label key={gender} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        checked={formData.gender === gender}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded-full border-2 mr-2 transition-all duration-300 ${
                        formData.gender === gender 
                          ? 'bg-green-500 border-green-500' 
                          : 'border-white/30'
                      }`}>
                        {formData.gender === gender && (
                          <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                        )}
                      </div>
                      <span className="text-white/70 capitalize text-sm">{gender}</span>
                    </label>
                  ))}
                </div>
                {errors.gender && <p className="text-red-400 text-sm">{errors.gender}</p>}

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Creating account...
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </div><div >
                    <button>
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Creating account...
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernLoginPage;