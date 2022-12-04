
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { MenuLateral } from './shared/components';
import { AppThemeProvider } from './shared/contexts/ThemeContetxt';




export const App = () => {
  return (
    <AppThemeProvider>
      <BrowserRouter>

        <MenuLateral />
        <AppRoutes />

      </BrowserRouter>
    </AppThemeProvider>
  );
};

