import React from "react";

const Work = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50">
      <div className="bg-white p-6 rounded-3xl shadow-lg text-center w-[30%] h-[40%] text-primary flex flex-col justify-between items-center">
        <div>
          <h2 className="text-3xl mb-3 font-bold text-center bg-primary text-transparent bg-clip-text">
            Email Verification
          </h2>
          <p className="text-center text-gray-400 ">
            Enter the 6-digit code sent to your email address.
          </p>
        </div>

        <form className="flex justify-between gap-4">
          <input className="w-12 h-12 text-center text-3xl font-bold bg-gray-200 text-black border rounded-lg focus:border-black focus:outline-none" />
          <input className="w-12 h-12 text-center text-3xl font-bold bg-gray-200 text-black border rounded-lg focus:border-black focus:outline-none" />
          <input className="w-12 h-12 text-center text-3xl font-bold bg-gray-200 text-black border rounded-lg focus:border-black focus:outline-none" />
          <input className="w-12 h-12 text-center text-3xl font-bold bg-gray-200 text-black border rounded-lg focus:border-black focus:outline-none" />
          <input className="w-12 h-12 text-center text-3xl font-bold bg-gray-200 text-black border rounded-lg focus:border-black focus:outline-none" />
          <input className="w-12 h-12 text-center text-3xl font-bold bg-gray-200 text-black border rounded-lg focus:border-black focus:outline-none" />
        </form>

        <button className="bg-primary text-white w-1/4 h-12 rounded-lg text-center text-xl">
          Verify
        </button>

        <p className="text-gray-400">
          Didn't receive code?
          <span className="text-primary ml-3">Request again</span>
        </p>
      </div>
    </div>
  );
};

export default Work;
