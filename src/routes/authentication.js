const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();

const router = express.Router();
const users = []

router.post("/register", (req, res) => {
    const { username, password } = req.body;
    // Find the user with the given username
    const existingUser = users.find(u => u.username === username);
    if(existingUser) {
        return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);   
    const newUser = {
        id: users.length + 1,
        username,
        password: hashedPassword
    };
    users.push(newUser);
    res.status(201).json({id: newUser.id,username: newUser.username});
});

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    // Find the user with the given username
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.status(200).json({ token });
});
module.exports = router;
