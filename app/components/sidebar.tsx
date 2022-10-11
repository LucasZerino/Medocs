import { Link, useLocation } from "@remix-run/react";
import classNames from "classnames";
import { FcCloth } from "react-icons/fc";
import { HiOutlineLogout, HiNewspaper } from 'react-icons/hi'
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_DOCS_LINKS } from "./lib/navigation";

const linkClasses = 'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'
const docClasses = 'items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'


export function Sidebar(){
    return(
        <div className=" h-full flex flex-col bg-neutral-900 w-60 p-3 text-white min-w-[216px]">
            <div className="flex items-center gap-2 py-3">
                <Link to={"/"} className="flex items-center gap-2">
                <FcCloth fontSize={24}/>
                <span className="text-neutral-180 text-lg font-bold">Me<span className="text-orange-400">Docs</span></span>
                </Link>
            </div>
            <div className="flex-1 py-8 flex flex-col gap-0">
                {DASHBOARD_SIDEBAR_LINKS.map((item, index) => {
                    return(
                        <div key={index}>
                            <SidebarLinks key={index} item={item}></SidebarLinks>
                        </div>
                    )
                })}
                {DASHBOARD_DOCS_LINKS.map((item, index) => {
                    return(
                        <div key={index}>
                            <DocsbarLinks key={index} item={item}></DocsbarLinks>
                        </div>
                    )
                })}
            </div>
            <div>
                {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item, index) => {
                    return(
                        <div key={index}>
                            <SidebarLinks key={index} item={item}></SidebarLinks>
                        </div>
                    )
                })}
                <form method="post" action="/logout">
                    <button type="submit" className={classNames(linkClasses, "text-neutral-400 cursor-pointer w-full")}>
                        <HiOutlineLogout fontSize={24}/>
                        Sair
                    </button>
                </form>
            </div>
        </div>
    )
}

function SidebarLinks({ item }: any){

    const {pathname} = useLocation()

    return(
        <Link to={`../${item.path}`} className={classNames(pathname === item.path ? 'bg-neutral-700 text-white' : "text-neutral-400" , 'text-white',linkClasses)}>
            <span className="text-xl">{item.icon}</span>
            {item.label}
        </Link>
    )
}

function DocsbarLinks({ item }: any){

    const {pathname} = useLocation()

    return(
        <Link to={`../${item.path}`} className={classNames(pathname === item.path ? 'bg-neutral-700 text-white flex' : "text-neutral-400 hidden" , 'text-white',docClasses)}>
            <span className="text-xl">{item.icon}</span>
            {item.label}
        </Link>
    )
}

function DocsFunctions({ item }: any){

    const {pathname} = useLocation()

    return(
        <button onClick={item.function} className={classNames(pathname === item.path ? 'bg-neutral-700 text-white flex' : "text-neutral-400 hidden" , 'text-white',docClasses)}>
            <span className="text-xl">{item.icon}</span>
            {item.label}
        </button>
    )
}