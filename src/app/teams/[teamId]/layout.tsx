import React, { PropsWithChildren } from 'react';

function Layout({
  params,
  children,
}: PropsWithChildren<{
  params: { teamId: string };
  searchParams?: { [key: string]: string | undefined };
}>) {
  // throw new Error('Error in team layout');
  return (
    <div>
      Team layout {params.teamId}
      {children}
    </div>
  );
}

export default Layout;
