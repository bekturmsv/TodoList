import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const unChangedPassword = req.body.password;
    console.log(unChangedPassword);
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    const hashedPassword = await bcrypt.hash(unChangedPassword, salt);
    console.log(hashedPassword);
    const doc = new User({
      email: req.body.email,
      name: req.body.name,
      password: hashedPassword,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "hash",
      {
        expiresIn: "30d",
      }
    );

    const { password, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось зарегистрироваться!",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return req.status(404).json({
        message: "Пользователь не найден",
      });
    }

    const isPassValid = await bcrypt.compare(
      req.body.password,
      user._doc.password
    );

    if (!isPassValid) {
      return req.status(400).json({
        message: "Неверный логин или пароль",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "hash",
      {
        expiresIn: "30d",
      }
    );

    const { password, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось авторизоваться",
    });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404)({
        message: "Пользователь не найден",
      });
    }

    const { password, ...userData } = user._doc;
    res.json(userData);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Нет доступа",
    });
  }
};
