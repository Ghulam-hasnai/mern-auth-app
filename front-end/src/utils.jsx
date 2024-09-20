import { toast } from "react-toastify";

export function handleSuccess(msg) {
  toast.success(msg, {
    position: "top-right",
  });
}

export function handleError(msg) {
  toast.error(msg, {
    position: "top-right",
  });
}
