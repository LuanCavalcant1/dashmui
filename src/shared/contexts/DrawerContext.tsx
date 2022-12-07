import { createContext, useCallback, useContext, useState } from 'react';

interface IDrawerOption {
    icon: string;
    path: string;
    label: string;
}


interface IDrawerContextData {
    isDrawerOpen: boolean;
    drawerOptions: IDrawerOption[];
    toggleDrawerOpen: () => void;
    setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void;
}

const DrawerContext = createContext({} as IDrawerContextData);

interface IThemeProviderProps {
    children: React.ReactNode
}

export const useDrawerContext = () => {
    return useContext(DrawerContext);
};


export const DrawerProvider: React.FC<IThemeProviderProps> = ({ children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([]);

    const toggleDrawerOpen = useCallback(() => {
        setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
    }, []);

    const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOption[]) => {
        setDrawerOptions(newDrawerOptions);
    }, []);

    return (

        <DrawerContext.Provider value={{setDrawerOptions:handleSetDrawerOptions , isDrawerOpen, drawerOptions, toggleDrawerOpen }}>
            {children}
        </DrawerContext.Provider>
    );
};

