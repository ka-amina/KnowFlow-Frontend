import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { categoryService } from "../../services/api";

const CategoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      categoryService
        .getById(id)
        .then((data) => {
            console.log(data);
            
          setFormData({
            name: data.name,
          });
        })
        .catch((error) => {
          console.error("Error fetching category:", error);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (id) {
        await categoryService.update(id, formData);
      } else {
        await categoryService.create(formData);
      }
      navigate("/categories");
    } catch (error) {
      console.error("Error saving category:", error);
    } finally {
      setLoading(false);
    }
  };

  const isValid = () => {
    return formData.name.trim() !== "";
  };

  return (
    <div className="bg-white shadow rounded-lg p-5 mb-5">
      <h2 className="text-2xl font-semibold mb-4">
        {id ? "Edit Category" : "Create Category"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading || !isValid()}
          >
            {loading ? "Saving..." : id ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;