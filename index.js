import chalk from "chalk";
import { dbURL } from "./backend/config/config.js";
import server from "./backend/server.js"

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`listening on localhost:${PORT}`);
    console.log(`Connected to the database: ${chalk.green.bold(dbURL)}`);
});