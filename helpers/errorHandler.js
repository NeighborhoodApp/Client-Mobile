export default function errorHandler(error) {
  if (error.response) {
    const { msg } = error.response.data;
    return msg;
  }
  return 'Error Message : ' + error.message;
}
