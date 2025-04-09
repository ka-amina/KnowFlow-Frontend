import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { courseService, categoryService, tagService } from "../../services/api";

const CourseForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    level: "",
    status: "open",
    category_id: "",
    tags: [],
  });

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategoriesAndTags = async () => {
      try {
        const categoryResponse = await categoryService.getAll();
        setCategories(
          categoryResponse.data.data || categoryResponse.data || []
        );

        const tagResponse = await tagService.getAll();
        setTags(tagResponse.data.data || tagResponse.data || []);
        // console.log(tagResponse.data.data);
        // console.log(tagResponse.data);

        setCategories(categoryResponse.data);
        setTags(tagResponse.data.data);
      } catch (error) {
        console.error("Error fetching categories or tags:", error);
      }
    };

    fetchCategoriesAndTags();
   

    if (id) {
      setLoading(true);
      courseService
        .getById(id)
        .then((data) => {
          // console.log("Fetched Course Data:", data);
          setFormData({
            title: data.title,
            description: data.description,
            duration: data.duration,
            level: data.level,
            status: data.status,
            category_id: data.category.id, 
            tags: data.tags.map(tag => tag.id), 
          });
        })
        .catch((error) => {
          console.error("Error fetching course:", error);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleTagChange = (e) => {
    const { value, checked } = e.target;
    const tagId = parseInt(value, 10);
  
    setFormData((prevFormData) => {
      const updatedTags = checked
        ? [...prevFormData.tags, tagId] 
        : prevFormData.tags.filter((id) => id !== tagId); 
  
      return {
        ...prevFormData,
        tags: updatedTags,
      };
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("form data:", formData);
    try {
      setLoading(true);
      if (id) {
        await courseService.update(id, formData);
      } else {
        await courseService.create(formData);
      }
      navigate("/courses");
    } catch (error) {
      console.error("Error saving course:", error);
    } finally {
      setLoading(false);
    }
  };
 

  const isValid = () => {
    return formData.title && formData.description;
  };

  return (
    <div className="bg-white shadow rounded-lg p-5 mb-5">
      <h2 className="text-2xl font-semibold mb-4">
        {id ? "Edit Course" : "Create Course"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="duration"
          >
            Duration (hours)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="duration"
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="level"
          >
            Level
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="level"
            name="level"
            value={formData.level}
            onChange={handleChange}
          >
            <option value="">Select Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="category_id"
          >
            Category
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {Array.isArray(categories) &&
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {Array.isArray(tags) &&
              tags.map((tag) => (
                <div key={tag.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`tag-${tag.id}`}
                    value={tag.id}
                    checked={formData.tags.includes(tag.id)} 
                    onChange={handleTagChange}
                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                    disabled={loading}
                  />
                  <label
                    htmlFor={`tag-${tag.id}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {tag.name}
                  </label>
                </div>
              ))}
          </div>
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

export default CourseForm;
