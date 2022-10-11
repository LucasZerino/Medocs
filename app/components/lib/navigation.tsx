import {
    HiOutlineViewGrid,
    HiDocumentDuplicate,
    HiOutlineUsers,
    HiOutlineCog,
    HiNewspaper
} from 'react-icons/hi'

import {
    BsFillFileArrowDownFill
} from "react-icons/bs";

export const DASHBOARD_SIDEBAR_LINKS = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: "/home",
        icon: <HiOutlineViewGrid />
    },
    {
        key: 'products',
        label: 'Documentos',
        path: "/products",
        icon: <HiDocumentDuplicate />
    },
    {
        key: 'users',
        label: 'Usuários',
        path: "/users",
        icon: <HiOutlineUsers />
    },
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
        key: 'settings',
        label: 'Configurações',
        path: "/settings",
        icon: <HiOutlineCog />
    },
]

export const DASHBOARD_DOCS_LINKS = [
    {
        key: 'novo documento',
        label: 'Novo documento',
        path: "/createDocs",
        icon: <HiNewspaper />
    },
]

export const DASHBOARD_DOCS_FUNCTIONS = [
    {
        key: 'downloadTemplate',
        label: 'Baixar Template',
        functi: "onGeneratePDF",
        path: "/createDocs",
        icon: <BsFillFileArrowDownFill />
    },
    
]