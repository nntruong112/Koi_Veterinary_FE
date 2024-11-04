import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { assets } from "../../../assets/assets";
import RolesNavbar from "../../../components/rolesNavbar/RolesNavbar";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const Home = () => {
  const [newsList, setNewsList] = useState([]);
  const [expandedNews, setExpandedNews] = useState({});

  // Fetch news list from API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:8080/news");
        setNewsList(response.data);
      } catch (error) {
        console.error("Failed to fetch news list:", error);
      }
    };

    fetchNews();
  }, []);

  const toggleExpand = (newsId) => {
    setExpandedNews((prev) => ({
      ...prev,
      [newsId]: !prev[newsId], // Toggle the expanded state
    }));
  };

  return (
    <>
      <RolesNavbar />
      <Header />

      {/* section 1 */}
      <section className="flex justify-normal py-8 bg-[#f5f2f2]">
        <div className="flex items-center flex-col gap-6 text-2xl text-center w-1/2 mb-1 text-[#3d3c3c]">
          <h2 className="font-bold">
            Koi Health Center: <br /> Comprehensive Care for Koi Fish Health
          </h2>
          <img
            className="w-[403px] h-[403px]"
            src={assets.koihealth}
            alt="Koi Health"
          />
          <h3 className="text-slate-700">
            Administering Treatment to a Koi Fish
          </h3>
        </div>
        <div className="flex flex-col w-1/2 items-center justify-center gap-6 px-10">
          <p className="text-xl text-center">
            Koi Health Center possesses many years of experience in the field of
            health care for Koi fish, with a team of experts who have performed
            hundreds of successful diagnoses and treatments for diseases ranging
            from simple to complex.
          </p>
        </div>
      </section>

      {/* section 2 */}
      <section className="flex justify-normal py-8 bg-[#ffffff]">
        <div className="flex flex-col w-1/2 items-center justify-center gap-6 px-10">
          <p className="text-xl text-center">
            Koi Health Center receives many positive feedback from customers
            thanks to its outstanding service quality and dedicated care for Koi
            fish. Customers often appreciate the professionalism of the team of
            experts, along with effective treatment results and detailed
            consultation. With high ratings, Koi Health Center has become a
            reliable destination for Koi fish farmers, helping them feel secure
            about the health and beauty of their precious fish.
          </p>
        </div>
        <div className="flex items-center flex-col gap-6 text-2xl text-center w-1/2 font-bold mb-1 text-[#3d3c3c]">
          <h2 className="font-bold">
            Koi Health Center: <br /> Comprehensive Care for Koi Fish Health
          </h2>
          <img src={assets.RatingFb} alt="Rating" />
        </div>
      </section>

      {/* section 3 */}
      <section className="py-8  bg-[#ffffff]">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Latest News
        </h2>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={3}
          navigation
          loop={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {newsList.map((news) => (
            <SwiperSlide
              key={news.newsId}
              className="bg-white p-6 my-6 shadow-lg rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 hover:text-blue-600 transition-colors duration-200">
                {news.title}
              </h3>
              <p
                className="text-gray-700 mb-4"
                style={{ height: "calc(100% - 60px)" }}
              >
                {" "}
                {/* Chiều cao của nội dung động */}
                {expandedNews[news.newsId]
                  ? news.newsContent
                  : news.newsContent.length > 100
                  ? `${news.newsContent.substring(0, 100)}...`
                  : news.newsContent}
              </p>
              {news.newsContent.length > 100 && (
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => toggleExpand(news.newsId)}
                >
                  {expandedNews[news.newsId] ? "Read less" : "Read more"}
                </button>
              )}
              <p className="text-sm text-gray-500 italic hover:text-gray-700 transition-colors duration-200">
                Author: Koi Health Center
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <Footer />
    </>
  );
};

export default Home;
