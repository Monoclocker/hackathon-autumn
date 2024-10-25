import { WebClient } from "../webclient/WebClient";
import GetUserRequest from "../dto/requests/auth/GetUserRequest"
import CreateUserRequest from "../dto/requests/auth/CreateUserRequest";
import TokensResponse from "../dto/responses/auth/GetUserResponse";


const BaseUrl = ""
const LoginPath = BaseUrl + ""
const RegisterPath = BaseUrl + ""
const Refresh = BaseUrl + ""

export class authAPI{
    
    webclient: WebClient = new WebClient()

    async Login(loginData: GetUserRequest){
        const status = await this.webclient.Post(LoginPath, loginData)
        if (status.statusCode !== 200){
            return status
        }
        
        const tokens: TokensResponse = status.data as TokensResponse

        localStorage.setItemItem("accessToken", tokens.accessToken)
        localStorage.setItemItem("refreshToken", tokens.refreshToken)
        
        return true
    }

    async Register(registerData: CreateUserRequest){
        const status = await this.webclient.Post(RegisterPath, registerData)
        if (status.statusCode !== 200){
            return status
        }
        else return true
    }

    async Refresh(): Promise<boolean>{
        const token: string | null = localStorage.getItem("refreshToken")

        if(token === null){
            return false
        }
        
        const status = await this.webclient.Get(Refresh, token)

        if(status.statusCode !== 200){
            return false
        }

        const tokens: TokensResponse = status.data as TokensResponse

        localStorage.setItemItem("accessToken", tokens.accessToken)
        localStorage.setItemItem("refreshToken", tokens.refreshToken)

        return true
    }
}