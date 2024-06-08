import mongoose from "mongoose";
import { config } from "../config/config.js";

const Connect = async () => {
  try {
    console.log(config.Database.ConnectUrl);
    mongoose.connect(
      `mongodb+srv://NFTMARKETPLACE:MRafayNFT@cluster0.5wmgrsj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("Database is connected 🎉");
  } catch (error) {
    console.log(error);
  }
};

export { Connect };
