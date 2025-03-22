import mongoose from "mongoose";

export async function dbconnect() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MongoDb connection string error");
    }
    const db=console.log(process.env.MONGODB_URI!);
    
    await mongoose.connect(`${process.env.MONGODB_URI!}/${process.env.MYDBNAME!}`);

    const mydbconnectionDetails = mongoose.connection;

    mydbconnectionDetails.on("connected", () => {
      console.log("Connection Established");
    });

  } catch (error) {
    console.log("Error while connecting to Db ", error);
    // process.exit(1);
  }
}
