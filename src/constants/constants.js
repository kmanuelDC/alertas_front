const CONSTANTES = {
    HTTP: {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE'
    },
    APIS: {
        FLEETS: `v1/get/fleets`,
        LEVELS: `v1/get/levels`,
        PARAMETERS: `v1/get/all/parameters`,
        OPERATORS: `v1/get/operators`,
        GET_ALL_CONDITIONS: `v1/get/all/conditions`,
        GET_CONDITION_BY_ID: (id) => `v1/get/condition/by/id?id=${id}`,
        DELETE_CONDITION: (id) =>`v1/delete/condition?id=${id}`,
        //DOWNLOAD_FILE: (query) => `get/detail/archive?route=${query.route}&filename=${query.filename}`,

        //SAVE
        NEWRULECONDITION: `v1/post/rule/condition`,
    }
}

export default CONSTANTES;   