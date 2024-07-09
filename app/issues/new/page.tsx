'use client';


import React from 'react'
import { TextField, Button } from '@radix-ui/themes'


import SimpleMDE from "react-simplemde-editor";
import {useForm, Controller} from 'react-hook-form'

import axios from 'axios';

import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';

interface IssueForm{
    title: String;
    description: String;
}



const NewIssuePage = () => {
    const router = useRouter();
    const {register, control, handleSubmit} =useForm<IssueForm>();
    

  return (
<form 
    className='max-w-xl space-y-3' 
    onSubmit={handleSubmit(async (data)=>{
        try {
            await axios.post('/api/issues', data);
            router.push('/issues');
        } catch (error) {
            console.log(error);
        }
       
    })}>
        <TextField.Root placeholder ="Title" {...register('title')}>
            <TextField.Slot />
        </TextField.Root>
        <Controller
        name="description" 
        control= {control}
        render={({ field })=><SimpleMDE placeholder='Enter you description' {...field}/> }
        />    
        <Button>Submit New Issue</Button>
    </form>
  )
}

export default NewIssuePage
