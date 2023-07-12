interface ToastOptions {
  message: string;
  duration: number;
  type?: 'success' | 'error' | 'warning';
}

const Toast = ({ message, duration, type }: ToastOptions) => {
  alert(message);
};

export default Toast;
