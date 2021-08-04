// eslint-disable-next-line import/prefer-default-export
export const logger = (...args: any[]) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(...args);
  }
};
