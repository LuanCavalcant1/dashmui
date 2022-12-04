import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { Box } from '@mui/system';
import { DarkTheme, LigthTheme } from '../themes';


interface IThemeContextData {
    themeName: 'ligth' | 'dark'
    toggleTheme: () => void;
}

const ThemeContext = createContext({} as IThemeContextData);

interface IThemeProviderProps {
    children: React.ReactNode
}

export const useAppThemeContext = () => {
    return useContext(ThemeContext);
};


export const AppThemeProvider: React.FC<IThemeProviderProps> = ({ children }) => {

    const [themeName, setThemeName] = useState<'ligth' | 'dark'>('ligth');

    const toggleTheme = useCallback(() => {
        setThemeName(oldThemeName => oldThemeName === 'ligth' ? 'dark' : 'ligth');
    }, []);

    const theme = useMemo(() => {
        if (themeName === 'ligth') return LigthTheme;
        return DarkTheme;
    }, [themeName]);
    return (

        <ThemeContext.Provider value={{ themeName, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <Box width='100vw' height='100vh' bgcolor={theme.palette.background.default}>
                    {children}
                </Box>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

