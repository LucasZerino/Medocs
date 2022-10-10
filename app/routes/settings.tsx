import { requireUserId } from '~/utils/auth.server'
import { LoaderFunction, json } from '@remix-run/node';
import { getOtherUsers } from '~/utils/user.server';
import { Link, useLoaderData } from '@remix-run/react';
import { Dashlayout } from '~/components/dashlayout';
import { DocsPanel } from '~/components/docs-panel';

export const loader: LoaderFunction = async ({ request }) => {
    const userId = await requireUserId(request)
    const users = await getOtherUsers(userId)
    return json ({ users })
}

export default function Settings (){
    const { users } = useLoaderData()
    return <Dashlayout>
        <button>
            Criar novo documento!
        </button>
        <div>
           !Lista de documentos!
           <Link to="../createDocs">Criar documento</Link>
        </div>
    </Dashlayout>
}