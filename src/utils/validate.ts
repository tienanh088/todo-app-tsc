import { FieldErrors } from "react-hook-form";
import { ITask } from "../types/common";

export const getErrorMessage = (errors: FieldErrors<ITask>) => {
  if (errors.title?.type === 'required') return 'Please input title';
  if (errors.title?.type === 'maxLength') return 'Title is too long (max: 150 characters)';
};
