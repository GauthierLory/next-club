import React from 'react';
import Account from "@/components/Account";
import { useSession } from '@supabase/auth-helpers-react'


function Index() {

    const session = useSession()
    return (
        <Account session={session}></Account>
    );
}

export default Index;