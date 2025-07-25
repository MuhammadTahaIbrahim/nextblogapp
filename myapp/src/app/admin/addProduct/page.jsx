"use client"
import Image from 'next/image'
import React, { useState } from 'react'
// import { assets } from '../../../../Assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../../../Assets/assets'

const page = () => {

    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        title: "",
        description: "",
        category: "Startup",
        author: "Alex bennett",
        authorImg: "/profile_icon.png"
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
        console.log(data);
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('author', data.author);
        formData.append('authorImg', data.authorImg);
        formData.append('image', image);

        const response = await axios.post("/api/blog", formData);
        if (response.data.success) {
            toast.success(response.data.msg);
            setImage(false);
            setData({
                title: "",
                description: "",
                category: "Startup",
                author: "Alex bennett",
                authorImg: "/profile_icon.png"
            });
        } else {
            toast.error("error");
        }
    }

    return (
        <>
            <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16' action="">
                <p className='text-xl'>Upload thumbnail</p>
                <label htmlFor="image">
                    <Image src={!image ? assets.upload_area : URL.createObjectURL(image)} alt='' width={140} height={70} className='mt-4' />
                </label>

                <input type="file" id='image' hidden required onChange={(e) => setImage(e.target.files[0])} />

                <p className='text-xl mt-4'>Blog title</p>
                <input name='title' onChange={onChangeHandler} value={data.title} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='type here' required />

                <p className='text-xl mt-4'>Blog Description</p>
                <textarea name='description' onChange={onChangeHandler} value={data.description} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='write content here' rows={6} required />

                <p className='text-xl mt-4'>Blog Category</p>
                <select name="category" onChange={onChangeHandler} value={data.category} className='w-40 mt-4 px-4 py-3 border text-gray-500'>
                    <option value="Startup">Startup</option>
                    <option value="Technology">Technology</option>
                    <option value="Lifestyle">Lifestyle</option>
                </select>
                <br />
                <button type='submit' className='mt-8 w-40 h-12 bg-black text-white'>Add</button>
            </form>
        </>
    )
}

export default page
