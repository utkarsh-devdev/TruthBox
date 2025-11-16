import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import mongoose, { mongo } from "mongoose";

//using aggregation pipeline to fetch messages for the authenticated user

export async function GET(request: Request){
    await dbConnect();
    
    const session = await getServerSession(authOptions);
        const user:User = session?.user as User;
    
        if(!session || !session.user){
            return Response.json({
                success: false,
                message: "Not Authenticated user"
            },{status : 401});
        }
        const userId = new mongoose.Types.ObjectId(user._id);
        try{
            const user = await UserModel.aggregate([
                { $match: { _id: userId } },
                { $unwind : "$messages"   },//opens the messages array and creates a document for each message and its parent user and then we can filter based on that
                { $sort: { "messages.createdAt": -1 } }, // Sort messages by createdAt in descending order
                { $group: {
                    _id: "$_id",
                    messages: { $push: "$messages" }
                }}
            ]);
            if(!user || user.length === 0){
                return Response.json({
                    success: false,
                    message: "User not found"
                },{status : 404});
            }
            return Response.json({
                success: true,
                messages: user[0].messages
            },{status : 200});
        }catch(error){
            console.error("Error fetching messages for user:", error);
            return Response.json({
                success: false,
                message: "Error fetching messages for user"
            },{status : 500});
        }


}