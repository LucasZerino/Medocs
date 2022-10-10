import {
    HiOutlineViewGrid,
    HiDocumentDuplicate,
    HiOutlineUsers,
    HiOutlineCog
} from 'react-icons/hi'

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