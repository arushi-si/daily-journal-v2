const userRouter = require("express").Router();
const User = require("../models/user.model");
const argon2 = require("argon2");

/**
 * @route   POST /users
 * @desc    Registers user
 */
userRouter.post("/", async function (req, res) {
  try {
    const { email, password } = req.body;
    const alreadyExists = await User.findOne({ email });
    if (!!alreadyExists)
      return res
        .status(500)
        .json({ message: `User with email[${email}] already exists` });

    // Hash Password

    const hashedPassword = await argon2.hash(password);
    console.log(hashedPassword);

    User.create({
      email,
      password: hashedPassword,
    });
    return res.status(201).json({ user: { email, password: hashedPassword } });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

/**
 * @route   GET /users
 * @desc    Gets a list of users
 */
userRouter.get("/", async function (req, res) {
  try {
    const users = await User.find();
    return res.status(200).send(users);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

/**
 * @route   GET /users/:id
 * @desc    Gets a list of users
 */
userRouter.get("/:id", async function (req, res) {
  const id = req.params.id;
  try {
    const foundUser = await User.findById(id);
    if (!foundUser)
      return res.status(404).json({ message: "User not found", data: null });
    return res.status(200).json({ message: "Found", data: foundUser });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = userRouter;
