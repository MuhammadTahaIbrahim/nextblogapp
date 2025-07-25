import Sidebar from "@/Components/AdminComponents/Sidebar";
import Image from "next/image";
// import { assets } from "../../../public/assets";
import { ToastContainer } from 'react-toastify';
import { assets } from "../../../Assets/assets";

export default function Layout({ children }) {
    return (
        <>
            <div className="flex">
                <ToastContainer theme="dark" />
                <Sidebar />
                <div className="flex flex-col w-full">
                    <div className="flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border-black">
                        <h3 className="font-medium">Admin Panel</h3>
                        <Image src={assets.profile_icon} alt="profile icon" width={40} />
                    </div>
                    {children}
                </div>
            </div>
        </>
    )
}