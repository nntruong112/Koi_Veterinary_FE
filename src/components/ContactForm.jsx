import React from "react";
import { assets } from "../assets/assets";

// const ContactForm = () => {
//   return (
//     <>
//       <h1 className="text-5xl font-bold mt-8 mb-8 text-[#071e55] text-center">
//         CONTACT US
//       </h1>
//       {/* ----------- SECTION 1 ----------- */}
//       <section className="flex justify-center gap-y-0 gap-x-[50px]">
//         <div className="my-10 flex flex-col md:flex-row gap-12">
//           <img
//             className="w-[600px] h-[440px] md:max-w-[360px] rounded-lg object-cover shadow-[10px_12px_40px_rgba(0,0,0,0.2)] -translate-x-10"
//             src={assets.KoiPool}
//             alt=""
//           />
//         </div>

//         <div className="flex flex-col justify-center items-start gap-10 text-gray-500">
//           <p className="font-semibold text-lg text-gray-600">OUR CENTER</p>
//           <p>123 XVNT, Ward 17, Binh Thanh District, HCMC</p>
//           <p>
//             Tel: +84 915-756-852 <br /> Email: KoiHealthService@gmail.com
//           </p>
//           <p className="font-serif text-lg text-gray-600">
//             Careers at KOI HEALTH CENTER
//           </p>
//           <p>Learn more about our teams and job openings.</p>
//           <div className="border border-solid text-black border-black font-bold text-xl p-5 hover:bg-primary hover:text-white">
//             <button>Explore more</button>
//           </div>
//         </div>
//       </section>

//       <section className="bg-center bg-cover bg-[url('./src/assets/home.jpg')] min-h-svh flex justify-center items-center">
//         <form className="w-[50vw] h-[80vh] rounded-lg flex flex-col gap-8 items-center">
//           <h2 className="font-semibold text-4xl text-white">GET IN TOUCH</h2>

//           <input
//             type="text"
//             name="Name"
//             placeholder="Your Name"
//             required
//             className="w-[500px] h-[30px] p-2 rounded-md bg-transparent border border-solid focus:outline-none text-white placeholder:text-white"
//           />

//           <input
//             type="email"
//             name="Email"
//             placeholder="Email Address"
//             required
//             className="w-[500px] h-[30px] p-2 rounded-md bg-transparent border border-solid focus:outline-none text-white placeholder:text-white"
//           />

//           <input
//             type="tel"
//             name="Phone"
//             placeholder="Phone"
//             required
//             className="w-[500px] h-[30px] p-2 rounded-md bg-transparent border border-solid focus:outline-none text-white placeholder:text-white"
//           />

//           <textarea
//             name="Message"
//             placeholder="Messages"
//             rows="5"
//             className="w-[500px] p-2 rounded-md resize-y text-lg bg-transparent border border-solid focus:outline-none text-white placeholder:text-white"
//           ></textarea>

//           <div className="w-[500px] text-white bg-primary p-3 rounded-lg font-semibold hover:bg-primary/90 transition text-center">
//             <button>Submit</button>
//           </div>
//         </form>
//       </section>
//     </>
//   );
// };

// export default ContactForm;
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// export default function Contact() {
//   const [result, setResult] = React.useState("");

//   const onSubmit = async (event) => {
//     event.preventDefault();
//     setResult("Sending....");
//     const formData = new FormData(event.target);

//     formData.append("access_key", "9ff9d494-3b1d-44f3-8e50-9c8f71ba82c0");

//     const response = await fetch("https://api.web3forms.com/submit", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await response.json();

//     if (data.success) {
//       setResult();
//       event.target.reset();
//     } else {
//       console.log("Error", data);
//       setResult(data.message);
//     }
//   };
//   const submit = () => toast.success("Form Submitted Successfully");

//   return (
//     <>
//       <h1 className="text-5xl font-bold mt-8 mb-8 text-[#071e55] text-center">
//         CONTACT US
//       </h1>

//       <section className="flex justify-center gap-y-0 gap-x-[50px]">
//         <div className="my-10 flex flex-col md:flex-row gap-12">
//           <img
//             className="w-[600px] h-[440px] md:max-w-[360px] rounded-lg object-cover shadow-[10px_12px_40px_rgba(0,0,0,0.2)] -translate-x-10"
//             src={assets.KoiPool}
//             alt=""
//           />
//         </div>

//         <div className="flex flex-col justify-center items-start gap-10 text-gray-500">
//           <p className="font-semibold text-lg text-gray-600">OUR CENTER</p>
//           <p>123 XVNT, Ward 17, Binh Thanh District, HCMC</p>
//           <p>
//             Tel: +84 915-756-852 <br /> Email: KoiHealthService@gmail.com
//           </p>
//           <p className="font-serif text-lg text-gray-600">
//             Careers at KOI HEALTH CENTER
//           </p>
//           <p>Learn more about our teams and job openings.</p>
//           <div className="border border-solid text-black border-black font-bold text-xl p-5 hover:bg-primary hover:text-white">
//             <button>Explore more</button>
//           </div>
//         </div>
//       </section>
//       <div className="bg-center contact-col bg-cover bg-[url('./src/assets/home.jpg')] min-h-svh flex justify-center items-center">
//         <form
//           className="w-[50vw] h-[80vh] rounded-lg bg-fixed flex flex-col gap-8 items-center"
//           onSubmit={onSubmit}
//         >
//           <input
//             type="text"
//             name="Name"
//             placeholder="Your Name"
//             required
//             className="w-[500px] h-[30px] p-2 rounded-md bg-transparent border border-solid focus:outline-none text-white placeholder:text-white"
//           />

//           <input
//             type="email"
//             name="Email"
//             placeholder="Email Address"
//             required
//             className="w-[500px] h-[30px] p-2 rounded-md bg-transparent border border-solid focus:outline-none text-white placeholder:text-white"
//           />

//           <input
//             type="tel"
//             name="Phone"
//             placeholder="Phone"
//             required
//             className="w-[500px] h-[30px] p-2 rounded-md bg-transparent border border-solid focus:outline-none text-white placeholder:text-white"
//           />

//           <textarea
//             name="Message"
//             placeholder="Messages"
//             rows="5"
//             className="w-[500px] p-2 rounded-md resize-y text-lg bg-transparent border border-solid focus:outline-none text-white placeholder:text-white"
//           ></textarea>

//           <div className="w-[250px] text-white bg-primary p-3 rounded-lg font-semibold hover:bg-primary/90 transition text-center">
//             <button onClick={submit}>Submit!</button>
//             <ToastContainer />
//           </div>
//         </form>
//         <span>{result}</span>
//       </div>
//     </>
//   );
// }
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "9ff9d494-3b1d-44f3-8e50-9c8f71ba82c0");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message Sent!");
        event.target.reset();
        toast.success("Form Submitted Successfully");
      } else {
        setResult("Failed to send message.");
        console.log("Error", data);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setResult("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <h1 className="text-5xl font-bold mt-8 mb-8 text-[#071e55] text-center">
        CONTACT US
      </h1>

      <section className="flex justify-center gap-y-0 gap-x-[50px]">
        <div className="my-10 flex flex-col md:flex-row gap-12">
          <img
            className="w-[600px] h-[440px] md:max-w-[360px] rounded-lg object-cover shadow-[10px_12px_40px_rgba(0,0,0,0.2)] -translate-x-10"
            src={assets.KoiPool}
            alt=""
          />
        </div>

        <div className="flex flex-col justify-center items-start gap-10 text-gray-500">
          <p className="font-semibold text-lg text-gray-600">OUR CENTER</p>
          <p>123 XVNT, Ward 17, Binh Thanh District, HCMC</p>
          <p>
            Tel: +84 915-756-852 <br /> Email: KoiHealthService@gmail.com
          </p>
          <p className="font-serif text-lg text-gray-600">
            Careers at KOI HEALTH CENTER
          </p>
          <p>Learn more about our teams and job openings.</p>
          <div className="border border-solid text-black border-black font-bold text-xl p-5 hover:bg-primary hover:text-white">
            <button>Explore more</button>
          </div>
        </div>
      </section>
      <div className="bg-center contact-col bg-cover bg-[url('./src/assets/home.jpg')] min-h-svh flex justify-center items-center">
        <form
          className="w-[50vw] h-[80vh] rounded-lg bg-fixed flex flex-col gap-8 items-center"
          onSubmit={onSubmit}
        >
          <input
            type="text"
            name="Name"
            placeholder="Your Name"
            required
            className="w-[500px] h-[30px] p-2 rounded-md bg-transparent border border-solid focus:outline-none text-white placeholder:text-white"
          />

          <input
            type="email"
            name="Email"
            placeholder="Email Address"
            required
            className="w-[500px] h-[30px] p-2 rounded-md bg-transparent border border-solid focus:outline-none text-white placeholder:text-white"
          />

          <input
            type="tel"
            name="Phone"
            placeholder="Phone"
            required
            className="w-[500px] h-[30px] p-2 rounded-md bg-transparent border border-solid focus:outline-none text-white placeholder:text-white"
          />

          <textarea
            name="Message"
            placeholder="Messages"
            rows="5"
            className="w-[500px] p-2 rounded-md resize-y text-lg bg-transparent border border-solid focus:outline-none text-white placeholder:text-white"
          ></textarea>

          <div className="w-[250px] text-white bg-primary p-3 rounded-lg font-semibold hover:bg-primary/90 transition text-center">
            <button type="submit">Submit!</button>
            <ToastContainer />
          </div>
        </form>
        <span>{result}</span>
      </div>
    </>
  );
}
