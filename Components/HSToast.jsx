import { ToastContainer, toast, Zoom } from "react-toastify";

const ErrorToast = (content) => toast.error(content);

const WarnToast = (content) => toast.warn(content);

const SuccessToast = (content) => toast.success(content);

const HSToast = () => {
    return (
        <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={false}
            transition={Zoom}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            newestOnTop
            // limit={2}
        />
    );
};

export default HSToast;

export { ErrorToast, WarnToast, SuccessToast };
