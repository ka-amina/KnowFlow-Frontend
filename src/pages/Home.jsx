import React from "react";
// import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Course Management System</h1>
        <p className="text-xl text-gray-600 mb-8">
          Efficiently manage your courses, categories, and learning materials
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {/* <Link
            to="/courses"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
          >
            Browse Courses
          </Link>
          <Link
            to="/courses/new"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium"
          >
            Create New Course
          </Link> */}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <div className="text-blue-500 text-4xl mb-4">📚</div>
          <h3 className="text-xl font-bold mb-2">Course Management</h3>
          <p className="text-gray-600">
            Create, update, and manage your courses with ease
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <div className="text-blue-500 text-4xl mb-4">🏷️</div>
          <h3 className="text-xl font-bold mb-2">Categorize Content</h3>
          <p className="text-gray-600">
            Organize courses with categories and tags
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <div className="text-blue-500 text-4xl mb-4">📊</div>
          <h3 className="text-xl font-bold mb-2">Track Progress</h3>
          <p className="text-gray-600">
            Monitor course statuses and performance
          </p>
        </div>
      </div>
    </div>
  );
};
export default Home;
