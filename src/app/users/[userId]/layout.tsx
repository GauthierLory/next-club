import React, {PropsWithChildren} from 'react';

function Layout({
                    params,
                    children
                }:
                    PropsWithChildren<{
                        params: { userId: string };
                        searchParams?: { [key: string]: string | undefined };
                    }> ) {
    // throw new Error('Error in team layout');
    return (
        <div>
            User layout {params.userId}
            {children}
        </div>
    );
}

export default Layout;