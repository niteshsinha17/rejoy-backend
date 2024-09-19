"use client";
import { toast } from "sonner";

export const Toast = {
  success: toast.success,
  error: toast.error,
  warning: toast.warning,
  info: toast.info,
  message: toast.message,
  loading: toast.loading,
  dismiss: toast.dismiss,
  promise: toast.promise,
};
