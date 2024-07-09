import chalk from "chalk";
import { connectDB, prisma } from "../../config/db.js";
import bcrypt from "bcrypt"
import { JWT_SECRET } from "../../config/config.js";
import jwt from "jsonwebtoken"


export const registerUser =async (req, res) => {

    const {email,name, password, type} = req.body;
    try {
        await connectDB();
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const isUserExists = await prisma.user.findUnique({
            where: {
                email: email,
                
            }
        });
        if(!isUserExists){
            const user = await prisma.user.create({
                data: {
                  name,
                  email,
                  type,
                  password: hashedPassword
                },
              });
           
            res.status(200).json({
                message: "user registered successfully",
                user
            });
            console.log("registered successfully")
        }
        else{
            res.status(400).json({
                message: "user already exists"
            });
        }
    } catch (error) {
        res.send("something went wrong : " + error.message);
    }finally {
        await prisma.$disconnect();
      }
}

export const loginUser = async (req, res) => {

    const {email, password} = req.body;
    try {
        // Find user by email
        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
    
        if (!user) {
            res.status(404).json({message :'User not found'});
        }
    
        // Compare provided password with hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
    
        if (!passwordMatch) {
         res.status(400).json({message : 'Incorrect password'});
        }
    
        // Generate JWT token
        const token = jwt.sign(
          { userId: user.id, name: user.name, email: user.email },
          JWT_SECRET,
          { expiresIn: "1h" }
        );

        res.status(200).json({message :'Login successful!', user, token});
        console.log("LOGIN successfully")

    } catch(error) {
        res.status(400).json({message : 'Login failed:' + error.message});

    } finally {
        await prisma.$disconnect();
      }
}



export const signout = (req, res) => {
    res.clearCookie('access_token').status(200).json('Signout success!');
  };



export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        // Find user by id
        const user = await prisma.user.findUnique({
            where: { id: id },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete user
        await prisma.user.delete({
            where: { id: id },
        });

        res.status(200).json({ message: 'User deleted successfully' });
        console.log("User deleted successfully");
    } catch (error) {
        res.status(400).json({ message: 'User deletion failed: ' + error.message });
    } finally {
        await prisma.$disconnect();
    }
};
