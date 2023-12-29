import express from "express";
import { register, login, logout, updateUser, addImage } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/", login);
router.post("/logout", logout);
router.put("/:id", updateUser);
router.put("/addimage/:id", addImage);

export default router;