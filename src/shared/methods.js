export const handleRequestError = function(error) {
    const response = error.response;
    if (response) {
      this.error = {
          message: response.status === 404 ? 'Not found' : error.message,
          isFixable: [408, 410, 429 , (code) => code >= 500].some(el => Number.isInteger(el) ? el === response.status : el(response.status)),
      };
    } else {
      this.error = {
        message: error.message,
        isFixable: true
      };
    }
};