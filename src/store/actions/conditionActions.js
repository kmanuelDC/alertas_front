import CONSTANTES from "../../constants/constants"
import { consumerRestApi } from "../../consumer/consumer";
import TYPES from "../types/types";


export const getFleets = () => {
    return async (dispatch) => {
        const { data } = await consumerRestApi(CONSTANTES.APIS.FLEETS, CONSTANTES.HTTP.GET);
        // console.log(data)
        dispatch({ type: TYPES.getFleets, payload: data })
    }
}


export const getLevels = () => {
    return async (dispatch) => {
        const { data } = await consumerRestApi(CONSTANTES.APIS.LEVELS, CONSTANTES.HTTP.GET);
        dispatch({ type: TYPES.getLevels, payload: data })
    }
}

export const getAllParameters = () => {
    return async (dispatch) => {
        const { data } = await consumerRestApi(CONSTANTES.APIS.PARAMETERS, CONSTANTES.HTTP.GET);
        dispatch({ type: TYPES.getallParameters, payload: data })
    }
}

export const getOperators = () => {
    return async (dispatch) => {
        const { data } = await consumerRestApi(CONSTANTES.APIS.OPERATORS, CONSTANTES.HTTP.GET);
        dispatch({ type: TYPES.getOperators, payload: data })
    }
}


export const saveNewRuleConditions = (newRuleCondition, setOpen) => {
    return async (dispatch) => {
        // console.log('exec',newRuleCondition)
        const { data } = await consumerRestApi(CONSTANTES.APIS.NEWRULECONDITION, CONSTANTES.HTTP.POST, { newrule: newRuleCondition });
        if(data){
            setOpen({ message: 'Nueva Condicion Guardada Correctamennte', value: true, success: true })
        }else{
            setOpen({ message: 'Error al guardar ', value: true, success: false })
        }
        // console.log(data)
        // dispatch({ type: TYPES.getOperators, payload: data })
    }
}

