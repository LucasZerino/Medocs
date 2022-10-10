import { Document } from "@prisma/client"
import { DocumentList } from "./docs-list"

interface props{
    docs: Document[]
}

export function DocsPanel({docs}: props){
    return(
       <div>
         {
            docs.map( doc => <DocumentList doc={doc} key={doc.id} className="h-24 w-24 mx-auto flex-shrink-0"/>)
        }
       </div>
    )
}