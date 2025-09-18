import { ReactElement } from 'react';
import '../styles/globals.css';
import '../src/index.css';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import { useRouter } from 'next/router';
import ErrorBoundary from '../src/components/ErrorBoundary';

// Dynamically import ChatWidget with SSR disabled
const ChatWidget = dynamic(
  () => import('../src/components/ChatWidget'),
  { ssr: false }
);

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ErrorBoundary>
          {/* {router.pathname !== '/' && <Navbar />} */}
          <Navbar />
          <main>
            <Component {...pageProps} />
          </main>
          <ChatWidget />
          <Footer />
        </ErrorBoundary>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
