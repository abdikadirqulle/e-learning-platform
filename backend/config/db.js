import mongoose from "mongoose";
import { dbURL } from "./config.js";
import chalk from "chalk";
import { PrismaClient } from '@prisma/client';

import { PrismaClientInitializationError } from "@prisma/client/runtime/library"; 

export const prisma = new PrismaClient()

export const connectDB = async () => {
    try {
      await prisma.$connect();
      console.log(`Connected to the database: ${chalk.green.bold(dbURL)}`);
    } catch (error) {
        if (error instanceof PrismaClientInitializationError) {
            console.error("Failed to initialize Prisma Client:", error.message);
            }else{
                console.error(`Error connecting to the database: ${chalk.red(error)}`);
            }
      process.exit(1);
    }
  };