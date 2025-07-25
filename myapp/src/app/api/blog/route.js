import { NextResponse } from "next/server";
import { ConnectDB } from "../../../../lib/config/db";
import { writeFile } from "fs/promises";
import BlogModel from "../../../../lib/models/BlogModel";
const fs = require("fs");

const loadDB = async () => {
    await ConnectDB();
}

loadDB();

// api endpoint to get all blogs
export async function GET(request) {
    // console.log("api hit");
    // return NextResponse.json({ msg: "api working" })
    const blogId = request.nextUrl.searchParams.get("id");
    if (blogId) {
        const blog = await BlogModel.findById(blogId);
        return NextResponse.json(blog);
    } else {
        const blogs = await BlogModel.find({});
        return NextResponse.json({ blogs });
    }

}

// api endpoint for uploading blogs
export async function POST(request) {
    const formData = await request.formData();
    const timestamp = Date.now();

    const image = formData.get('image');
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path, buffer);

    const imgUrl = `/${timestamp}_${image.name}`;
    // console.log(imgUrl);
    const blogData = {
        title: `${formData.get('title')}`,
        description: `${formData.get('description')}`,
        category: `${formData.get('category')}`,
        author: `${formData.get('author')}`,
        image: `${imgUrl}`,
        authorImg: `${formData.get('authorImg')}`
    }

    await BlogModel.create(blogData);
    console.log("Blog saved");
    return NextResponse.json({ success: true, msg: "Blog added" });
}

//createing api endpoint to delete blog
export async function DELETE(request) {
    const id = await request.nextUrl.searchParams.get("id");
    const blog = await BlogModel.findById(id);
    fs.unlink(`./public${blog.image}`, () => { });
    await BlogModel.findByIdAndDelete(id);
    return NextResponse.json({ msg: "Blog deleted" });
}