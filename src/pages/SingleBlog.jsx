import { useEffect, useState } from "react";
import { useParams, Link,useNavigate } from "react-router"; // ✅ use react-router-dom
import axios from "axios";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";

const SingleBlog = () => {
  const { id } = useParams();
  const navigate=useNavigate()
  const [blog, setBlog] = useState(null); // object instead of array
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSingleBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/blogs/${id}` // dynamic id
        );
        setBlog(response.data);
        console.log(response.data);
      } catch (error) {
        toast.error("404 Blog not Found");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSingleBlog();
  }, [id]); //

  async function deleteBlog(id) {
    try{
       const response = await axios.delete( `https://blogapp-backend-1-hdxd.onrender.com//${id}`);
       toast("Blog Deleted Successfully")
       navigate('/blogs')
    
  } 

    catch(error){
      toast("Blog cant be Deleted🫠")
      
    }
    
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  }
  if (!blog) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold  text-gray-800 mb-4 ">
          Blog not found
        </h1>
        <Link
          to={"/blogs"}
          className="bg-blue-700 text-white  px-6 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
        >
          Back to all blogs
        </Link>
      </div>
    );
  }
  const { author, content, createdAt, tags, title, _id } = blog;
  return (
    <main>
      <div className="max-w-4xl mx auto">
        <div className="bg-pink-300 rounded-lg shadow-md p-8">
          {/*Header*/}
          <div className="mb-b">
            <Link
              to={"/blogs"}
              className="text-green-950 hover:text-green-400 mb-4 flex items-center gap-1"
            >
              <ArrowLeft />
              Back to All Blogs
            </Link>
            <h1 className="text-4xl font-bold text-black-400 mb-4">{title}</h1>
            <div className="flex justify-between items-center text bg-purple-200 mb-6">
              <div>
                <span className="font-medium">By {author}</span>
                <span className="mx-2">.</span>
                <span>{createdAt}</span>
              </div>
              <button className="bg-amber-300 text-red-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-amber-200 transition-colors" onClick={()=>deleteBlog(_id)}>
                Delete Blog
              </button>
            </div>
          </div>
          {/*Tags */}
          {tags && tags.length > 0 && (
            <div className="mb-6">
              {tags.map(function (tag, index) {
                return (
                  <span
                    key={index}
                    className="inline-block bg-blue-500 text-black text-sm px-3 py-1 rounded-full mr-2"
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          )}
        </div>
        <div>
          <div className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
            {" "}
            {content}{" "}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SingleBlog;