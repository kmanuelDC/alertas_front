import { useState, useEffect } from 'react'
import './style.css'
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { Card, CardContent, Chip, TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/conditionActions'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CheckIcon from '@mui/icons-material/Check';
import { hasNullOrZero } from '../../services/settingsService';
import { NotifyAlert } from '../notification/NotifyComponent';


const conditional_sch = {
    id_parameter: 0,
    parameter: '',
    value: 0,
    symbol: 0
}

const condition_sch = {
    name: ''
    , type_id: 0
    , fleet_id: 0
    , level_id: 0
    , message: ''
    , notify: false
    , critical: false
    , sound: false
    , emails: []
    , logica: {
        rules: [],
        operator: null

    }
}

export const NewCondition = () => {

    const [conditional, setConditional] = useState(conditional_sch)
    const [condition, setCondition] = useState(condition_sch);
    const [logicOperator, setLogicOperator] = useState(null)
    const [email, setEmail] = useState('');
    const [open, setOpen] = useState({ message: '', value: false, success: false });
    const dispatch = useDispatch();
    const { fleets, levels, parameters, operators } = useSelector(state => state.condition)
    const [options, setoptions] = useState([])

    useEffect(() => {
        dispatch(actions.getFleets())
        dispatch(actions.getLevels())
        dispatch(actions.getAllParameters())
        dispatch(actions.getOperators())
    }, [dispatch])

    useEffect(() => {
        setoptions(parameters.map((item) => {
            return {
                label: item[1],
                value: item[0]
            }
        }))
    }, [parameters])

    const handleForm = (target) => {
        switch (target?.name) {
            case 'name':
            case 'fleet_id':
            case 'level_id':
            case 'critical':
            case 'sound':
                setCondition(prev => ({ ...prev, [target.name]: target.value }))
                break;
            case 'emails':
                setCondition(prev => ({ ...prev, [target.name]: [...prev.emails, target.value] }))
                break;
            case 'parameter':
                setConditional(prev => ({ ...prev, 'id_parameter': target.value, 'parameter': target.label }))
                break;
            case 'symbol':
            case 'value':
                setConditional(prev => ({ ...prev, [target.name]: target.value }))
                break;
            case 'logicoperator':
                setLogicOperator(Number(target.value) === 1 ? 2 : 1)
                break;
            default:
                break;
        }
    }

    const saveEmails = () => {
        if (email !== '' && email.toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            handleForm({ name: 'emails', value: email });
            setEmail('');
        } else {
            setOpen({ message: "ERROR EN EMAIL", value: true, success: false })
            // Notificar correo invalido.
        }
    }

    const deleteEmail = (item) => {
        const newList = condition?.emails.filter(x => x !== item);
        setCondition(prev => ({ ...prev, emails: [...newList] }))
    }

    const addNewConditional = () => {
        if (hasNullOrZero(conditional)) return setOpen({ message: 'PORFAVOR COMPLETETE LOS ESPACIOS', value: true, success: false });

        const updateConditionals = (prev) => {
            const newRules = prev.logica.rules.map((x, xi) =>
                xi === prev.logica.rules.length - 1
                    ? { ...x, conditionals: [...x.conditionals, conditional] }
                    : { ...x }
            );
            return { ...prev, logica: { ...prev.logica, rules: newRules } };
        };

        if (condition.logica.rules.length > 0) {
            if (logicOperator) {
                setCondition(prev => updateConditionals(prev));
            } else {
                console.log('por favor seleccione un operador');
                setOpen({ message: 'SELECCIONE UN OPERADOR LOGICO', value: true, success: false })
            }
        } else {
            setCondition(prev => ({
                ...prev,
                logica: { ...prev.logica, rules: [{ conditionals: [conditional] }] }
            }));
        }
        setConditional(conditional_sch);
    };

    const newLevelRule = () => {
        setCondition(prev => ({ ...prev, logica: { ...prev.logica, rules: [...prev.logica.rules, { conditionals: [] }] } }))
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen({ ...open, value: false, message: '' });
    };

    return (<div className="commponent">
        <div className="conditions">
            <div className="content">
                <div className="content-left">
                    <div className='title-condition' style={{ color: '#005a64' }}>CONDICION</div>
                    <div className="form">
                        <label>Nombre de condicion</label>
                        <input onChange={({ target }) => handleForm(target)} value={condition.name} className="input" name='name' />
                    </div>
                    <div className='form'>
                        <label>FLEET</label>
                        <select name='fleet_id' className="select" value={condition.fleet_id} onChange={({ target }) => handleForm(target)} >
                            <option value={0} disabled>SELECCIONE</option>
                            {fleets?.map((x, i) => {
                                return (<option value={x[0]} key={`op-${i}`}>{x[1]}</option>)
                            })}
                        </select>
                    </div>
                    <div className='form'>
                        <label>NIVEL</label>
                        <select name='level_id' className="select" value={condition.level_id} onChange={({ target }) => handleForm(target)} >
                            <option value={0} disabled>SELECCIONE</option>
                            {levels?.map((x, i) => {
                                return (<option value={x[0]} key={`op-${i}`}>{x[1]}</option>)
                            })}
                        </select>
                    </div>
                    <div style={{ 'display': 'flex', justifyContent: 'center' }}>
                        <div style={{ 'display': 'flex' }}>
                            <label>CRITICO</label>
                            <div>
                                <Checkbox
                                    checked={condition.critical === undefined ? false : condition.critical}
                                    onChange={({ target }) => handleForm({ name: 'critical', value: !condition.critical })}
                                    value={condition.critical}
                                    name='critical'
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </div>
                        </div>
                        <div style={{ 'display': 'flex' }}>
                            <label>SONIDO</label>
                            <div>
                                <Checkbox
                                    checked={condition.sound === undefined ? false : condition.sound}
                                    onChange={({ target }) => handleForm({ name: 'sound', value: !condition.sound })}
                                    value={condition.sound}
                                    name='sound'
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form">
                        <Stack direction="row" spacing={3}>
                            <div style={{ "width": "90%" }}>
                                <label>EMAILS</label>
                                <input onChange={({ target }) => setEmail(target.value)} type={'email'} value={email} className="input" name='email' />
                            </div>
                            <Button onClick={saveEmails} variant="contained" style={{ backgroundColor: '#055a82', marginTop: '20px', height: '30px', width: '30px' }}>ADD</Button>
                        </Stack>
                    </div>
                    <div className="form" style={{ margin: "0px 20px 5px 10px" }}>
                        {condition.emails?.length !== 0 ?
                            <>
                                {
                                    condition?.emails?.map((value, index) => (<div className="email-item" key={index} style={{ marginBottom: '2px' }}>
                                        <div className="text" style={{ margin: "5px 20px 5px 10px", width: '80%' }}>
                                            <div className="margin-text">{value}</div>
                                        </div>
                                        <div className="button-delete"  >
                                            <div className="circle" style={{ margin: "5px 0px 5px 0px", width: '20%' }} onClick={() => deleteEmail(value)}>X</div>
                                        </div>
                                    </div>))
                                }
                            </> : <></>}
                    </div>
                </div>
                <div className="content-rigth">
                    <div className='cabeceras'>
                        <div className='content'>
                            <div className='tittle-rules'>PARAMETER</div>
                            <div className='parameters'>
                                <Autocomplete
                                    className="autocomplete-input"
                                    name='parameter'
                                    options={options}
                                    size="small"
                                    id="free-solo-with-text-demo"
                                    sx={{ width: 50 }}
                                    value={conditional?.id_parameter === 0 ? '' : conditional?.parameter}
                                    onChange={(e, newvalue) => { handleForm({ ...newvalue, name: 'parameter' }) }}
                                    renderInput={(params) => <TextField style={{ width: 200 }} {...params} label="PARAMETER" />}
                                />
                            </div>
                        </div>
                        <div className='content'>
                            <div className='tittle-rules'>OPERATOR</div>
                            <div className='parameters'>
                                <FormControl style={{ minWidth: '200px', minHeight: '40px' }}>
                                    <InputLabel id="demo-simple-select-label">simbol</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={conditional.symbol}
                                        label="Age"
                                        name='symbol'
                                        onChange={(e) => { handleForm(e.target) }}
                                    >
                                        <MenuItem disabled value={0}>Select</MenuItem>
                                        {operators.map(op => {
                                            return (
                                                <MenuItem value={op[0]}>{op[2]}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>

                            </div>
                        </div>

                        <div className='content'>
                            <div className='tittle-rules'>VALUE</div>
                            <div className='value'>
                                <TextField type='number' className='value-rules' id="outlined-basic" label="Value" variant="outlined" name='value' value={conditional.value} onChange={(e) => handleForm(e.target)} />
                            </div>
                        </div>
                        <div className='content'>
                            <div className='tittle-rules'>SAVE</div>
                            <div className='button'>
                                <Button onClick={addNewConditional} variant="contained" color="success">
                                    <CheckIcon />
                                </Button>
                            </div>
                        </div>

                    </div>

                    <div className='body-conditions'>
                        <div className='tittle-rules'>FORMULACION</div>
                        {
                            condition.logica.rules.length > 0 ? condition.logica.rules.map((rule, ri) => (
                                <>
                                    <Card sx={{ background: 'white', borderRadius: '1em', marginBottom: '.5em', marginTop: '.5em' }}>
                                        <CardContent>
                                            <Stack direction="row" spacing={1}>
                                                <div className="row" style={{ width: '80%', display: 'flex' }}>
                                                    {rule?.conditionals?.map((conditional, ci) => (
                                                        <>
                                                            <Chip label={conditional.parameter + ' ' + operators.find(x => x[0] === conditional.symbol)[2] + ' ' + conditional.value}></Chip>

                                                            {logicOperator === null ? <select
                                                                defaultValue={0}
                                                                style={{ marginLeft: '.5em', borderRadius: '.5em', backgroundColor: 'rgb(14 14 14)', color: 'white', fontSize: 'bold', width: '100px' }}
                                                                name={'logicoperator'}
                                                                value={logicOperator}
                                                                onChange={(e) => handleForm(e.target)}
                                                            >
                                                                <option value={0} disabled >SELECT</option>
                                                                <option value={1} >AND</option>
                                                                <option value={2} >OR</option>
                                                            </select> : <>{ci === rule.conditionals.length - 1 && rule.conditionals.length > 1 ? <></> :
                                                                <Chip style={{ marginLeft: '.5em', borderRadius: '.5em', backgroundColor: 'rgb(14 14 14)', color: 'white', fontSize: 'bold' }}
                                                                    label={logicOperator === 2 ? 'AND' : 'OR'}></Chip>}</>}
                                                        </>
                                                    ))}
                                                </div>
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                    {logicOperator !== null ? <Button disabled={rule?.conditionals?.length > 1 && ri === condition.logica.rules.length - 1 ? false : true} onClick={newLevelRule}
                                        style={{ marginLeft: '.5em', borderRadius: '.5em', backgroundColor: rule?.conditionals?.length > 1 && ri === condition.logica.rules.length - 1 ? 'rgb(14 14 14)' : 'grey', color: 'white', fontSize: 'bold' }}>
                                        {logicOperator === 1 ? 'AND' : 'OR'}</Button> : <></>}
                                </>
                            )

                            ) : <Card sx={{ background: 'white', borderRadius: '1em', marginBottom: '.5em', marginTop: '.5em' }}>
                                <CardContent>
                                    <Stack direction="row" spacing={1}>
                                        <div className="row" style={{ width: '100%', display: 'flex' }}>
                                        </div>
                                    </Stack>
                                </CardContent>
                            </Card>
                        }
                    </div>
                </div>
                <div className='content-buttons'>
                    <Stack direction="row" spacing={2}>
                    </Stack>
                </div>
            </div>
        </div>
        <NotifyAlert open={open.value} handleClose={handleClose} severity={open.success}>{open.message}</NotifyAlert>
    </div>)
}