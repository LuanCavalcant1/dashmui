import { Box, TextField, Button, Paper, useTheme, Icon, } from '@mui/material';

interface IFerramentasDaListagemProps {
    textoDaBusca?: string;
    mostrarInputBusca?: boolean;
    aoMudarTextoDeBusca?: (novoTexto: string) => void;
    textoBotaoNovo?: string;
    mostrarBotaoNovo?: boolean;
    aoClicarEmNovo?: () => void;
}

export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({
    textoDaBusca = '',
    mostrarInputBusca = false,
    aoMudarTextoDeBusca,
    aoClicarEmNovo,
    textoBotaoNovo = 'Novo',
    mostrarBotaoNovo = true
}) => {
    const theme = useTheme();

    return (
        <Box height={theme.spacing(5)} gap={1} marginX={1} paddingX={2} padding={1} display='flex' alignItems='center' component={Paper}>

            {mostrarInputBusca && (
                <TextField
                    value={textoDaBusca}
                    onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
                    size='small'
                    placeholder='Pesquisar...'
                    InputProps={{
                        startAdornment: (<Icon>search</Icon>)
                    }}
                />
            )}

            <Box flex={1} display='flex' justifyContent='end'>
                {mostrarBotaoNovo &&(
                    <Button
                        variant='contained'
                        color='primary'
                        disableElevation
                        endIcon={<Icon>add</Icon>}
                        onClick={aoClicarEmNovo}
                    >
                        {textoBotaoNovo}
                    </Button>
                )}
            </Box>
        </Box>
    );
}; 