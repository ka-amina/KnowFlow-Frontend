import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

import Home from "./pages/Home";
import Course from "./pages/Courses";
import CourseForm from "./components/courses/CourseForm";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Course />} />
            <Route path="/courses/create" element={<CourseForm />} />
            <Route path="/courses/edit/:id" element={<CourseForm />} />
            {/* <Route path="/courses/:id" element={<CourseDetail />} /> */}
            <Route path="*" element={<div>Not Found!</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
