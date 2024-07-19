
export const setURL = (dev, ip, baseUrl) => {
    return dev === undefined || dev === "" ? `${ip}/${baseUrl}` : `${dev}/${baseUrl}`;
}
