import { Box, Button, Divider, Icon, Paper, Skeleton, Typography, useMediaQuery, useTheme } from '@mui/material';



interface IFerramentasDeDetalheProps {
    textoBotaoNovo?: string;

    mostrarBotaoNovo?: boolean;
    mostrarBotaoVoltar?: boolean;
    mostrarBotaoApagar?: boolean;
    mostrarBotaoSalvar?: boolean;
    mostrarBotaoSalvarEFechar?: boolean;

    mostrarBotaoNovoCarregando?: boolean;
    mostrarBotaoVoltarCarregando?: boolean;
    mostrarBotaoApagarCarregando?: boolean;
    mostrarBotaoSalvarCarregando?: boolean;
    mostrarBotaoSalvarEFecharCarregando?: boolean;

    aoClicarEmNovo?: () => void;
    aoClicarEmVoltar?: () => void;
    aoClicarEmApagar?: () => void;
    aoClicarEmSalvar?: () => void;
    aoClicarEmSalvarEFechar?: () => void;
}


export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
    textoBotaoNovo = 'Novo',

    mostrarBotaoNovo = true,
    mostrarBotaoVoltar = true,
    mostrarBotaoApagar = true,
    mostrarBotaoSalvar = true,
    mostrarBotaoSalvarEFechar = false,

    mostrarBotaoNovoCarregando = false,
    mostrarBotaoVoltarCarregando = false,
    mostrarBotaoApagarCarregando = false,
    mostrarBotaoSalvarCarregando = false,
    mostrarBotaoSalvarEFecharCarregando = false,

    aoClicarEmNovo,
    aoClicarEmVoltar,
    aoClicarEmApagar,
    aoClicarEmSalvar,
    aoClicarEmSalvarEFechar
}) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));


    return (
        <Box
            height={theme.spacing(5)}
            gap={1}
            marginX={1}
            paddingX={2}
            padding={1}
            display='flex'
            alignItems='center'
            component={Paper}
        >
            {(mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando) && (<Button
                variant='contained'
                color='primary'
                disableElevation
                startIcon={<Icon>save</Icon>}
                onClick={aoClicarEmSalvar}
            >
                <Typography variant='button' whiteSpace='nowrap' textOverflow='elipsis' overflow='hidden'>
                    Salvar
                </Typography>
            </Button>)}

            {mostrarBotaoSalvarCarregando && (
                <Skeleton width={108} height={50} />
            )}

            {(mostrarBotaoNovo && !mostrarBotaoNovoCarregando && !smDown) && (<Button
                variant='outlined'
                color='primary'
                disableElevation
                startIcon={<Icon>add</Icon>}
                onClick={aoClicarEmNovo}
            >
                <Typography variant='button' whiteSpace='nowrap' textOverflow='elipsis' overflow='hidden'>
                    {textoBotaoNovo}
                </Typography>
            </Button>)}

            {(mostrarBotaoNovoCarregando && !smDown) && (
                <Skeleton width={108} height={50} />
            )}

            {(mostrarBotaoSalvarEFechar && !mostrarBotaoSalvarEFecharCarregando && !smDown && !mdDown) && (<Button
                variant='outlined'
                color='primary'
                disableElevation
                startIcon={<Icon>save</Icon>}
                onClick={aoClicarEmSalvarEFechar}
            >
                <Typography variant='button' whiteSpace='nowrap' textOverflow='elipsis' overflow='hidden'>
                    Salvar e voltar
                </Typography>

            </Button>)}

            {(mostrarBotaoSalvarEFecharCarregando && !smDown && !mdDown) && (
                <Skeleton width={180} height={50} />
            )}

            {(mostrarBotaoApagar && !mostrarBotaoApagarCarregando) && (<Button
                variant='outlined'
                color='primary'
                disableElevation
                startIcon={<Icon>delete</Icon>}
                onClick={aoClicarEmApagar}
            >
                <Typography variant='button' whiteSpace='nowrap' textOverflow='elipsis' overflow='hidden'>
                    Apagar
                </Typography>

            </Button>)}

            {mostrarBotaoApagarCarregando && (
                <Skeleton width={100} height={50} />
            )}

            {(mostrarBotaoVoltar && (mostrarBotaoNovo || mostrarBotaoApagar || mostrarBotaoSalvarEFechar)

            ) && (< Divider variant='middle' orientation='vertical' />
                )
            }

            {(mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando) && (<Button
                variant='outlined'
                color='primary'
                disableElevation
                startIcon={<Icon>arrow_back</Icon>}
                onClick={aoClicarEmVoltar}
            >
                <Typography variant='button' whiteSpace='nowrap' textOverflow='elipsis' overflow='hidden'>
                    Voltar
                </Typography>

            </Button>)}

            {mostrarBotaoVoltarCarregando && (
                <Skeleton width={108} height={50} />
            )}

        </Box>
    );
};