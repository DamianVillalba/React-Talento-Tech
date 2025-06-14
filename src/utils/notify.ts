import { toast, TypeOptions, ToastOptions } from "react-toastify";

export const notify = (
  message: string,
  type: TypeOptions = "default",
  customConfig?: ToastOptions
) => {
  toast(message, {...customConfig, type });
};