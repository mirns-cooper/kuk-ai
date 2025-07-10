import express from "express";
import cors from "cors";
import { register, login } from "./views/auth.js";
import { saveRecipe, getMyRecipe } from "./views/recipes.js";
import { jwtMiddleware } from "./util.js";
s
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/v1/health", (req, res) => {
    res.json({
        message: "ok"
    });
});

app.post("/api/v1/auth/register", register);
app.post("/api/v1/auth/login", login);

app.post("/api/v1/recipes", jwtMiddleware, saveRecipe);
app.get("/api/v1/recipes", jwtMiddleware, getMyRecipe);

app.listen(PORT, () => {
    console.log("App is running!");
});