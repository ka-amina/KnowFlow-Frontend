import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ category, onDelete }) => {
  return (
    <div className="bg-white shadow rounded-lg p-5 mb-5">
      <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
      <div className="flex justify-end">
        <Link
          to={`/categories/edit/${category.id}`}
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

export default CategoryCard;