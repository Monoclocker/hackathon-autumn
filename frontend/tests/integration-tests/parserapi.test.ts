import { describe, expect, test } from '@jest/globals'
import {parserAPI, satomUrl} from "../../src/api/parserAPI"
import { authAPI } from '../../src/api/authAPI'
import { ApiStatus } from '../../src/webclient/WebClient'
import TokensResponse from '../../src/dto/responses/auth/GetUserResponse'
import { PageResponse } from '../../src/dto/responses/parser/PageResponse'

describe("parser API tests", () =>{
    test("get data should return some page response", async ()=>{
        const api = new parserAPI()
        const tokenResponse = await new authAPI().Login({
            username: 'username',
            password: 'password'
        }) as ApiStatus

        localStorage.setItem('accessToken', (tokenResponse.data as TokensResponse).accessToken)
        
        expect(await api.getData('phone', [satomUrl])).toBeInstanceOf(Map<String, PageResponse>)
    })

    test("get data without token should refresh token and be success", async() =>{
        const api = new parserAPI()
        expect(await api.getData('phone', [satomUrl])).toBeInstanceOf(Map<String, PageResponse>)
        expect(localStorage.getItem('accessToken')).not.toBe(null)
    })

    test('get data with incorrect token should refresh token and be success', async ()=>{
        const api = new parserAPI()
        localStorage.setItem('accessToken', 'invalidToken')

        expect(await api.getData('phone', [satomUrl])).toBeInstanceOf(Map<String, PageResponse>)
        expect(localStorage.getItem('accessToken')).not.toBe(null)
        expect(localStorage.getItem('accessToken')).not.toBe('invalidToken')
    })
})