import user from "../models/user.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"


// Signup Function
export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body; // Use 'username'

        if (!username || !email || !password) {
            return res.status(400).json({ msg: "Please enter all fields" });
        }

        if (username.length < 6) {
            return res.status(400).json({ msg: "Username should be greater than 6 characters" });
        }

        if (password.length < 8) {
            return res.status(400).json({ msg: "Password should be greater than 8 characters" });
        }

        // Check if email or username already exists
        const existingEmail = await User.findOne({ email });
        const existingUsername = await User.findOne({ username });

        if (existingEmail || existingUsername) {
            return res.status(400).json({ msg: "Email or username already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        return res.status(200).json({ msg: "Account created successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server error" });
    }
};

// signin function
// Signin function
export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ msg: "Please enter all fields" });
        }

        // Find user by email
        const existingUser = await User.findOne({ email: email }); // Fix: 'User', not 'user'
        if (!existingUser) {
            return res.status(404).json({ msg: "Please sign-up first" });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Password or email is invalid" });
        }

        // JWT token generation
        const token = jwt.sign(
            { id: existingUser._id, email: existingUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "30d" } // Token valid for 30 days
        );

        // Set cookie for token
        res.cookie("podcasterUserToken", token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax" // 'None' for cross-site cookies
        });

        // Return response
        return res.status(200).json({
            id: existingUser._id,
            username: existingUser.username, // Return username
            email: email,
            msg: "Logged in successfully"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server error" });
    }
};



// logout function
export const logout = async (req, res) => {
    res.clearCookie('podcasterUserToken',{
        httpOnly:true})
    return res.status(200).json({msg: "User logged out"})

}

// cookie check function
// Cookie check function
export const checkCookie = async (req, res) => {
    const token = req.cookies.podcasterUserToken; // Get token from cookies

    if (token) {
        try {
            const verified = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT
            if (verified) {
                return res.status(200).json({ msg: true });
            }
        } catch (error) {
            console.log(error);
            return res.status(401).json({ msg: false, error: "Invalid token" });
        }
    }

    return res.status(200).json({ msg: false });
};


// user details function
// User details function
export const userDetails = async (req, res) => {
    try {
        const { email } = req.user; // Make sure req.user contains the decoded JWT data
        const existingUser = await User.findOne({ email }).select("-password"); // Fetch user details without the password

        if (!existingUser) {
            return res.status(404).json({ msg: "User not found" });
        }

        return res.status(200).json({
            user: existingUser, // Send back user details
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Server error" });
    }
}
