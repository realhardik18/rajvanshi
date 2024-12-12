import React, { useState } from "react";

export default function SignIn() {
  const [captchaNumbers, setCaptchaNumbers] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
    const num2 = Math.floor(Math.random() * 10) + 1;
    return { num1, num2, sum: num1 + num2 };
  }

  const handleCaptchaChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setCaptchaInput(e.target.value);
    setIsCaptchaValid(value === captchaNumbers.sum);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isCaptchaValid) {
      alert("Please solve the CAPTCHA correctly.");
      return;
    }
    // Proceed with form submission logic
    alert("Form submitted successfully!");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950">
      <div className="flex w-full rounded-lg bg-gray-950 shadow-lg overflow-hidden">
        <div className="w-full p-8 sm:w-2/3">
          <h1 className="text-4xl font-bold text-red-600 mb-4">
            Rajvanshi Cricket Club Delhi
          </h1>
          <p className="text-sm text-gray-100 mb-8">
            To use the website, Please Login With Your Account.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-100">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="mt-1 w-full p-2 bg-gray-950 text-white border border-gray-600 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-100">Password</label>
              <input
                type="password"
                placeholder="Enter Your password"
                className="mt-1 w-full p-2 bg-gray-950 text-white border border-gray-600 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-100">
                Solve this CAPTCHA: What is {captchaNumbers.num1} + {captchaNumbers.num2}?
              </label>
              <input
                type="text"
                placeholder="Enter the sum"
                value={captchaInput}
                onChange={handleCaptchaChange}
                className="mt-1 w-full p-2 bg-gray-950 text-white border border-gray-600 rounded"
              />
              {!isCaptchaValid && captchaInput && (
                <p className="text-red-600 text-sm mt-2">Incorrect CAPTCHA, please try again.</p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full mt-4 py-3 text-lg text-white ${
                isCaptchaValid ? "bg-red-600 hover:bg-red-700" : "bg-gray-600 cursor-not-allowed"
              }`}
              disabled={!isCaptchaValid}
            >
              Sign In
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-400">
            Don't have an account?{" "}
            <a href="/sign-up" className="text-red-600 font-medium">Sign up</a>
          </p>
          <p className="mt-4 text-sm text-gray-400">
            Forgot Password?{" "}
            <a href="/forget-password" className="text-red-600 font-medium">Click Here</a>
          </p>
          <p className="mt-4 text-sm text-gray-400">
            Contact us{" "}
            <a href="/forget-password" className="text-red-600 font-medium">On Whatsapp</a>
          </p>          
        </div>

        {/* Right SVG Section */}
        <div className="hidden sm:block w-1/3 bg-red-600 p-8">
          <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
            <circle cx="8" cy="8" r="3" stroke="white" strokeWidth="2" />
            <circle cx="16" cy="16" r="2" stroke="white" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}
