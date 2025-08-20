import { toast } from 'sonner';

export const useToast = () => {
  return {
    toast: (message: string, options?: { type?: 'success' | 'error' | 'info' }) => {
      switch (options?.type) {
        case 'success':
          toast.success(message);
          break;
        case 'error':
          toast.error(message);
          break;
        case 'info':
          toast.info(message);
          break;
        default:
          toast(message);
      }
    },
  };
};