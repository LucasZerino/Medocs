import { requireUserId } from '~/utils/auth.server'
import { LoaderFunction, json } from '@remix-run/node';
import { Layout } from '~/components/layout';
import { Link } from '@remix-run/react';
import { getOtherUsers } from '~/utils/user.server';
import { useLoaderData } from '@remix-run/react';
import { UserPanel } from '~/components/user-panel';
import { Dashlayout } from '~/components/dashlayout';

export const loader: LoaderFunction = async ({ request }) => {
    const userId = await requireUserId(request)
    const users = await getOtherUsers(userId)
    return json ({ users })
}

export default function Home(){
    const { users } = useLoaderData()
    return <Dashlayout>
        Homepage
    </Dashlayout>
}