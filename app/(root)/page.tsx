import ThreadCard from "@/components/cards/ThreadCard"
import { fetchPosts } from "@/lib/actions/thread.actions"
import { currentUser } from "@clerk/nextjs"
 
export default async function Home() {
  const user=currentUser()
  const result= await fetchPosts(1,30)
  return (
    <>
        <h1 className="head-text">Home</h1>
<section className="mt-9 flex flex-col gap-10 ">
  {result.posts.length === 0 ?(
    <p className="no-result">No threads yet!</p>
  ):(
    <>
    {result.posts.map((post)=>(

    <ThreadCard
    key={post._id}
    id={post._id}
    curentUserId={user?.id || ""}
    parentId={post.parentId}
    content={post.text}
    author={post.author}
    createdAt={post.createdAt}
    comments={post.children}
    commmunity={post.community}


    />

    ))}
    </>
  )}
</section>
    </>
  )
}