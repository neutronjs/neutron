import { toast } from 'react-toastify';

export default {
  info: (message) => {
    toast.info(message, {
      className: 'toast-notification-info',
      bodyClassName: 'toast-notification-body',
    });
  },

  success: (message) => {
    toast.success(message, {
      className: 'toast-notification-success',
      bodyClassName: 'toast-notification-body',
    });
  },

  error: (message) => {
    toast.error(message, {
      className: 'toast-notification-error',
      bodyClassName: 'toast-notification-body',
    });
  },

  warning: (message) => {
    toast.warn(message, {
      className: 'toast-notification-warning',
      bodyClassName: 'toast-notification-body',
    });
  },
};
