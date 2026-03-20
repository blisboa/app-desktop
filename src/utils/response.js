function success(res, data, message = 'OK') {
  res.json({
    status: 'success',
    message,
    data,
  });
}

function error(res, message = 'Error', code = 500) {
  res.status(code).json({
    status: 'error',
    message,
    data: null,
  });
}

module.exports = { success, error };
