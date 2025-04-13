import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    content_type: "application/json",
    Accept: "application/json",
  },
});

export const courseService = {
  getAll: async () => {
    const res = await api.get("/courses");
    // console.log(res);

    return res.data;
  },
  getById: async (id) => {
    const res = await api.get(`/courses/${id}`);
    // console.log(res.data);
    
    return res.data;
  },
  create: async (data) => {
    const res = await api.post("/courses", data);
    return res.data;
  },
  update: async (id, data) => {
    const res = await api.put(`/courses/${id}`, data);
    return res.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/courses/${id}`);
    return res.data;
  },
};

export const categoryService = {
  getAll: async () => {
    const res = await api.get("/categories");
    return res.data;
  },
  getById:async(id)=>{
    const res=await api.get(`/categories/${id}`);
    return res.data.data;
  },
  create:async(data)=>{
    const res=await api.post("/categories",data)
    return res.data;
  },
  update:async(id,data)=>{
    const res=await api.put(`/categories/${id}`,data)
    return res.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/categories/${id}`);
    return res.data;
  },
  
};

export const tagService = {
  getAll: () => api.get("/tags"),
};
