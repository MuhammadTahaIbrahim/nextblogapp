"use client"
import React, { useEffect, useState } from 'react'
// import { assets, blog_data } from '../../../../public/assets';
import Image from 'next/image';
import Footer from '@/Components/Footer';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { assets } from '../../../../Assets/assets';
import axios from 'axios';

const page = () => {
    const params = useParams();
    const [data, setData] = useState(null);

    const fetchBlogData = async () => {
        // for (let i = 0; i < blog_data.length; i++) {
        //     if (Number(params.id) === blog_data[i].id) {
        //         setData(blog_data[i]);
        //         console.log(blog_data[i]);
        //         break;
        //     }
        // }
        const response = await axios.get("/api/blog", {
            params: {
                id: params.id
            }
        })
        setData(response.data);
    }

    useEffect(() => {
        fetchBlogData();
    }, [])
    return (data && data ? <>
        <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
            <div className='flex justify-between items-center'>
                <Link href="/">
                    <Image src={assets.logo} alt='logo' width={180} className='w-[130px] sm:w-auto' /></Link>
                <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]'>Get Started <Image src={assets.arrow} alt='' /></button>
            </div>

            <div className='text-center my-24'>
                <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{data.title}</h1>
                <Image src={data.authorImg} alt='author image' width={60} height={60} className='mx-auto mt-6 border border-white rounded-full' />
                <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{data.author}</p>
            </div>
        </div>

        <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
            <Image src={data.image} alt='blog image' width={1280} height={720} className='border-4 border-white' />
            {/* <h1 className='my-8 text-[26px] font-semibold'>Introduction:</h1> */}
            {/* <p>{data.description}</p> */}
            <div className='blog-content' dangerouslySetInnerHTML={{ __html: data.description }}></div>
            {/* <h3 className='my-5 text-[18px] font-semibold'>Step 1: Self:Reflection and goal setting</h3>
            <p className='my-3'>Life, in a biological sense, is a characteristic that distinguishes entities capable of performing biological processes, such as metabolizing, growing, responding to stimuli, and reproducing, from non-living things.</p>
            <p className='my-3'>Life, in a biological sense, is a characteristic that distinguishes entities capable of performing biological processes, such as metabolizing, growing, responding to stimuli, and reproducing, from non-living things.</p>

            <h3 className='my-5 text-[18px] font-semibold'>Step 2: Self:Reflection and goal setting</h3>
            <p className='my-3'>Life, in a biological sense, is a characteristic that distinguishes entities capable of performing biological processes, such as metabolizing, growing, responding to stimuli, and reproducing, from non-living things.</p>
            <p className='my-3'>Life, in a biological sense, is a characteristic that distinguishes entities capable of performing biological processes, such as metabolizing, growing, responding to stimuli, and reproducing, from non-living things.</p>

            <h3 className='my-5 text-[18px] font-semibold'>Step 3: Self:Reflection and goal setting</h3>
            <p className='my-3'>Life, in a biological sense, is a characteristic that distinguishes entities capable of performing biological processes, such as metabolizing, growing, responding to stimuli, and reproducing, from non-living things.</p>
            <p className='my-3'>Life, in a biological sense, is a characteristic that distinguishes entities capable of performing biological processes, such as metabolizing, growing, responding to stimuli, and reproducing, from non-living things.</p>

            <h3 className='my-5 text-[18px] font-semibold'>Conclusion:</h3>
            <p className='my-3'>For those unfamiliar, the term “lifestyle” refers to those engaged in ethically non-monogamous relationships. It's been fun navigating our feelings, opening communication to levels we didn't know existed, and sharing experiences together we didn't think possible.</p> */}

            <div className='my-24'>
                <p className='text-black font font-semibold my-4'>Share this article on social media</p>
                <div className='flex'>
                    <Image src={assets.facebook_icon} alt='fb icon' width={50} />
                    <Image src={assets.twitter_icon} alt='twtr icon' width={50} />
                    <Image src={assets.googleplus_icon} alt='google icon' width={50} />
                </div>
            </div>
        </div>
        <Footer />
    </> : <></>
    )
}

export default page
