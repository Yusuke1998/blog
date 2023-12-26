interface Props {
    endpoint: string;
    query?: Record<string, string>;
    wrappedByKey?: string;
    wrappedByList?: boolean;
}

/**
 * Obtiene datos de la API de Strapi.
 * @param endpoint - El endpoint para realizar la consulta
 * @param query - Los parámetros de consulta para agregar a la URL
 * @param wrappedByKey - La clave para desempaquetar la respuesta (Pueden ser n separada por coma)
 * @param wrappedByList - Si la respuesta es una lista, desempaquétala.
 * @returns
 */
export default async function fetchApi<T>({
    endpoint,
    query,
    wrappedByKey,
    wrappedByList,
}: Props): Promise<T> {
    if (endpoint.startsWith('/')) {
        endpoint = endpoint.slice(1);
    }
    const apiHost = import.meta.env.PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337'
    const url = new URL(`${apiHost}/api/${endpoint}`);
    if (query) {
        Object.entries(query).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });
    }
    console.log(url.toString())
    const res = await fetch(url.toString());
    let data = await res.json();

    if (wrappedByKey) {
        if (wrappedByKey.match(',')) {
            const arrSplit = wrappedByKey.split(',');
            let newData: any = {};
            for (let key of arrSplit) {
                newData[key] = data[key];
            }
            data = newData;
        } else {
            data = data[wrappedByKey];
        }
    }

    if (wrappedByList) {
        data = data[0];
    }

    return data as T;
}