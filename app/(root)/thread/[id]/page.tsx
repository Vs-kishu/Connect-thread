import ThreadCard from "@/components/cards/ThreadCard"
import { fetchThreadById } from "@/lib/actions/thread.actions"
import { fetchUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/dist/server/api-utils"

const Page = async({params}:{params:{id:string}})=>{
    const user= await currentUser()
    if(!params.id) return null
    if(!user) return null

    const userInfo = await fetchUser(user.id)
    if(!userInfo?.onboarded) redirect('/onboarding')

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
    </section>
  )
}

export default Page