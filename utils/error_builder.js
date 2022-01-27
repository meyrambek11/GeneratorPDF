module.exports = function error_builder(error, message){
  console.log({
    error_type: error.constructor.name,
    error_code: error.code,
    error_message: error.message,
    error_stack: error.stack
  });
  return message
}