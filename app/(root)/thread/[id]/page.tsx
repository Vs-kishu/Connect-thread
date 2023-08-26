import ThreadCard from "@/components/cards/ThreadCard"
import Comment from "@/components/forms/Comment"
import { fetchThreadById } from "@/lib/actions/thread.actions"
import { fetchUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/dist/server/api-utils"

const Page = async({params}:{params:{id:string}})=>{
    const user= await currentUser()
    if(!params.id) return null
    if(!user) return null

    const userInfo = await fetchUser(user.id)
    if(!userInfo?.onboarded) {
        redirect('/onboarding')
        return
    }

    const thread= await fetchThreadById(params.id)

  return  (
  <section className="relative">
        <div>
              <ThreadCard
               key={thread._id}
               id={thread._id}
               curentUserId={user?.id || ""}
               parentId={thread.parentId}
               content={thread.text}
               author={thread.author}
               createdAt={thread.createdAt}
               comments={thread.children}
               commmunity={thread.community}
               />
        </div>
        <div className="mt-7">
            <Comment
               threadId={thread.id}
               currentUserId={JSON.stringify(userInfo._id)}
               currentUserImg={userInfo.image}
               />
        </div>
        <div className="mt-10">
        {thread.children.map((childItem:any)=>
         <ThreadCard
               key={childItem._id}
               id={childItem._id}
               curentUserId={childItem?.id || ""}
               parentId={childItem.parentId}
               content={childItem.text}
               author={childItem.author}
               createdAt={childItem.createdAt}
               comments={childItem.children}
               commmunity={childItem.community}
               isComment
               />
        )}

        </div>

    </section>
  )
}

export default Page