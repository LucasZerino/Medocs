import { requireUserId } from '~/utils/auth.server'
import { LoaderFunction, json } from '@remix-run/node';
import { Layout } from '~/components/layout';
import { Link } from '@remix-run/react';
import { getOtherUsers } from '~/utils/user.server';
import { useLoaderData } from '@remix-run/react';
import { UserPanel } from '~/components/user-panel';
import { Dashlayout } from '~/components/dashlayout';
import { Template, BLANK_PDF } from '@pdfme/generator';
import Navigation from '~/components/pdfcomponents/Navigation';
import  Designer  from '../components/pdfcomponents/Designer';
import  FormAndView  from '../components/pdfcomponents/FormAndViewer';


export const loader: LoaderFunction = async ({ request }) => {
    const userId = await requireUserId(request)
    const users = await getOtherUsers(userId)
    return json ({ users })
}

export default function createDocs(){
    return<div>
        <Designer/>
    </div>
}