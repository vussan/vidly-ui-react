import http from "./httpService";
import config from "../config.json"

const genresEndPoint=config.apiURL+'genres'
export async function getGenres(){
    return await http.get(genresEndPoint);
}

export async function getGenre(id){
    return await http.get(genresEndPoint+'/'+id);
}