export interface ApiStatus{
    statusCode: number,
    data?: unknown
}

export class WebClient{

    constructor() {}

    async Get(requestUrl: string, token: string = ""): Promise<ApiStatus> {

        const response: Response = await fetch(requestUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const status: ApiStatus = {
            statusCode: response.status, 
            data: await response.json()
        }

        return status
    }

    async Post<TRequest>(requestUrl: string, requestBody: TRequest, token: string = ""): Promise<ApiStatus>{

        const response: Response = await fetch(requestUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(requestBody)
        })

        const status: ApiStatus = {
            statusCode: response.status, 
            data: await response.json()
        }

        return status
    }

    async Put<TRequest>(requestUrl: string, requestBody: TRequest, token: string = ""): Promise<ApiStatus>{

        const response: Response = await fetch(requestUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(requestBody)
        })

        const status: ApiStatus = {
            statusCode: response.status, 
            data: await response.json()
        }

        return status
    }

    async Delete(requestUrl: string, token: string = ""): Promise<ApiStatus>{
        const response: Response = await fetch(requestUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const status: ApiStatus = {
            statusCode: response.status, 
            data: await response.json()
        }

        return status
    }
}
