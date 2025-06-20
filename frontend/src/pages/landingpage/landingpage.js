import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Modern Login Page Component (your existing component)
import ModernLoginPage from '../login/loginPage';
import { Camera, Image, MessageCircleCodeIcon, MessageCircleIcon, Share2Icon, UsersRoundIcon } from 'lucide-react';

// Main Landing Animation Component
const GSAPAnimatedLogin = () => {
  const [showLogin, setShowLogin] = useState(false);
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const titleRef = useRef(null);
  const dotsRef = useRef(null);
  const rectangleRef = useRef(null);
  
  const chatIconRef = useRef(null);
  const chatTextRef = useRef(null);
  const shareIconRef = useRef(null);
  const shareTextRef = useRef(null);
  const friendsIconRef = useRef(null);
  const friendsTextRef = useRef(null);
  const storiesIconRef = useRef(null);
  const storiesTextRef = useRef(null);
  const loginPageRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    // Create master timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setShowLogin(true);
      }
    });
    
    timelineRef.current = tl;

    // Set initial states for all elements
    gsap.set([titleRef.current, dotsRef.current, rectangleRef.current], {
      opacity: 0,
      scale: 0
    });

    gsap.set([chatIconRef.current, chatTextRef.current, shareIconRef.current, shareTextRef.current, 
              friendsIconRef.current, friendsTextRef.current, storiesIconRef.current, storiesTextRef.current], {
      opacity: 0,
      scale: 0,
      x: 0
    });

    gsap.set(loginPageRef.current, {
      opacity: 0,
      scale: 0.5
    });

    // Animation sequence
    tl
      // 1. Background fade in
      .from(bgRef.current, {
        duration: 1.5,
        opacity: 0,
        scale: 1.2,
        ease: "power2.out"
      })
      
      // 2. Title appears with 3D effect
      .to(titleRef.current, {
        duration: 1,
        opacity: 1,
        scale: 1,
        rotationX: 360,
        transformOrigin: "center center",
        ease: "back.out(1.7)"
      }, "-=0.5")
      
      // 3. Three dots appear and dance
      .to(dotsRef.current, {
        duration: 0.8,
        opacity: 1,
        scale: 1,
        ease: "elastic.out(1, 0.3)"
      })
      .to(".dot", {
        duration: 1.5,
        y: -20,
        stagger: 0.2,
        repeat: 2,
        yoyo: true,
        ease: "power2.inOut"
      })
      
      // 4. Rectangle appears below dots
      .to(rectangleRef.current, {
        duration: 1,
        opacity: 1,
        scale: 1,
        rotationY: 360,
        transformOrigin: "center center",
        ease: "power3.out"
      }, "-=1")
      
      // 5. Zoom in between dots and rectangle
      .to([dotsRef.current, rectangleRef.current], {
        duration: 1.5,
        scale: 1.5,
        z: 100,
        ease: "power2.inOut"
      })
      
      // 6. Title, dots, and rectangle disappear with zoom
      .to([titleRef.current, dotsRef.current, rectangleRef.current], {
        duration: 0.8,
        opacity: 0,
        scale: 0,
        ease: "power2.in"
      })
      
      // 7. First Icon Scene - Chat
      .to(chatIconRef.current, {
        duration: 1,
        opacity: 1,
        scale: 1.5,
        x: -150,
        rotationY: 360,
        ease: "back.out(1.7)"
      })
      .to(chatTextRef.current, {
        duration: 0.8,
        opacity: 1,
        scale: 1,
        x: 100,
        ease: "power2.out"
      }, "-=0.5")
      .to([chatIconRef.current, chatTextRef.current], {
        duration: 1,
        scale: 2,
        ease: "power2.inOut"
      }, "+=1")
      .to([chatIconRef.current, chatTextRef.current], {
        duration: 0.6,
        opacity: 0,
        scale: 0,
        ease: "power2.in"
      })
      
      // 8. Second Icon Scene - Share Moments
      .to(shareIconRef.current, {
        duration: 1,
        opacity: 1,
        scale: 1.5,
        x: -150,
        rotation: 360,
        ease: "back.out(1.7)"
      })
      .to(shareTextRef.current, {
        duration: 0.8,
        opacity: 1,
        scale: 1,
        x: 100,
        ease: "power2.out"
      }, "-=0.5")
      .to([shareIconRef.current, shareTextRef.current], {
        duration: 1,
        scale: 2,
        ease: "power2.inOut"
      }, "+=1")
      .to([shareIconRef.current, shareTextRef.current], {
        duration: 0.6,
        opacity: 0,
        scale: 0,
        ease: "power2.in"
      })
      
      // 9. Third Icon Scene - Connect with Friends
      .to(friendsIconRef.current, {
        duration: 1,
        opacity: 1,
        scale: 1.5,
        x: -150,
        rotationZ: 360,
        ease: "back.out(1.7)"
      })
      .to(friendsTextRef.current, {
        duration: 0.8,
        opacity: 1,
        scale: 1,
        x: 100,
        ease: "power2.out"
      }, "-=0.5")
      .to([friendsIconRef.current, friendsTextRef.current], {
        duration: 1,
        scale: 2,
        ease: "power2.inOut"
      }, "+=1")
      .to([friendsIconRef.current, friendsTextRef.current], {
        duration: 0.6,
        opacity: 0,
        scale: 0,
        ease: "power2.in"
      })
      
      // 10. Fourth Icon Scene - Share Stories
      .to(storiesIconRef.current, {
        duration: 1,
        opacity: 1,
        scale: 1.5,
        x: -150,
        rotationX: 360,
        ease: "back.out(1.7)"
      })
      .to(storiesTextRef.current, {
        duration: 0.8,
        opacity: 1,
        scale: 1,
        x: 100,
        ease: "power2.out"
      }, "-=0.5")
      .to([storiesIconRef.current, storiesTextRef.current], {
        duration: 1,
        scale: 2,
        ease: "power2.inOut"
      }, "+=1")
      .to([storiesIconRef.current, storiesTextRef.current], {
        duration: 0.6,
        opacity: 0,
        scale: 0,
        ease: "power2.in"
      })
      
      // 11. Background final transition
      .to(bgRef.current, {
        duration: 1.5,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        ease: "power2.inOut"
      })
      
      // 12. Login page appears with smooth fade
      .to(loginPageRef.current, {
        duration: 1.5,
        opacity: 1,
        scale: 1,
        ease: "power2.out"
      });

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  const skipAnimation = () => {
    if (timelineRef.current) {
      timelineRef.current.progress(1);
    }
  };

  if (showLogin) {
    return <ModernLoginPage />;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Skip button */}
      <button
        onClick={skipAnimation}
        className="absolute top-4 right-4 z-50 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-300"
      >
        Skip Animation
      </button>

      {/* Animated Landing */}
      <div ref={containerRef} className="relative w-full h-full flex flex-col items-center justify-center">
        {/* Animated Background */}
        <div
          ref={bgRef}
          className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-red-900"
          style={{
            background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
          }}
        />

        {/* 3D Title */}
        <div
          ref={titleRef}
          className="relative z-10 text-center mb-16"
          style={{
            transform: 'perspective(1000px)',
            transformStyle: 'preserve-3d'
          }}
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Connect
          </h1>
          <h2 className="text-3xl md:text-5xl font-light text-gray-300">
            with Friends
          </h2>
        </div>

        {/* Three Dancing Dots */}
        <div ref={dotsRef} className="flex space-x-4 mb-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="dot w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full shadow-lg"
              style={{
                boxShadow: '0 0 20px rgba(79, 172, 254, 0.6)'
              }}
            />
          ))}
        </div>

        {/* 3D Rectangle */}
        <div
          ref={rectangleRef}
          className="w-32 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mb-16 shadow-2xl"
          style={{
            transform: 'perspective(1000px) rotateX(20deg)',
            boxShadow: '0 10px 30px rgba(147, 51, 234, 0.4)'
          }}
        />

         {/* Chat Scene - Icon on left, Text on right */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center space-x-16">
            <div
              ref={chatIconRef}
              className="w-24 h-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl"
              style={{
                boxShadow: '0 0 40px rgba(6, 182, 212, 0.4)'
              }}
            >
              
              <MessageCircleCodeIcon />
            </div>
            <div ref={chatTextRef} className="text-white">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Chat with People
              </h2>
              <p className="text-2xl text-gray-300 mt-4">Start meaningful conversations</p>
            </div>
          </div>
        </div>

        {/* Share Scene - Icon on left, Text on right */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center space-x-16">
            <div
              ref={shareIconRef}
              className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl"
              style={{
                boxShadow: '0 0 40px rgba(168, 85, 247, 0.4)'
              }}
            >
              
              <Image />
            </div>
            <div ref={shareTextRef} className="text-white">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Share Moments
              </h2>
              <p className="text-2xl text-gray-300 mt-4">Capture and share memories</p>
            </div>
          </div>
        </div>

        {/* Friends Scene - Icon on left, Text on right */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center space-x-16">
            <div
              ref={friendsIconRef}
              className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl"
              style={{
                boxShadow: '0 0 40px rgba(34, 197, 94, 0.4)'
              }}
            >
              <UsersRoundIcon />
            </div>
            <div ref={friendsTextRef} className="text-white">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Connect Friends
              </h2>
              <p className="text-2xl text-gray-300 mt-4">Build lasting relationships</p>
            </div>
          </div>
        </div>

        {/* Stories Scene - Icon on left, Text on right */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center space-x-16">
            <div
              ref={storiesIconRef}
              className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl"
              style={{
                boxShadow: '0 0 40px rgba(251, 191, 36, 0.4)'
              }}
            >
              <Camera />
            </div>
            <div ref={storiesTextRef} className="text-white">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Share Stories
              </h2>
              <p className="text-2xl text-gray-300 mt-4">Tell your story to the world</p>
            </div>
          </div>
        </div>

        {/* Login Page Container */}
        <div
          ref={loginPageRef}
          className="absolute inset-0"
        >
          <ModernLoginPage />
        </div>
      </div>
    </div>
  );
};

export default GSAPAnimatedLogin;