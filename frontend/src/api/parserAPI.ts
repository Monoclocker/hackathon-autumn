import { PageResponse } from "../dto/responses/parser/PageResponse"
import { SystemData } from "../dto/SystemData"
import { WebClient } from "../webclient/WebClient"
import { authAPI } from "./authAPI"

const baseUrl: string = ""
const getMarkerplace: string = "systemdata"

export class parserAPI{

    private webclient: WebClient = new WebClient()

    static readonly marketPlaces: string[] = [] 
    private auth: authAPI = new authAPI()

    async getMarketplaces(){
        const response = await this.webclient.Get(baseUrl + getMarkerplace)

        if (response.statusCode !== 200){
            return Array<string>()
        }

        return (response.data as SystemData).marketplaces
    }

    async getData(searchText: string, marketplaces: string[]){

        marketplaces.forEach(element => {
            if (marketplaces.filter((url) => url === element).length === 0){
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
    
            let response = await this.webclient.Get(baseUrl + element + `?search_text=${searchText}&marketplaces=${marketplaces}`, token!)
    
            if (response.statusCode === 401 && !await this.auth.Refresh()){
                return false
            }
    
            token = localStorage.getItem('accessToken')
    
            response = await this.webclient.Get(baseUrl + element + `?search_text=${searchText}&marketplaces=${marketplaces}`, token!)
    
            if (response.statusCode !== 200){
                return false
            }

            dictionary.set(element, (response.data) as PageResponse)
        }

        return dictionary
    }
}