import TYPES from "../types/types";

const initialState = {
    fleets: [],
    levels: [],
    parameters: [],
    operators: [],
    conditions: [],
    condition: null
}

export const ConditionReducer = (state = initialState, action) => {

    switch (action.type) {
        case TYPES.getFleets:
            return {
                ...state,
                fleets: action.payload
            }
        case TYPES.getLevels:
            return {
                ...state,
                levels: action.payload
            }
        case TYPES.getallParameters:
            return {
                ...state,
                parameters: action.payload
            }
        case TYPES.getOperators:
            return {
                ...state,
                operators: action.payload
            }
        case TYPES.getAllConditions:
            return {
                ...state,
                conditions: action.payload
            }
        case TYPES.getConditionByID: {
            return {
                ...state,
                condition: action.payload
            }
        }

        default: return state;
    }
}