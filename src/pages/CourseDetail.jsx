import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { courseService } from "../services/api";

const CourseDetails = () => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await courseService.getById(id);
        setCourse(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch course details");
        setLoading(false);
        console.error("Error fetching course:", error);
      }
    };

    fetchCourse();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await courseService.delete(id);
        navigate("/courses");
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  if (loading) return <p>Loading course details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!course) return <p>Course not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6">{course.title}</h2>
      
      <div className="mb-4 flex gap-2">
        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          {course.level || "No level specified"}
        </span>
        <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
          {course.status || "No status specified"}
        </span>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Description</h3>
        <p className="text-gray-700">{course.description || "No description available"}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Details</h3>
          <p><span className="font-medium">Duration:</span> {course.duration || 0} hours</p>
          <p><span className="font-medium">Category:</span> {course.category?.name || "Uncategorized"}</p>
        </div>
      </div>
      
      {course.tags && course.tags.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {course.tags.map((tag) => (
              <span key={tag.id} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex justify-end gap-4 mt-8">
        <Link 
          to="/courses" 
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Back to Courses
        </Link>
        <Link 
          to={`/courses/edit/${course.id}`} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Edit Course
        </Link>
        <button 
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete Course
        </button>
      </div>
    </div>
  );
};

export default CourseDetails;