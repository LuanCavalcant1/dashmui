import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { Dashboard, ListagemDePessoas } from '../pages';


export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        label: 'Pagina inicial',
        icon: 'home',
        path: '/Página inicial'
      },
      {
        label: 'pessoas',
        icon: 'people',
        path: '/pessoas'
      },

    ]);
  }, []);


  return (
    <Routes>
      <Route path='/pagina-inicial' element={<Dashboard />} />

      <Route path='/pessoas' element={<ListagemDePessoas />} />

      <Route path='*' element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};