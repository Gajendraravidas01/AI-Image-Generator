import axios from "axios";

// http://localhost:8080/api/
const API = axios.create({
  baseURL: "https://ai-image-generator-eta-gray.vercel.app/api/",
  // baseURL: "http://localhost:8080/api/",
});

export const GetPosts = async () => await API.get("/post/");
export const CreatePost = async (data) => await API.post("/post/", data);
export const GenerateImageFromPrompt = async (data) =>
  await API.post("/generateimage/", data);