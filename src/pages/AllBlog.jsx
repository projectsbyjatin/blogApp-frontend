import axios from "axios";
import {useState, useEffect} from 'react';
import { Link } from "react-router";
import {toast} from "react-toastify";
import BlogCard from "../components/BlogCard";



const AllBlogs = function () {
  const [recentBlogs, setRecentBlogs] = useState([]);
    const [isLoading, setIsLoading]= useState([]);

  useEffect(function () {

    async function fetchRecentBlogs(){
      try{
        const response= await axios.get("https://blogapp-backend-1-hdxd.onrender.com/");
        setRecentBlogs(response.data);
      } catch (error) {
        toast.error("failed to fetch blogs!!!");
      } finally {
        setIsLoading(false);
      }
    }
    fetchRecentBlogs();
  }, []);
  return (
    <main>
      <h1 className="text-5xl text-center text-pink-700 font-bold">All blogs</h1>
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          {" "}
          Explore all the amazing stories shared by community
        </h2>
         {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : recentBlogs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 ">
            {recentBlogs.map(function (blog) {
              return <BlogCard key={blog._id} blog={blog} />;
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No Blog available yet</p>
            <Link
              to="/add-blog"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Write the First Blog
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};
export default AllBlogs