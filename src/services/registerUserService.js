import http from "./httpService";
import {apiURL} from "../config.json"

const apiEndPoint=apiURL+'users'

export async function save(user){
    return await http.post(apiEndPoint, {
        email:user.username,
        password:user.password,
        name:user.name
    });

}