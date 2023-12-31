'use server'

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Thread from "../models/thread.models";
import { FilterQuery, SortOrder } from "mongoose";

interface Params{
    userId:string,
    username:string,
    name:string,
    bio:string,
    image:string,
    path:string
}
export async function updateUser({
    userId,
    username,
    name,
    bio,
    image,
    path,
}:Params ):Promise<void>{
    connectToDB();
    try {
        await User.findOneAndUpdate(
        {id:userId},
        {
        username:username.toLowerCase(),
        name,
        bio,
        image,
        onboarded:true
    },
    {upsert:true}
    )

    if(path === '/profile/edit'){
        revalidatePath(path)
    }
    } catch (error:any) {
        throw new Error(`Failed to create the update user: ${error.message}`)
    }
}


export async function fetchUser(userId:string){
try {
    connectToDB()
    return await User.findOne({id:userId})
    // .populate({
    //     path:'communities',
    //     model:Community
    // })
} catch (error:any) {
    throw new Error(`Failed to fetch user: ${error.message} `)
}
}

export async function fetchUserPosts(userId:string) {
    connectToDB()

    try {
        //find all threads by user authorized
        //todo:populate communities
        const threads= await User.findOne({id:userId}).populate({
            path:'threads',
            model: Thread,
            populate:{
                path:'children',
                model: Thread,
                populate:{
                    path:'author',
                    model:User,
                    select: 'name image id'
                }
            }
        })

        return threads
    } catch (error:any) {
        throw new Error(`error in getting the fetch usr posts ${error.message}`)
    }
    
}

export async function fetchUsers({
    userId,
    searchString="",
    pageNumber=1,
    pageSize=20,
    sortBy="desc"
}:{
    userId:string,
    searchString?:string,
    pageNumber?:number,
    pageSize?:number,
    sortBy?:SortOrder,
}){
    try {
        connectToDB()
        const skipAmount=(pageNumber-1)* pageSize
        const regex= new RegExp(searchString,'i')

        const query: FilterQuery<typeof User> ={
            id:{$ne:userId}//not equal to
        }

        if(searchString.trim() !== ""){
            query.$or=[
            {username:{$regex:regex}},
            {name:{$regex:regex}}]
        }

        //sorting
        const sortOptions = {createdAt : sortBy};
        const userQuery=User.find(query)
        .sort(sortOptions)
        .skip(skipAmount)
        .limit(pageSize);

        const totalUsersAccount= User.countDocuments(query)

        const users=await userQuery.exec()
        const isNext=await totalUsersAccount > skipAmount + users.length;

        return {users,isNext}


    } catch (error:any) {
        throw new Error(`erroring in fetching users ${error.message}`)
    }
}

export async function getActivity(userId:string){
    try {
        connectToDB()

        const userThreads=await Thread.find({author:userId})

        //collect all th child thread ids (replies) from the children

        const childThreadIds=userThreads.reduce((acc,userThread)=>{
            return acc.concat(userThread.children)
        },[])
        const replies = await Thread.find({
            _id:{ $in:childThreadIds },
            author:{$ne:userId}
        }).populate({
            path:'author',
            model: User,
            select:'name image _id'
        })

        return replies

    } catch (error:any) {
        throw new Error (`Faileed to get ectivities ${error.message}`)
    }
}