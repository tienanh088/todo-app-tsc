import { AxiosInstance } from "axios";
import { ITask } from "../types/common";

export default class TodoService {
  axios;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async checkExistTask(title: string, id?: number): Promise<boolean> {
    const { data } = await this.axios.get(`?title=${title}`);
    const findIndexById = data.findIndex((item: ITask) => item.id === id);
    return data.length && findIndexById === -1;
  }

  async getTasks(order?: 'asc' | 'desc'): Promise<ITask[]> {
    const { data } = await this.axios.get<ITask[]>(`?sortBy=createdAt&order=${order ?? 'desc'}`);
    return data;
  }

  async createTask(data: ITask): Promise<ITask> {
    const { title } = data;
    const isExist = await this.checkExistTask(title);
    if (isExist) throw new Error('Task already exist!');
    const response = await this.axios.post('', data);
    return response.data;
  }

  async updateTask(data: ITask): Promise<ITask> {
    const { id, ...task } = data;
    const isExist = await this.checkExistTask(task.title, id);
    if (isExist) throw new Error('Task already exist!');
    const response = await this.axios.put(`/${id}`, task);
    return response.data;
  }

  async deleteTask(id: number): Promise<void> {
    await this.axios.delete(`/${id}`);
  }
}
