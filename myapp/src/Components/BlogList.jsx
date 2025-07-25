import React, { useEffect, useState } from 'react'
// import { blog_data } from '../../public/assets'
import BlogItems from './BlogItems'
import axios from 'axios';

const BlogList = () => {

    const [menu, setMenu] = useState("All");
    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get("/api/blog");
            setBlogs(response.data.blogs);
            console.log(response.data.blogs);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    }

    useEffect(() => {
        fetchBlogs();
    }, [])

    return (
        <>
            <div className='flex justify-center gap-6 my-10'>
                <button onClick={() => setMenu("All")} className={menu === "All" ? 'bg-black text-white py-1 px-4 rounded-sm' : ""}>All</button>
                <button onClick={() => setMenu("Technology")} className={menu === "Technology" ? 'bg-black text-white py-1 px-4 rounded-sm' : ""}>Technology</button>
                <button onClick={() => setMenu("Startup")} className={menu === "Startup" ? 'bg-black text-white py-1 px-4 rounded-sm' : ""}>Startup</button>
                <button onClick={() => setMenu("Lifestyle")} className={menu === "Lifestyle" ? 'bg-black text-white py-1 px-4 rounded-sm' : ""}>Lifestyle</button>
            </div>

            <div className='flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24'>
                {blogs && blogs.filter((item) => menu === "All" ? true : item.category === menu).map((item, index) => {
                    return <BlogItems key={index} id={item._id} title={item.title} image={item.image} description={item.description} category={item.category} />
                })}
            </div>
        </>
    )
}

export default BlogList
