import { requireUserId } from '~/utils/auth.server'
import type { LoaderFunction } from '@remix-run/node';
import { UserPanel } from '~/components/user-panel'
import { Layout } from '~/components/layout';
import { getOtherUsers } from '~/utils/user.server';
import { json } from 'express';

export const loader: LoaderFunction = async ({ request }) => {
    const userId = await requireUserId(request)
    await userId(request);
  const users = await getOtherUsers(userId)
  return json({users})
}


export default function Home(){
    return <Layout>
        <div className='h-full flex'>
            <UserPanel />
        </div>
    </Layout>
}