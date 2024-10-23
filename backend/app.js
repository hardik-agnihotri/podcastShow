import express from 'express';
import dotenv from "dotenv";
import conn from "./conn/conn.js"
import cookieParser from 'cookie-parser';
import userApi from "./routes/userRoutes.js";
import categoryApi from "./routes/categoryRoutes.js";
import podCastApi from "./routes/podcastRoutes.js"
import cors from "cors"

dotenv.config(); // Load environment variables
conn()

const app = express();
app.use(cors({
    origin: ["http://localhost:5173"], // Your frontend origin (Vite's default port)
    credentials: true, // Allow credentials (cookies) to be included
}));
app.use(express.json());
app.use(cookieParser())
app.use("/uploads", express.static("uploads"))

// routes
app.use('/api/v1/user',userApi)
app.use('/api/v1/category',categoryApi)
app.use('/api/v1/podcast',podCastApi)




// Use environment variable PORT or default to 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
