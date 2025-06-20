import "./style.css";
import ModernLoginPage from "./loginPage"; // Your existing login page
import GSAPAnimatedLogin from "../landingpage/landingpage"; // The new animated component
import { useState } from "react";

export default function Login() {
  const [showAnimation, setShowAnimation] = useState(true);
  
  if (showAnimation) {
    return <GSAPAnimatedLogin onComplete={() => setShowAnimation(true)} />;
  }
  
  return (
    <div className="login">
      <div className="login_wrapper">
        <ModernLoginPage />
      </div>
    </div>
  );
}