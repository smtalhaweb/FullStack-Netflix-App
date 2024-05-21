import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Controller function for user registration
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(401).json({
        message: "Invalid data",
        success: false,
      });
    }
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create new user
    user = new User({
      username,
      email,
      password,
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    await user.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Controller function for user login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate JWT
    const payload = {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        password: user.password,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//controller function for user logout using cookie

export const logoutUser = async (req, res) => {
  // Set the cookie to an empty value and immediately expire it
  return res
    .status(200)
    .cookie("token", "", { expires: new Date(0), httpOnly: true })
    .json({
      message: "User Logged Out Successfully!",
      success: true,
    });
};

// or without using cookie , removing from local storage
// Controller function for user logout
// export const logoutUser = async (req, res) => {
//   try {
//     // There's no server-side state to invalidate with JWT tokens.
//     // Instead, you'll instruct the client to discard the token.

//     // For example, if you're using local storage in the client-side,
//     // you can clear the token from there.
//     localStorage.removeItem('token');

//     // Respond with a success message
//     res.status(200).json({
//       message: "User Logged Out Successfully!",
//       success: true,
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// };
