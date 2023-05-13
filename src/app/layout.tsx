import { AuthProvider } from '../components/AuthProvider';
// eslint-disable-next-line import/no-unresolved
import Header from '../components/header';
import createClient from '../lib/supabase-server';

import 'src/styles/globals.css';

// do not cache this layout
export const revalidate = 0;

export default async function RootLayout({ children }) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const accessToken = session?.access_token || null;

  return (
    <html lang="en">
      <body>
        <AuthProvider accessToken={accessToken}>
          <Header />
          <div>
            <main>
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
