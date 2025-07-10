import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

async function jwtMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({
            "Error": "Missing token."
        });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const existingUser = await prisma.user.findUnique({
            where: { id: decodedToken.userId }
        });

        if (!existingUser) {
            return res.status(4004).json({
                "Error": "User not found."
            });
        }

        req.user = existingUser;
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({ "Error": "Invalid token." })
    }

}

function cleanupUser(user) {
    const { password, ...rest } = user;
    return rest;
}

export { prisma, jwtMiddleware, cleanupUser };