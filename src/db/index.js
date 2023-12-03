import envConfig from "@/configs/env.configs";
import mongoose from "mongoose";

process.on("uncaughtException", (error) => {
    console.log(error);
    process.exit(1);
});
async function dbConnect() {

    try {
        await mongoose.connect(envConfig.dbUri, {
            connectTimeoutMS: 6000000,
        });
    } catch (err) {
        console.log('failed to connect db', err);
    }
    process.on('unhandledRejection', (error) => {
        process.exit(1);
    });
}

process.on("SIGTERM", () => {
    process.exit(1);
});


export default dbConnect;