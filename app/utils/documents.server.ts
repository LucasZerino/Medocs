import { prisma } from "./prisma.server";
import { DocumentForm } from "./types.server";

export const createDocument = async (document: DocumentForm) => {
    const newdocument = await prisma.document.create({
        data: {
            tittle: document.tittle ,
            documentContent: document.documentContent,
        }
    })

    return { id: newdocument.id, documentName: document.tittle  }
}

export const getOtherdocuments = async (documentId: string) => {
    return await prisma.document.findMany({
        where: {
            id: { not: documentId},
        },
    })
}