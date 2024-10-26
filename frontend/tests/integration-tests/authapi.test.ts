import { describe, expect, test } from '@jest/globals'
import {authAPI} from '../../src/api/authAPI'
import { ApiStatus } from '../../src/webclient/WebClient';
import { faker } from '@faker-js/faker';

describe('auth tests', () =>{
    test('register user should be success', async () =>{
        const api = new authAPI()
        const status = await api.Register({
            username: faker.internet.userName(), 
            password: faker.internet.password({length: 15}), 
            email: faker.internet.email()
        })
        expect(typeof(status)).toBe(typeof(Boolean))
    })

    test('register already existant user should return status 401', async () =>{
        const api = new authAPI()
        const status = await api.Register({
            username: 'already',
            password: faker.internet.password({length: 15}),
            email: faker.internet.email()
        })

        const apiStatus = status as ApiStatus
        const statusCode = apiStatus.statusCode
        expect(statusCode).toBe(401)
    })

    test('login should be success', async() =>{
        const api = new authAPI()
        const status = await api.Login({
            username: 'existant',
            password: 'password',
        })
        expect(typeof(status)).toBe(Boolean)
        expect(localStorage.getItem('accessToken')).not.toBe(null)
        expect(localStorage.getItem('refreshToken')).not.toBe(null)
    })

    test('login with invalid credentials should return status 404', async() =>{
        const api = new authAPI()
        const status = await api.Login({
            username: 'invalid',
            password: 'credentials'
        })

        expect((status as ApiStatus).statusCode).toBe(404)
    })

    test('refresh with correct token should update tokens', async ()=>{
        const api = new authAPI()
        await api.Login({
            username: 'existant',
            password: 'password',
        })
        const oldRefresh = localStorage.getItem('refreshToken')
        localStorage.removeItem('accessToken')
        const status = await api.Refresh()
        expect(status).toBe(true)
        expect(localStorage.getItem('accessToken')).not.toBe(null)
        expect(localStorage.getItem('refreshToken')).not.toBe(null)
        expect(localStorage.getItem('refreshToken')).not.toBe(oldRefresh)
    })

    test('refresh with incorrect token should be failure', async()=>{
        const api = new authAPI()
        localStorage.setItem('refreshToken','invalidToken')
        const status = await api.Refresh()
        expect(status).toBe(false)
    })
})