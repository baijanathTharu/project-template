import { toast } from 'sonner';

export function toastSuccess(message: string) {
  toast.success(message, {
    position: 'bottom-center',
    dismissible: true,
    duration: 3000,
    className: 'bg-green-500 text-white',
  });
}

export function toastError(message: string) {
  toast.error(message, {
    position: 'bottom-center',
    dismissible: true,
    duration: 3000,
    className: 'bg-red-500 text-white',
  });
}

export function toastInfo(message: string) {
  toast(message, {
    position: 'bottom-center',
    dismissible: true,
    duration: 3000,
    className: 'bg-blue-500 text-white',
  });
}
