import * as Toast from 'vue-toastification/dist/index.mjs';

import BDKSimpleToast from './../theme/components/BDKSimpleToast.vue';

const { useToast } = Toast;

enum ToastType {
  ERROR = 0,
  SUCCESS = 1,
  INFO = 2,
  WARNING = 3,
}

export const toast = (msg: string, type?: ToastType) => {
  const _toast = useToast();

  switch (type) {
    case ToastType.ERROR:
      _toast.error({ component: BDKSimpleToast, props: { text: msg } });
      break;
    case ToastType.INFO:
      _toast.info({ component: BDKSimpleToast, props: { text: msg } });
      break;
    case ToastType.WARNING:
      _toast.warning({ component: BDKSimpleToast, props: { text: msg } });
      break;
    default:
      _toast.success({ component: BDKSimpleToast, props: { text: msg } });
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function tryCatchToast(fn: (...args: any[]) => any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (...args: any[]) {
    try {
      const result = fn(...args);
      if (result && typeof result.then === 'function' && typeof result.catch === 'function') {
        return result.catch((error: Error) => {
          // eslint-disable-next-line no-console
          console.error(`Error: `, error);
          toast(error.message, ToastType.ERROR);
          throw error;
        });
      }

      return result;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error(`Error: `, error);
      if (error.message) {
        toast(error.message, ToastType.ERROR);
      } else {
        toast(error, ToastType.ERROR);
      }

      throw error;
    }
  };
}
