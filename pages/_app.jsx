import Head from "next/head";
import { Inter } from 'next/font/google';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { theme } from '../config/theme';
import '../styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
});

function AppContent({ Component, pageProps }) {
  const { isDark } = useTheme();

  // Dynamically map colors based on light or dark state
  const colorStyles = isDark
    ? {
        '--color-bg-white': '#1E293B', // Card background in dark mode
        '--color-bg-light': '#0F172A', // Main background in dark mode
        '--color-bg-slate-50': '#0F172A',
        '--color-bg-slate-100': '#1E293B',
        
        '--color-border-light': '#334155', // Dark border shades
        '--color-border-medium': '#475569',
        '--color-text-muted': '#94A3B8',
        '--color-slate-500': '#CBD5E1',
        
        '--color-primary': '#3B82F6', // High contrast primary blue for dark UI
        '--color-primary-hover': '#60A5FA',
        '--color-primary-light': '#60A5FA',
        '--color-accent': '#2563EB',
        
        '--color-text-primary': '#FAFAFA',
        '--color-text-secondary': '#E2E8F0',
      }
    : {
        '--color-bg-white': theme.colors.white,
        '--color-bg-light': theme.colors.lightGray,
        '--color-bg-slate-50': theme.colors.slate50,
        '--color-bg-slate-100': theme.colors.slate100,
        
        '--color-border-light': theme.colors.borderLight,
        '--color-border-medium': theme.colors.borderMedium,
        '--color-text-muted': theme.colors.slate400,
        '--color-slate-500': theme.colors.slate500,
        
        '--color-primary': theme.colors.blue600,
        '--color-primary-hover': theme.colors.blue700,
        '--color-primary-light': theme.colors.blue500,
        '--color-accent': theme.colors.blue400,
        
        '--color-text-primary': theme.colors.textPrimary,
        '--color-text-secondary': theme.colors.textSecondary,
      };

  return (
    <div 
      style={colorStyles} 
      className={`${inter.variable} font-sans min-h-screen bg-bg-light text-text-secondary selection:bg-primary/10 selection:text-primary transition-colors duration-300`}
    >
      <Component {...pageProps} />
    </div>
  );
}

export default function App(props) {
  return (
    <>
      <Head>
        <title>Velora Technologies</title>
        <link rel="icon" type="image/png" href="/veloraLogo1.png" />
      </Head>

      <ThemeProvider>
        <AppContent {...props} />
      </ThemeProvider>
    </>
  );
}