import { Toast, ToastActionElement, ToastProps } from "../../../../components/ui/toast";
import {
  useToast as useToastOriginal,
  toast as toastOriginal
} from "../../../../components/ui/use-toast";

export type { Toast, ToastActionElement, ToastProps };

export const useToast = useToastOriginal;
export const toast = toastOriginal;
