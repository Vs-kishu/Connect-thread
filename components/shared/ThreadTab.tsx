import { fetchUserPosts } from "@/lib/actions/user.actions"
import { redirect } from "next/navigation"
import ThreadCard from "../cards/ThreadCard"

interface props{
    currentUserId:string,
    accountId:string,
    accountType:string
}
const ThreadTab =async ({currentUserId,accountId,accountType}:props) => {
    //Todo: Profile fetc thread
    let result=await fetchUserPosts(accountId)
    if(!result) redirect('/')

  return (
    <section className="mt-9 flex flex-col gap-10">
        {result.threads.map((thread : any)=>(
         <ThreadCard
               key={thread._id}
               id={thread._id}
               curentUserId={currentUserId}
               parentId={thread.parentId}
               content={thread.text}
               author={accountType === 'User'? 
               {name: result.name,
                image:result.image,
                id:result.id
            }:{
                name:thread.author.name,
                image:thread.author.image,
                id:thread.author.id
            }}
               createdAt={thread.createdAt}//todo
               comments={thread.children}
               commmunity={thread.community}
               />
        ))}
    </section>
  )
}

export default ThreadTab
