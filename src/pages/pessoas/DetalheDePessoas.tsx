
import { Form } from '@unform/web';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { FerramentasDeDetalhe } from '../../shared/components';
import { VTextField } from '../../shared/forms';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { PessoasServices } from '../../shared/services/api/pessoas/PessoasServices';


export const DetalheDePessoas: React.FC = () => {
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');

    useEffect(() => {
        if (id !== 'nova') {
            setIsLoading(true);
            PessoasServices.getById(Number(id))
                .then((result) => {
                    setIsLoading(false);
                    if (result instanceof Error) {
                        alert(result.message);
                        navigate('/pessoas');
                    } else {
                        setNome(result.nomeCompleto);
                        console.log(result);
                    }
                });
        }
    }, [id]);

    const handleSave = () => {
        console.log('Save');
    };

    const handleDelete = (id: number) => {
        if (confirm('Realmente deseja apagar?')) {
            PessoasServices.deleteById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        alert('Registro apagado com sucesso');
                        navigate('/pessoas');
                    }
                });
        }
    };


    return (
        <LayoutBaseDePagina
            titulo={id === 'nova' ? 'Nova Pessoa' : nome}
            barraDeFerramentas={
                <FerramentasDeDetalhe
                    textoBotaoNovo='Nova'
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoNovo={id !== 'nova'}
                    mostrarBotaoApagar={id !== 'nova'}

                    aoClicarEmApagar={() => handleDelete(Number(id))}
                    aoClicarEmSalvar={() => { handleSave; }}
                    aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
                    aoClicarEmVoltar={() => navigate('/pessoas')}
                    aoClicarEmSalvarEFechar={() => { handleSave; }}
                />
            }
        >

            <Form onSubmit={(dados) => console.log(dados)}>
                <VTextField
                    name='nomeCompleto'
                />

                <button type='submit'>Submit</button>
            </Form>

        </LayoutBaseDePagina>
    );
}; 