import mongoose from "mongoose"


export const dbConnect = async ()=>{
   try { 

    const connect = await mongoose.connect(process.env.DB_URL);
    console.log(`database connected ${connect.connection.host} and ${connect.connection.name}`)
    
   } catch (error) {
      console.log(error);
      process.exit(1);
   }
}