import { courseService } from "../services/api";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import CourseCard from "../components/courses/CourseCard";

const Course = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courseRes = await courseService.getAll();
        // console.log(courseRes);
        setCourses(courseRes.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleDelete = async (courseId) => {
    try {
      await courseService.delete(courseId);
      setCourses(courses.filter((course) => course.id !== courseId));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <Link
          to="/courses/create"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create New Course
        </Link>
      </div>
      <div>
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onDelete={() => handleDelete(course.id)}
              />
            ))}
          </div>
        ) : (
          <p>Loading courses...</p>
        )}
      </div>
    </div>
  );
};
export default Course;
