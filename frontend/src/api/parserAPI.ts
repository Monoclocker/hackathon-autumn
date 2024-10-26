import { PageResponse } from "../dto/responses/parser/PageResponse"
import { WebClient } from "../webclient/WebClient"
import { authAPI } from "./authAPI"

const baseUrl: string = ""

export const satomUrl = "satom"
export const flowwowUrl = "flowwow"

const dataUrls = [
    satomUrl,
    flowwowUrl
]

export class parserAPI{

    private webclient: WebClient = new WebClient()
    private auth: authAPI = new authAPI()

    async getData(searchText: string, marketplaces: string[]){

        marketplaces.forEach(element => {
            if (dataUrls.filter((url) => url === element).length === 0){
                throw new Error(`Marketplace ${element} doesn't support`)
            }
        });

        const dictionary = new Map<string, PageResponse>()

        let token = localStorage.getItem('accessToken')

        for (let element in marketplaces){

            if (token === null && !await this.auth.Refresh()){
                return false
            }
    
            token = localStorage.getItem('accessToken')
    
            let response = await this.webclient.Get(baseUrl + element + `?search_text=${searchText}`, token!)
    
            if (response.statusCode === 401 && !await this.auth.Refresh()){
                return false
            }
    
            token = localStorage.getItem('accessToken')
    
            response = await this.webclient.Get(baseUrl + element + `?search_text=${searchText}`, token!)
    
            if (response.statusCode !== 200){
                return false
            }

            dictionary.set(element, (response.data) as PageResponse)
        }

        return dictionary
    }
}