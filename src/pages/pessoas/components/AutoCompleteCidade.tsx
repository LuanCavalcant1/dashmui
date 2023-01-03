import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { useField } from '@unform/core';
import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from '../../../shared/hooks';
import { CidadesServices } from '../../../shared/services/api/cidades/CidadesServices';


type TAutoCompleteOption = {
    id: number;
    label: string;
}

interface IAutoCompleteCidadeProps {
    isExternalLoading?: boolean;
}

export const AutoCompleteCidade: React.FC<IAutoCompleteCidadeProps> = ({isExternalLoading = false}) => {
    const {fieldName, registerField, defaultValue, error, clearError} = useField('cidadeId');
    
    const { debounce } = useDebounce();

    const [opcoes, setOpcoes] = useState<TAutoCompleteOption[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [busca, setBusca] = useState('');
    const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue);

    useEffect(()=> {
        registerField({
            name: fieldName,
            getValue: ()=> selectedId,
            setValue: (_, newSelectedId)=> setSelectedId(newSelectedId),
        });
    },[registerField, fieldName, selectedId]);



    useEffect(() => {
        setIsLoading(true);

        debounce(() => {

            CidadesServices.getAll(1, busca)
                .then((result) => {
                    setIsLoading(false);

                    if (result instanceof Error) {
                        // alert(result.message);
                    } else {
                        console.log(result);

                        setOpcoes(result.data.map(cidade => ({ id: cidade.id, label: cidade.nome })));
                    }
                });

        });
    }, [busca]);

    const autoCompleteSelectedOption = useMemo(() => {
        if (!selectedId) return null;

        const selectedOption = opcoes.find(opcao => opcao.id === selectedId);
        if (!selectedId) return null;

        return selectedOption;
    }, [selectedId, opcoes]);


    return (
        <Autocomplete
         openText='Abrir'
         closeText='Fechar'
         noOptionsText='Sem Opções'
         loadingText='Carregando...'

         disablePortal


            options={opcoes}
            loading={isLoading}
            disabled={isExternalLoading}
            value={autoCompleteSelectedOption}
            onInputChange={(_, newValue) => setBusca(newValue)}
            popupIcon={(isExternalLoading || isLoading) ? <CircularProgress size={22} /> : undefined}
            onChange={(_, newValue) => { setSelectedId(newValue?.id); setBusca(''); clearError(); }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label='Cidade'
                    error={!!error}
                    helperText={error}
                />
            )}
        />
    );
};