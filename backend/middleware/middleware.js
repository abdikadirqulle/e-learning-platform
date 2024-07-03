import { JWT_SECRET } from "../config/config.js";
import jwt from "jsonwebtoken"
import {  prisma } from "../config/db.js";


// Middleware to verify JWT token
// export const Authoriza = (req, res, next) => {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }
  
//     jwt.verify(token, JWT_SECRET, (err, decoded) => {
//       if (err) {
//         return res.status(401).json({ message: 'Unauthorized' });
//       }
//       req.user = decoded;
//       next();
//     });
//   };
  
 export const Authoriza = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'token Unauthorized' });
    }

    try {

        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await prisma.user.findUnique({
          where: { id: decoded.userId },
        });

        if (!user) {
        return res.status(401).json({ message: 'user Unauthorized' });
      }
  
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorizeds', error });
    }
  };