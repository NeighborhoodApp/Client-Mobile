export default function errorHandler(error) {
  if (error.response) {
    const { msg } = error.response.data;
    return msg;
  }
  return 'Somthing Error : ' + error.message || error.stack;
}
