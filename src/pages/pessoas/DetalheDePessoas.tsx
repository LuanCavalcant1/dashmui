
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { FerramentasDeDetalhe } from '../../shared/components';
import { VTextField } from '../../shared/forms';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { PessoasServices } from '../../shared/services/api/pessoas/PessoasServices';

interface IFormData {
    email: string
    cidadeId: number
    nomeCompleto: string
}


export const DetalheDePessoas: React.FC = () => {
    const { id = 'nova' } = useParams<'id'>();

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const [nome, setNome] = useState('');

    const formRef = useRef<FormHandles>(null);


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

                        formRef.current?.setData(result);
                    }
                });
        }
    }, [id]);

    const handleSave = (dados: IFormData) => {
        setIsLoading(true);
        if (id === 'nova') {
            PessoasServices.create(dados)
                .then((result) => {
                    setIsLoading(false);
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        navigate(`/pessoas/detalhe/${result}`);
                    }
                });

        } else {

            PessoasServices.updateById(Number(id), { id: Number(id), ...dados })
                .then((result) => {
                    setIsLoading(false);
                    if (result instanceof Error) {
                        alert(result.message);
                    }
                });

        }
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
                    aoClicarEmSalvar={() => { formRef.current?.submitForm(); }}
                    aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
                    aoClicarEmVoltar={() => navigate('/pessoas')}
                    aoClicarEmSalvarEFechar={() => { formRef.current?.submitForm(); }}
                />
            }
        >

            <Form ref={formRef} onSubmit={handleSave}>
                <Box margin={1} display='flex' flexDirection='column' component={Paper} variant='outlined'>

                    <Grid container direction='column' padding={2} spacing={2}>

                        <Grid item>
                            <Typography variant='h6'>Geral</Typography>
                        </Grid>

                        {isLoading && (
                            <Grid item>
                                <LinearProgress variant='indeterminate'></LinearProgress>
                            </Grid>
                        )}

                        <Grid container item direction='row' spacing={2}>

                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField disabled={isLoading} fullWidth label='Nome completo' name='nomeCompleto' onChange={e => setNome(e.target.value)} />
                            </Grid>

                        </Grid>

                        <Grid container item direction='row' spacing={2}>

                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField disabled={isLoading} fullWidth label='Email' name='email' />
                            </Grid>

                        </Grid>

                        <Grid container item direction='row' spacing={2}>

                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField disabled={isLoading} fullWidth label='Cidade' name='cidadeId' />
                            </Grid>

                        </Grid>

                    </Grid>





                </Box>
            </Form>
        </LayoutBaseDePagina>
    );
}; 