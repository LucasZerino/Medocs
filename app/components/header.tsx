import { HiOutlineMenuAlt3, HiSearch } from "react-icons/hi";


export function Header(){
    return<div className="flex bg-white w-full p-0">
       <div className="p-4 flex justify-between w-full">
            <div>
                <HiOutlineMenuAlt3 fontSize={24} className="cursor-pointer" />
            </div>
            <div className="flex items-center gap-2">
                <HiSearch/>
                <input className=" bg-light-50 focus:outline-transparent" placeholder="buscar..."></input>
            </div>
            <div>
                <div className="bg-red-300">

                </div>
            </div>
       </div>
    </div>
}
