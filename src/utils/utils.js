/**
 * Kiểm tra các trường bị thiếu trong data
 * @param {Object} data - Dữ liệu cần kiểm tra
 * @param {Array<string>} requiredFields - Danh sách các trường bắt buộc
 * @returns {Array<string>} - Danh sách các trường bị thiếu
 */
const validateRequiredFields = (data, requiredFields) => {
  const missingFields = requiredFields.filter(
    (field) =>
      data[field] === undefined || data[field] === null || data[field] === ""
  );
  if (missingFields.length > 0) {
    let msg = `Missing required fields: ${missingFields.join(", ")}`;
    console.log();
    return {
      status: "ERROR",
      code: 400,
      message: msg,
    };
  }
  return null;
};
module.exports = {
  validateRequiredFields,
};
