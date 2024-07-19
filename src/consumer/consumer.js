import CONFIG from "../config";
import CONSTANTES from "../constants/constants";


export const consumerRestApi = async (api, type, body = null) => {
    // console.log(`${CONFIG.API_ALERTAS}${api}`)
    let response = await fetch(`${CONFIG.API_ALERTAS}${api}`, await setHeaders(type, body))
    return await response.json();
}

async function setHeaders(type, body) {

    switch (type) {
        case CONSTANTES.HTTP.GET:
            return { method: type, headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } };
        case CONSTANTES.HTTP.POST:
            return {
                method: type,
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            };
        case CONSTANTES.HTTP.PUT:
            return {
                method: type,
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            };
        case CONSTANTES.HTTP.DELETE:
            return {
                method: type,
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            };
        default:
            break;
    }
}
