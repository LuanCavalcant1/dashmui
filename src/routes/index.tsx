import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { Dashboard, DetalheDeCidades, DetalheDePessoas, ListagemDeCidades, ListagemDePessoas } from '../pages';



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
      },      {
        label: 'Cidades',
        icon: 'location_city',
        path: '/cidades'
      },

    ]);
  }, []);


  return (
    <Routes>
      <Route path='/pagina-inicial' element={<Dashboard />} />

      <Route path='/pessoas' element={<ListagemDePessoas />} />
      <Route path='/pessoas/detalhe/:id' element={<DetalheDePessoas/>} />

      
      <Route path='/cidades' element={<ListagemDeCidades />} />
      <Route path='/cidades/detalhe/:id' element={<DetalheDeCidades/>} />

      <Route path='*' element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};