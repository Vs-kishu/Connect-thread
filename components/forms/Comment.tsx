"use client"
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { usePathname } from 'next/navigation'
import { CommentsValidation } from '@/lib/validations/thread'
import Image from 'next/image'
import { addCommentToThread } from '@/lib/actions/thread.actions'
// import { createThread } from '@/lib/actions/thread.actions'

interface props{
    threadId:string,
    currentUserImg:string,
    currentUserId:string
}
const Comment = ({threadId,currentUserImg,currentUserId}:props) => {

    const pathname=usePathname()

    const form = useForm({
    resolver: zodResolver(CommentsValidation),
    defaultValues: {
      thread:"",
    },
  });

  const onSubmit=async(values:z.infer<typeof CommentsValidation>)=>{
    await addCommentToThread(threadId,values.thread,JSON.parse(currentUserId),pathname)
    form.reset()
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">

         <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className='flex items-center w-full gap-3  '>
              <FormLabel>
                <Image 
                src={currentUserImg}
                alt='profile image'
                width={45}
                height={45}
                className='rounded-full object-contain '
                />
              </FormLabel>
              <FormControl className='border-none bg-transparent'>
                <Input 
                type='text'
                placeholder='commmnets...'
                className='no-foccus text-light-1 outline-none'
                {...field} />
            
              </FormControl>              
            </FormItem>
          )}
        />
        <Button type='submit' className='comment-form_btn'>Reply</Button>
        </form>
        </Form>
  )
}

export default Comment
