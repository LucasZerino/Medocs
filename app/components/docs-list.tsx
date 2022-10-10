import { Document } from '@prisma/client'

interface props{
    doc: Document
    className?: string
    onClick?: (...args: any) => any
}

export function DocumentList({doc, onClick, className}: props){
    return(
        <div>
            
        </div>
    )
}