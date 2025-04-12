import mongoose from "mongoose";
import "dotenv/config";

const dbconnect = () => {
  try {
    mongoose
      .connect(`${process.env.MONGO_URL}/AI_Image_DB`)
      .then(() => {
        console.log("database connected!!");
      })
      .catch((error) => {
        console.log("error in connecting in database!", error);
      });
  } catch (error) {
    console.log('database connecting error',error);
  }
};

export {dbconnect}
