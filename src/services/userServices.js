const bcrypt = require("bcrypt");
const { validateRequiredFields } = require("../utils/utils");
const db = require("../models/index.js");
// const { get } = require("../routes/userRoute.js");
const { Op, fn, col, where } = require("sequelize");
const codeMessageError = require("../../codeMessageError.js");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../services/jwtServices.js");

const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const createUser = async (data) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      isActive,
      geo_level_1_id,
      geo_level_2_id,
      geo_level_3_id,
      geo_level_1_name,
      geo_level_2_name,
      geo_level_3_name,
      geo_version,
      image,
      roleKey,
      positionKey,
      genderKey,
    } = data;
    // require data for create
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "password",
      "genderKey",
    ];
    //validate required fields
    const validationResult = validateRequiredFields(data, requiredFields);

    if (validationResult !== null) {
      return validationResult;
    }
    //check user exists
    const existingUser = await db.Users.findOne({
      where: { email: data.email },
    });
    if (existingUser) {
      return {
        status: "ERROR",
        code: 409,
        error: codeMessageError.PATH_MESSAGE_ERROR.EMAIL_ALREADY_EXISTS,
      };
    }
    //hash password
    const hashedPassword = await hashPassword(data.password);
    //create user
    const newUser = await db.Users.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
      phoneNumber: data.phoneNumber,
      isActive: data.isActive || true,
      geo_level_1_id: data.geo_level_1_id || null,
      geo_level_2_id: data.geo_level_2_id || null,
      geo_level_3_id: data.geo_level_3_id || null,
      geo_level_1_name: data.geo_level_1_name || null,
      geo_level_2_name: data.geo_level_2_name || null,
      geo_level_3_name: data.geo_level_3_name || null,
      geo_version: data.geo_version || "GEO_V1",
      image: data.image,
      roleKey: data.roleKey || "R3",
      positionKey:
        data?.roleKey === "R2"
          ? data?.positionKey || "P0"
          : data.roleKey === "R1"
          ? "PAD"
          : "PKH",
      genderKey: data.genderKey || "M",
    });
    if (!newUser) {
      return {
        status: "ERROR",
        code: 500,
        error: codeMessageError.PATH_MESSAGE_ERROR.CREATE_USER_FAILED,
      };
    }

    return {
      status: "SUCCESS",
      code: 200,
      message: "Users created successfully",
      id: newUser.id,
    };
    // Simulate user creation logic
  } catch (error) {
    console.log(error);
    return {
      status: "ERROR",
      message: "Failed to create user",
      code: 500,
      error: codeMessageError.PATH_MESSAGE_ERROR.INTERNAL_SERVER_ERROR,
    };
  }
};

//Lấy danh sách thông tin người dùng
const getListUsers = async (data) => {
  try {
    let whereCondition = {};
    const hasTextSearch = data?.text_search && data.text_search.trim() !== "";

    const hasFilter = Boolean(
      data?.isActive !== undefined ||
        data?.roleKey ||
        data?.positionKey ||
        data?.genderKey ||
        data?.geo_level_1_name ||
        data?.geo_level_2_name ||
        data?.geo_level_3_name
    );

    //lấy tất cả user

    let normalizedKeyword = "";
    // có truyền
    if (hasTextSearch) {
      const keywords = hasTextSearch ? data.text_search.trim() : null;

      normalizedKeyword = keywords
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      whereCondition[Op.or] = [
        where(fn("unaccent", col("firstName")), {
          [Op.iLike]: `%${normalizedKeyword}%`,
        }),
        where(fn("unaccent", col("lastName")), {
          [Op.iLike]: `%${normalizedKeyword}%`,
        }),
        where(fn("unaccent", col("email")), {
          [Op.iLike]: `%${normalizedKeyword}%`,
        }),
      ];
    }
    //filter
    // --- FILTER isActive ---
    if (data.isActive !== undefined) whereCondition.isActive = data.isActive;
    // --- FILTER theo các trường trực tiếp map vào DB ---
    const directFilters = [
      "geo_level_1_name",
      "geo_level_2_name",
      "geo_level_3_name",
      "roleKey",
      "positionKey",
    ];

    directFilters.forEach((field) => {
      if (
        data[field] !== undefined &&
        data[field] !== null &&
        data[field] !== ""
      ) {
        whereCondition[field] = data[field];
      }
    });

    const users = await db.Users.findAll({
      where: whereCondition,
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "phoneNumber",
        "isActive",
        "createdAt",
        "updatedAt",
      ],
      include: [
        {
          model: db.SystemCodes,
          as: "genderData",
          attributes: ["keyMap", "valueEn", "valueVi"],
        },
        {
          model: db.SystemCodes,
          as: "roleData",
          attributes: ["keyMap", "valueEn", "valueVi"],
        },
        {
          model: db.SystemCodes,
          as: "positionData",
          attributes: ["keyMap", "valueEn", "valueVi"],
        },
      ],
    });
    if (!users || users.length === 0) {
      return {
        status: "SUCCESS",
        message: "No users found",
        data: [],
      };
    }
    return {
      status: "SUCCESS",
      message: "Users retrieved successfully",
      data: users,
    };
  } catch (error) {
    console.log(error);

    return {
      status: "ERROR",
      message: "Failed to get list users",
      error: codeMessageError.PATH_MESSAGE_ERROR.INTERNAL_SERVER_ERROR,
    };
  }
};

const getDetailUser = async (id) => {
  try {
    console.log(id);

    if (!id) {
      return {
        status: "ERROR",
        message: "Users ID is required",
        code: 400,
      };
    }
    const user = await db.Users.findOne({
      where: { id },
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "phoneNumber",
        "isActive",
        "geo_level_1_id",
        "geo_level_2_id",
        "geo_level_3_id",
        "geo_level_1_name",
        "geo_level_2_name",
        "geo_level_3_name",
        "geo_version",
        "image",
        "createdAt",
      ],
      include: [
        {
          model: db.SystemCodes,
          as: "genderData",
          attributes: ["keyMap", "valueEn", "valueVi"],
          required: false,
        },
        {
          model: db.SystemCodes,
          as: "roleData",
          attributes: ["keyMap", "valueEn", "valueVi"],
          required: false,
        },
        {
          model: db.SystemCodes,
          as: "positionData",
          attributes: ["keyMap", "valueEn", "valueVi"],
          required: false,
        },
      ],
    });
    if (!user) {
      return {
        status: "ERROR",
        message: "Users not found",
        code: 404,
      };
    }
    return {
      status: "SUCCESS",
      message: "Users details retrieved successfully",
      data: user,
    };
  } catch (error) {
    console.log(error);

    return {
      status: "ERROR",
      message: "Failed to get user details",
      error: codeMessageError.PATH_MESSAGE_ERROR.INTERNAL_SERVER_ERROR,
    };
  }
};
//update detail user
const updateUser = async (data) => {
  try {
    if (!data.id) {
      return {
        status: "ERROR",
        message: "Users ID is required",
      };
    }
    let user = await db.Users.findOne({ where: { id: data.id } });
    if (!user) {
      return {
        status: "ERROR",
        message: "Users not found",
      };
    }
    // required fields for update user
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "isActive",
      "geo_level_1_id",
      "geo_level_2_id",
      "geo_level_3_id",
      "geo_version",
      "roleKey",
      // "positionKey",
      "genderKey",
    ];

    //check missing fields
    const missingField = [];
    for (const item of requiredFields) {
      const value = data[item];
      if (value === undefined || value === null || value === "") {
        missingField.push(item);
      }
    }
    if (missingField.length > 0) {
      return {
        status: "ERROR",
        message: `Missing required fields: ${missingField.join(", ")}`,
      };
    }

    //update user
    await db.Users.update(data, { where: { id: data.id } });
    return {
      status: "SUCCESS",
      message: "Users updated successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "ERROR",
      message: "Failed to update user",
      error: codeMessageError.PATH_MESSAGE_ERROR.INTERNAL_SERVER_ERROR,
    };
  }
};

//delete user
const deleteUser = async (id) => {
  try {
    console.log(id);
    // return;
    if (!id) {
      return {
        status: "ERROR",
        message: "Users ID is required",
      };
    }
    const user = await db.Users.findOne({ where: { id } });
    if (!user) {
      return {
        status: "ERROR",
        message: "Users not found",
      };
    }
    await db.Users.destroy({ where: { id } });
    return {
      status: "SUCCESS",
      message: "Users deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "ERROR",
      message: "Failed to delete user",
      error: codeMessageError.PATH_MESSAGE_ERROR.INTERNAL_SERVER_ERROR,
    };
  }
};

//login
const loginUser = async (data) => {
  try {
    if (!data.email || !data.password) {
      return {
        status: "ERROR",
        code: 400,
        error: codeMessageError.PATH_MESSAGE_ERROR.REQUIRE_CREDENTIALS,
      };
    }
    const user = await db.Users.findOne({ where: { email: data.email } });
    let count = 0;
    //check user exists
    if (!user) {
      return {
        status: "ERROR",
        code: 400,
        error: codeMessageError.PATH_MESSAGE_ERROR.INVALID_CREDENTIALS,
      };
    }
    //check password
    let checkPassword = await bcrypt.compare(data?.password, user?.password);
    if (!checkPassword) {
      count++;
      if (count >= 5) {
        user.isActive = false;
        await user.save();
      }
      return {
        status: "ERROR",
        code: 400,
        error: codeMessageError.PATH_MESSAGE_ERROR.INVALID_CREDENTIALS,
      };
    }

    if (user.isActive === false) {
      return {
        status: "ERROR",
        code: 403,
        error: codeMessageError.PATH_MESSAGE_ERROR.USER_DEACTIVATED,
      };
    }
    const access_token = await generateAccessToken({
      id: user.id,
      email: user.email,
      roleKey: user.roleKey,
    });
    const refresh_token = await generateRefreshToken({
      id: user.id,
      email: user.email,
      roleKey: user.roleKey,
    });
    return {
      status: "SUCCESS",
      code: 200,
      message: codeMessageError.PATH_MESSAGE_ERROR.LOGIN_SUCCESS.message,
      access_token,
      refresh_token,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "ERROR",
      // message: "Failed to login user",
      code: 500,
      error: codeMessageError.PATH_MESSAGE_ERROR.INTERNAL_SERVER_ERROR,
    };
  }
};

module.exports = {
  createUser,
  getListUsers,
  getDetailUser,
  updateUser,
  deleteUser,

  loginUser,
};
