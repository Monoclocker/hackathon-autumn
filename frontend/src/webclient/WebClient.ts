export interface ApiStatus{
    statusCode: number,
    message?: string,
    data?: unknown
}

interface ErrorMessage{
    message: string
}

export class WebClient{

    constructor() {}

    async Get(requestUrl: string, token: string = ""): Promise<ApiStatus> {

        const response: Response = await fetch(requestUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authtorization': `Bearer ${token}`
            }
        })

        const status: ApiStatus = {statusCode: response.status}

        const responseBody = await response.json()

        if (response.status < 200 || response.status > 299){
            status.message = (responseBody as ErrorMessage).message
        }
        else{
            status.data = responseBody
        }

        return status
    }

    async Post<TRequest>(requestUrl: string, requestBody: TRequest, token: string = ""): Promise<ApiStatus>{

        const response: Response = await fetch(requestUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authtorization': `Bearer ${token}`
            },
            body: JSON.stringify(requestBody)
        })

        const status: ApiStatus = {statusCode: response.status}

        const responseBody = await response.json()

        if (response.status < 200 || response.status > 299){
            status.message = (responseBody as ErrorMessage).message
        }
        else{
            status.data = responseBody
        }

        return status
    }

    async Put<TRequest>(requestUrl: string, requestBody: TRequest, token: string = ""): Promise<ApiStatus>{

        const response: Response = await fetch(requestUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authtorization': `Bearer ${token}`
            },
            body: JSON.stringify(requestBody)
        })

        const status: ApiStatus = {statusCode: response.status}

        const responseBody = await response.json()

        if (response.status < 200 || response.status > 299){
            status.message = (responseBody as ErrorMessage).message
        }
        else{
            status.data = responseBody
        }

        return status
    }

    async Delete(requestUrl: string, token: string = ""): Promise<ApiStatus>{
        const response: Response = await fetch(requestUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authtorization': `Bearer ${token}`
            }
        })

        const status: ApiStatus = {statusCode: response.status}

        const responseBody = await response.json()

        if (response.status < 200 || response.status > 299){
            status.message = (responseBody as ErrorMessage).message
        }
        else{
            status.data = responseBody
        }

        return status
    }
}
