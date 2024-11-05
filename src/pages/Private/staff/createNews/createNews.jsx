// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const NewsList = () => {
//   const dispatch = useDispatch();
//   const userId = useSelector((state) => state.users.data?.result?.userId);
//   const token = useSelector((state) => state.auth.data?.token);
//   const [newNews, setNewNews] = useState({
//     title: "",
//     newsContent: "",
//     authorId: userId,
//   });
//   const [editNews, setEditNews] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [newsList, setNewsList] = useState([]);

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/news", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setNewsList(response.data);
//       } catch (error) {
//         console.error("Error fetching news:", error);
//       }
//     };

//     fetchNews();
//   }, [token]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewNews((prevNews) => ({ ...prevNews, [name]: value }));
//   };

//   const createNews = async () => {
//     if (!newNews.title || !newNews.newsContent) {
//       setError("Please fill in all fields.");
//       return;
//     }
//     setLoading(true);
//     setError(null);

//     try {
//       await axios.post("http://localhost:8080/news/create", newNews, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       // console.log("New News Data:", newNews);

//       toast.success("News created successfully!");
//       setNewNews({ title: "", newsContent: "", authorId: userId });
//       refreshNewsList();
//     } catch (error) {
//       setError("Error creating news.");
//       console.error("Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const refreshNewsList = async () => {
//     const response = await axios.get("http://localhost:8080/news", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     setNewsList(response.data);
//   };

//   const handleDelete = async (newsId) => {
//     try {
//       await axios.delete(`http://localhost:8080/news/${newsId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       toast.success("News deleted successfully!");
//       setNewsList(newsList.filter((news) => news.newsId !== newsId));
//     } catch (error) {
//       toast.error("Error deleting news.");
//       console.error("Error:", error);
//     }
//   };

//   const handleEdit = (news) => {
//     setEditNews(news);
//     setNewNews({
//       title: news.title,
//       newsContent: news.newsContent,
//       authorId: userId,
//     });
//   };

//   const updateNews = async () => {
//     if (!newNews.title || !newNews.newsContent) {
//       setError("Please fill in all fields.");
//       return;
//     }
//     setLoading(true);
//     setError(null);

//     try {
//       await axios.put(
//         `http://localhost:8080/news/${editNews.newsId}`,
//         newNews,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       toast.success("News updated successfully!");
//       setNewNews({ title: "", newsContent: "", authorId: userId });
//       setEditNews(null);
//       refreshNewsList();
//     } catch (error) {
//       setError("Error updating news.");
//       console.error("Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full p-6 bg-gray-50 shadow-lg rounded-lg mt-10">
//       <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
//         Manage News
//       </h1>

//       {error && <p className="text-red-500 mb-4">{error}</p>}

//       <div className="mb-5">
//         <input
//           type="text"
//           name="title"
//           placeholder="Title"
//           value={newNews.title}
//           onChange={handleInputChange}
//           className="border border-gray-300 p-3 mb-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <textarea
//           name="newsContent"
//           placeholder="Content"
//           value={newNews.newsContent}
//           onChange={handleInputChange}
//           className="border border-gray-300 p-3 mb-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           rows={5}
//         />
//         <button
//           onClick={editNews ? updateNews : createNews}
//           className={`w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 ${
//             loading ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//           disabled={loading}
//         >
//           {loading ? "Processing..." : editNews ? "Update News" : "Add News"}
//         </button>
//       </div>

//       <h2 className="text-2xl font-semibold mb-4">Existing News</h2>
//       <table className="w-full text-sm text-left bg-white text-gray-500 border shadow-md rounded-lg">
//         <thead className="bg-gray-200 text-gray-700 uppercase">
//           <tr>
//             <th className="px-4 py-3">Title</th>
//             <th className="px-4 py-3">Content</th>
//             <th className="px-4 py-3">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {newsList.map((news) => (
//             <tr key={news.newsId} className="border-b hover:bg-gray-50">
//               <td className="px-4 py-3">{news.title}</td>
//               <td className="px-4 py-3">{news.newsContent}</td>
//               <td className="px-4 py-3 flex space-x-2">
//                 <button
//                   onClick={() => handleEdit(news)}
//                   className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition duration-300"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(news.newsId)}
//                   className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <ToastContainer />
//     </div>
//   );
// };

// export default NewsList;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const NewsList = () => {
//   const dispatch = useDispatch();
//   const userId = useSelector((state) => state.users.data?.result?.userId);
//   const token = useSelector((state) => state.auth.data?.token);
//   const [newNews, setNewNews] = useState({
//     title: "",
//     newsContent: "",
//     authorId: userId,
//   });
//   const [editNews, setEditNews] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [newsList, setNewsList] = useState([]);

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/news", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setNewsList(response.data);
//       } catch (error) {
//         console.error("Error fetching news:", error);
//       }
//     };

//     fetchNews();
//   }, [token]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewNews((prevNews) => ({ ...prevNews, [name]: value }));
//   };

//   const createNews = async () => {
//     if (!newNews.title || !newNews.newsContent) {
//       setError("Please fill in all fields.");
//       return;
//     }
//     setLoading(true);
//     setError(null);

//     try {
//       await axios.post("http://localhost:8080/news/create", newNews, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       // console.log("New News Data:", newNews);

//       toast.success("News created successfully!");
//       setNewNews({ title: "", newsContent: "", authorId: userId });
//       refreshNewsList();
//     } catch (error) {
//       setError("Error creating news.");
//       console.error("Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const refreshNewsList = async () => {
//     const response = await axios.get("http://localhost:8080/news", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     setNewsList(response.data);
//   };

//   const handleDelete = async (newsId) => {
//     try {
//       await axios.delete(`http://localhost:8080/news/${newsId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       toast.success("News deleted successfully!");
//       setNewsList(newsList.filter((news) => news.newsId !== newsId));
//     } catch (error) {
//       toast.error("Error deleting news.");
//       console.error("Error:", error);
//     }
//   };

// const handleEdit = (news) => {
//   setEditNews(news);
//   setNewNews({
//     title: news.title,
//     newsContent: news.newsContent,
//     authorId: userId,
//   });
// };

// const updateNews = async () => {
//   if (!newNews.title || !newNews.newsContent) {
//     setError("Please fill in all fields.");
//     return;
//   }
//   setLoading(true);
//   setError(null);

//   try {
//     await axios.put(
//       `http://localhost:8080/news/${editNews.newsId}`,
//       newNews,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     toast.success("News updated successfully!");
//     setNewNews({ title: "", newsContent: "", authorId: userId });
//     setEditNews(null);
//     refreshNewsList();
//   } catch (error) {
//     setError("Error updating news.");
//     console.error("Error:", error);
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="w-full p-6 bg-gray-50 shadow-lg rounded-lg mt-10">
//       <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
//         Manage News
//       </h1>

//       {error && <p className="text-red-500 mb-4">{error}</p>}

//       <div className="mb-5">
//         <input
//           type="text"
//           name="title"
//           placeholder="Title"
//           value={newNews.title}
//           onChange={handleInputChange}
//           className="border border-gray-300 p-3 mb-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <textarea
//           name="newsContent"
//           placeholder="Content"
//           value={newNews.newsContent}
//           onChange={handleInputChange}
//           className="border border-gray-300 p-3 mb-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           rows={5}
//         />
//         <button
//           onClick={editNews ? updateNews : createNews}
//           className={`w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 ${
//             loading ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//           disabled={loading}
//         >
//           {loading ? "Processing..." : editNews ? "Update News" : "Add News"}
//         </button>
//       </div>

//       <h2 className="text-2xl font-semibold mb-4">Existing News</h2>
//       <table className="w-full text-sm text-left bg-white text-gray-500 border shadow-md rounded-lg">
//         <thead className="bg-gray-200 text-gray-700 uppercase">
//           <tr>
//             <th className="px-4 py-3">Title</th>
//             <th className="px-4 py-3">Content</th>
//             <th className="px-4 py-3">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {newsList.map((news) => (
//             <tr key={news.newsId} className="border-b hover:bg-gray-50">
//               <td className="px-4 py-3">{news.title}</td>
//               <td className="px-4 py-3">{news.newsContent}</td>
//               <td className="px-4 py-3 flex space-x-2">
//                 <button
//                   onClick={() => handleEdit(news)}
//                   className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition duration-300"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(news.newsId)}
//                   className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <ToastContainer />
//     </div>
//   );
// };

// export default NewsList;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../../firebase/firebaseConfig"; // Ensure this path is correct

const NewsList = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.users.data?.result?.userId);
  const token = useSelector((state) => state.auth.data?.token);

  const [newNews, setNewNews] = useState({
    title: "",
    newsContent: "",
    authorId: userId,
    image: "", // Add this field for image URL
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [editNews, setEditNews] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    fetchNews();
  }, [token]);

  const fetchNews = async () => {
    try {
      const response = await axios.get("http://localhost:8080/news", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewsList(response.data);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNews((prevNews) => ({ ...prevNews, [name]: value }));
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedImage(file);
  };

  const uploadImage = async () => {
    if (selectedImage) {
      const imageRef = ref(storage, `newsImages/${selectedImage.name}`);
      await uploadBytes(imageRef, selectedImage);
      const imageUrl = await getDownloadURL(imageRef);
      return imageUrl;
    }
    return null;
  };

  const createNews = async () => {
    if (!newNews.title || !newNews.newsContent) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const imageUrl = await uploadImage();
      if (imageUrl) newNews.image = imageUrl; // Set image URL before sending request

      await axios.post("http://localhost:8080/news/create", newNews, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("News created successfully!");
      setNewNews({ title: "", newsContent: "", authorId: userId, image: "" });
      setSelectedImage(null); // Reset selected image
      fetchNews(); // Refresh news list
    } catch (error) {
      setError("Error creating news.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (newsId) => {
    try {
      await axios.delete(`http://localhost:8080/news/${newsId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("News deleted successfully!");
      setNewsList(newsList.filter((news) => news.newsId !== newsId));
    } catch (error) {
      toast.error("Error deleting news.");
      console.error("Error:", error);
    }
  };

  const handleEdit = (news) => {
    setEditNews(news);
    setNewNews({
      title: news.title,
      newsContent: news.newsContent,
      authorId: userId,
      image: news.image || "", // Load existing image URL if available
    });
  };

  const updateNews = async () => {
    if (!newNews.title || !newNews.newsContent) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const imageUrl = await uploadImage(); // Upload new image if selected
      if (imageUrl) newNews.image = imageUrl;

      await axios.put(
        `http://localhost:8080/news/${editNews.newsId}`,
        newNews,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("News updated successfully!");
      setNewNews({ title: "", newsContent: "", authorId: userId, image: "" });
      setSelectedImage(null); // Reset selected image
      setEditNews(null);
      fetchNews(); // Refresh news list
    } catch (error) {
      setError("Error updating news.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-6 bg-gray-50 shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Manage News
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-5">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newNews.title}
          onChange={handleInputChange}
          className="border border-gray-300 p-3 mb-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="newsContent"
          placeholder="Content"
          value={newNews.newsContent}
          onChange={handleInputChange}
          className="border border-gray-300 p-3 mb-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={5}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="border border-gray-300 p-2 mb-2 w-full rounded-md"
        />
        <button
          onClick={editNews ? updateNews : createNews}
          className={`w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Processing..." : editNews ? "Update News" : "Add News"}
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Existing News</h2>
      <table className="w-full text-sm text-left bg-white text-gray-500 border shadow-md rounded-lg">
        <thead className="bg-gray-200 text-gray-700 uppercase">
          <tr>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Content</th>
            <th className="px-4 py-3">Image</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {newsList.map((news) => (
            <tr key={news.newsId} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3">{news.title}</td>
              <td className="px-4 py-3">{news.newsContent}</td>
              <td className="px-4 py-3">
                {news.image && (
                  <img
                    src={news.image}
                    alt="News"
                    className="w-16 h-16 object-cover"
                  />
                )}
              </td>
              <td className="px-4 py-3 flex space-x-2">
                <button
                  onClick={() => handleEdit(news)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(news.newsId)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer />
    </div>
  );
};

export default NewsList;
