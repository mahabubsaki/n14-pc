import envConfig from "@/configs/env.configs";
import mongoose from "mongoose";

process.on("uncaughtException", (error) => {

    process.exit(1);
});
async function dbConnect() {

    try {
        await mongoose.connect(envConfig.dbUri, {
            connectTimeoutMS: 6000000,
        });
    } catch (err) {

    }
    process.on('unhandledRejection', (error) => {
        process.exit(1);
    });
}

process.on("SIGTERM", () => {
    process.exit(1);
});


export default dbConnect;