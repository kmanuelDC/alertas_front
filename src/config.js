
import { setURL } from "./services/lanservice"

const ip = window.location.href.split(`/alertas`);

const CONFIG = {
    API_ALERTAS: setURL(process.env.REACT_APP_IP_DEV, ip[0], process.env.REACT_APP_API_ALERTAS)
}

export default CONFIG;