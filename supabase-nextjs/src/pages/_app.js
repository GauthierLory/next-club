import '../styles/globals.css'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { NextUIProvider} from '@nextui-org/react';
import React, { useState } from 'react'
import { Navbar, Button, Link, Text, Card, Radio, Container } from "@nextui-org/react";
import SiteHeader from "@/components/SiteHeader";

function MyApp({ Component, pageProps }) {
  const [supabase] = useState(() => createBrowserSupabaseClient())

  return <>
      <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
          <SiteHeader></SiteHeader>

          <NextUIProvider>
              <Container>
                  <Component {...pageProps} />
              </Container>
          </NextUIProvider>
      </SessionContextProvider>
  </>
}
export default MyApp