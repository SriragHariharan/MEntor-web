import { ToastContainer, toast } from "react-toastify";

export const showSuccessToast = (message) => {
    toast.success(message, {
		position: "top-center",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "dark",
	});
}

export const showErrorToast = (message) => {
	toast.error(message, {
		position: "top-center",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "dark",
	});
};

