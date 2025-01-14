const db = require("../db.js")
const dotenv = require("dotenv")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const express = require("express")
const pageController = require("../controllers/authController.js")
dotenv.config()
const router = express.Router();

router.get("/signup", pageController.renderSignup)
router.get("/login", pageController.renderLogin)

router.post("/signup", async (req, res) => {
    const { name, phone, email, password } = req.body;

    const query = "SELECT * FROM parents WHERE phone_number=?";
    db.query(query, [phone], async (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: "User with the phone number already exists" });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10); // Ensure you await the hash

            if (!hashedPassword) {
                return res.status(500).json({ message: "Internal server error" });
            }

            const insertQuery = "INSERT INTO parents (name, phone_number, email, password) VALUES (?, ?, ?, ?)";
            db.query(insertQuery, [name, phone, email, hashedPassword], (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ message: "Internal server error" });
                }

                return res.status(201).json({ message: "User created successfully" });
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Error during password hashing" });
        }
    });
});

router.post("/login",async(req,res)=>{
    const {phone,password}=req.body;
    const query="SELECT * FROM parents WHERE phone_number=?";
    db.query(query,[phone],async(err,results)=>{
        if(err){
            console.log(err);
            return res.status(500).json({message:"Internal server error"});
        }else{
            if(results.length===0){
                return res.status(401).json({message:"Invalid phone number or password"});
            }else{
                const user = results[0]
                const hashedPassword=user.password;
                try {
                    const isValid = await bcrypt.compare(password, hashedPassword);
                    if (!isValid) {
                        return res.status(401).json({ message: "Invalid phone number or password" });
                    }else{
                        const secretKey = process.env.SECRET_KEY || "nnwnh35678vnbnmmnbvny8ruakhjavnn";
                        const token = jwt.sign(
                            { id: user.id, name: user.name, phone: user.phone_number, email: user.email },
                            secretKey,
                            { expiresIn: "8h" }
                          );                        return res.status(201).json({message:"Login successful",token:token})
                    }
                }catch(error){
                    console.log(error);
                    return res.status(500).json({ message: "Error during password hashing" });
                }
            }
        }
    })
})

module.exports = router;
