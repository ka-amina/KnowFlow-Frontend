import { Link, useParams } from "react-router-dom";
import { courseService } from "../services/api";
import { useEffect, useState } from "react";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseData = await courseService.getById(id);
        console.log(courseData);
        setCourse(courseData);
      } catch (err) {
        setError("Failed to load course details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  if (!course) return <div>Course not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>

      <div className="mb-6">
        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-2">
          {course.level}
        </span>
        <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
          {course.status}
        </span>
      </div>

      <div className="mb-8">
        <p className="text-gray-700 leading-relaxed">{course.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <p className="font-medium text-gray-600">Duration:</p>
          <p className="text-gray-800">{course.duration} hours</p>
        </div>
        <div>
          <p className="font-medium text-gray-600">Category:</p>
          <p className="text-gray-800">{course.category?.name}</p>
        </div>
      </div>

      {course.tags && course.tags.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {course.tags.map((tag) => (
              <span
                key={tag.id}
                className="bg-gray-200 px-3 py-1 rounded-full text-sm"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <Link
          to="/courses"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Courses
        </Link>
        <div className="flex space-x-4">
          <Link
            to={`/courses/edit/${course.id}`}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit
          </Link>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;