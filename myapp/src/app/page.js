'use client'
// import BlogItems from "@/Components/BlogItems";
import BlogList from "@/Components/BlogList";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <>
      <ToastContainer theme="dark" />
      <Header />
      <BlogList />
      <Footer />
    </>
  );
}
