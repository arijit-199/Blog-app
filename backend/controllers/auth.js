import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {

    // CHECK EXISTING USER
    const q = "SELECT * FROM users WHERE email = ?"
    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.json(err);
        if (data.length) return res.status(409).json("User already exists!");

        // Hash the password & create a user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)

        const q = "INSERT INTO users(`fullName`, `email`, `password`) VALUES (?)"
        const values = [
            req.body.fullName,
            req.body.email,
            hash,
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json("User has been created successfully.")
        });
    });
};

export const login = (req, res) => {

    // CHECH USER
    const q = "SELECT * FROM users WHERE email = ?";

    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        //Check password
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
        if (!isPasswordCorrect)
            return res.status(400).json("Wrong email or password!");

        const token = jwt.sign({ id: data[0].id }, "jwtkey");
        const { password, ...other } = data[0];

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(other);
    });

};

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has been logged out.");
};

export const updateUser = (req, res) => {
    const q = "UPDATE users SET `fullName`=?, `email`=? WHERE `id`=?";

    const values = [
        req.body.fullName, 
        req.body.email,
    ];
    const userId = req.params.id;

    db.query(q, [...values, userId], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.json("User has been updated.");
    })
};

export const addImage = (req, res) => {
    const q = "UPDATE users SET `image`=? WHERE `id`=?";
    const value = [req.body.image];

    const userId = req.params.id;

    db.query(q, [value, userId], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.json("Image has been added."); 
    })
};
