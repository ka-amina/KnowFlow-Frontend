import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ course, onDelete }) => {
  return (
    <div className="bg-white shadow rounded-lg p-5 mb-5">
      <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
      <div className="mb-3">
        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-2">
          {course.level}
        </span>
        <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
          {course.status}
        </span>
      </div>
      <p className="text-gray-600 mb-3">
        {course.description?.substring(0, 100)}...
      </p>
      <div className="flex items-center mb-3">
        <div className="text-sm text-gray-500">
          <span className="font-medium">Duration:</span> {course.duration} hours
        </div>
        <div className="ml-4 text-sm text-gray-500">
          <span className="font-medium">Category:</span> {course.category?.name}
        </div>
      </div>
      {course.tags && course.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {course.tags.map((tag) => (
            <span
              key={tag.id}
              className="bg-gray-200 px-2 py-1 rounded-full text-xs"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}
      <div className="flex justify-end">
        <Link
          to={`/courses/${course.id}`}
          className="text-blue-600 hover:text-blue-800 font-medium mr-4"
        >
          View Details
        </Link>
        <Link
          to={`/courses/edit/${course.id}`}
          className="text-blue-600 hover:text-blue-800 font-medium mr-4"
        >
          Edit
        </Link>
        <button
          onClick={onDelete}
          className="text-red-600 hover:text-red-800 font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
