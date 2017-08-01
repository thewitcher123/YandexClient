import axios from 'axios';

export function getAllFiles(authConfig) {
    let path = "https://cloud-api.yandex.net:443/v1/disk/resources/files?&preview_size=S";
    return axios.get(path, authConfig);
}

export function getFolderFiles(authConfig, dirName) {
    let path = "https://cloud-api.yandex.net:443/v1/disk/resources?path=" + dirName
        + "&fields=_embedded%2C%20_embedded.items.name%2C%20_embedded.items.path%2C%20_embedded.items.size%2C%20_embedded.items.type%2C%20_embedded.items.revision&preview_size=M&sort=name";
    return axios.get(path, authConfig);
}