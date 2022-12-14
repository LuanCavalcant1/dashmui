
import { BrowserRouter } from 'react-router-dom';
import './shared/forms/TraducoesYup';
import { AppRoutes } from './routes';
import { MenuLateral } from './shared/components';
import { DrawerProvider } from './shared/contexts';
import { AppThemeProvider } from './shared/contexts/ThemeContetxt';




export const App = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>

          <MenuLateral>
            <AppRoutes />
          </MenuLateral>

        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
};

