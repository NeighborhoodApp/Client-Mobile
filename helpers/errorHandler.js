export default function errorHandler(error) {
  if (error.response.data) {
    const { msg } = error.response.data;
    return msg;
  }
  return 'Somthing Error : ' + (error.message || 'Internal Error');
}
