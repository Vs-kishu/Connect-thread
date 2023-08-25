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
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import * as z from 'zod'
import { UserValidation } from '@/lib/validations/user'
import Image from 'next/image'
import { ChangeEvent } from 'react'
import { Textarea } from '@/components/ui/textarea'

interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}

const AccountProile = ({user,btnTitle}:Props) => {

     const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo:user.image || "",
      name: user.name || "",
      username: user.username || "",
      bio: user.bio || "",
    },
  });

  const handleImage=(e:ChangeEvent,fieldChange:(value:string) => void) => {
    e.preventDefault();
  }

    function onSubmit(values: z.infer<typeof UserValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-10 justify-start">
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className='flex items-center gap-4 '>
              <FormLabel className='account-form_image-label'>{field.value ? (
                <Image src={field.value} alt='profile photo' width={96}  height={96} priority className='rounded-full object-contain'/>
              ):(
                <Image src='/assets/profile.svg' alt='profile photo' width={24}  height={24}  className=' object-contain'/>
              )}</FormLabel>
              <FormControl className='flex-1 text-base-semibold text-gray-200'>
                <Input type='file' accept='image/'  placeholder="profile photo" className='acccount-form_image-input' 
                onChange={(e)=>handleImage(e,field.onChange)} />
              </FormControl>

            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className='flex flex-col w-full gap-3  '>
              <FormLabel className='text-base-semibold text-light-2'>Name</FormLabel>
              <FormControl>
                <Input 
                type='text'
                className='account-form_input no-focus w-full' 
                {...field} />
              </FormControl>
              
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className='flex flex-col w-full gap-3  '>
              <FormLabel className='text-base-semibold text-light-2 '>UserName</FormLabel>
              <FormControl>
                <Input 
                type='text'
                className='account-form_input no-focus w-full' 
                {...field} />
              </FormControl>
              
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className='flex flex-col w-full gap-3  '>
              <FormLabel className='text-base-semibold text-light-2'>Bio</FormLabel>
              <FormControl >
                <Textarea 
                rows={10}
                className='account-form_input no-focus w-full' 
                {...field} />
              </FormControl>
              
            </FormItem>
          )}
        />
        <Button className='bg-primary-500' type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default AccountProile
