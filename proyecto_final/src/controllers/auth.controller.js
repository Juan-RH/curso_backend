import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../models/user.js";

export const register = async (req, res) => {
    try {
        const { email, password } = req.body ?? {};

        if (!email || !password) return res.status(422).json({ error: "Email and password are required" });

        if (await findUserByEmail(email)) return res.status(409).json({ message: "Email already used" });

        const pwHash = await bcrypt.hash(password, 10);
        const newUser = await createUser(email, pwHash);

        if (!newUser) return res.status(500).end();

        return res.status(201).json({ id: newUser.id, email: newUser.email });
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body ?? {};
    if (!email || !password) return res.status(422).json({ error: "Email and password are required" });

    const user = await findUserByEmail(email);
    if(!user) return res.status(401).json({ message: "Email or password are invalid" });
    
    const valid = await bcrypt.compare(password, user.password);
    if(!valid) return res.status(401).json({ message: "Email or password are invalid" });

    const token = jwt.sign(
        {id: user.id, email: user.email},
        process.env.JWT_SECRET,
        {expiresIn:"1h"}
    );
    return res.json({token: token})

}