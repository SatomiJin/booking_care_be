const bcrypt = require("bcrypt");
const { validateRequiredFields } = require("../utils/utils");
const db = require("../models/index.js");
const { get } = require("../routes/userRoute.js");
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
    const existingUser = await db.User.findOne({
      where: { email: data.email },
    });
    if (existingUser) {
      return {
        status: "ERROR",
        code: 409,
        message: "Email already existed",
      };
    }
    //hash password
    const hashedPassword = await hashPassword(data.password);
    //create user
    const newUser = await db.User.create({
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
        message: "User creation failed",
      };
    }

    return {
      status: "SUCCESS",
      code: 200,
      message: "User created successfully",
      id: newUser.id,
    };
    // Simulate user creation logic
  } catch (error) {
    console.log(error);

    return {
      status: "ERROR",
      message: "Failed to create user",
      code: 500,
      error: error.message,
    };
  }
};

//Lấy danh sách thông tin người dùng
const getListUsers = async () => {
  try {
    const users = await db.User.findAll({
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "phoneNumber",
        "isActive",
        // "roleKey",
        // "positionKey",
        // "genderKey",
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
    return {
      status: "ERROR",
      message: "Failed to get list users",
      detail: error.message,
    };
  }
};

const getDetailUser = async (id) => {
  try {
    console.log(id);

    if (!id) {
      return {
        status: "ERROR",
        message: "User ID is required",
        code: 400,
      };
    }
    const user = await db.User.findOne({
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
        message: "User not found",
        code: 404,
      };
    }
    return {
      status: "SUCCESS",
      message: "User details retrieved successfully",
      data: user,
    };
  } catch (error) {
    // console.log(error);

    return {
      status: "ERROR",
      message: "Failed to get user details",
      detail: error.message,
    };
  }
};

module.exports = {
  createUser,
  getListUsers,
  getDetailUser,
};
