import TodoService from "./todo";
import axiosConfig from "../config/axios";

const todoService = new TodoService(axiosConfig);

export { todoService };
