import http from "./httpService";
import config from "../config.json"

const moviesEndPoint=config.apiURL+'movies'
export async function getMovies(){
    let movies= await http.get(moviesEndPoint);
    return movies;
}

export async function getMovie(id){
    return await http.get(moviesEndPoint+'/'+id);
}

export async function saveMovie(movie){
    
        if(movie._id){
            let body={...movie};
            delete body._id;
            return await http.put(moviesEndPoint+"/"+movie._id,body);
        }
        
        return await http.post(moviesEndPoint,movie);
    
}

export async function deleteMovie(id){
    return await http.delete(`${moviesEndPoint}/${id}`);
}