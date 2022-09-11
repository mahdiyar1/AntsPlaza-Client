import axios, { AxiosError, AxiosResponse } from "axios";
import { Order } from "../models/order";
import { StrategyExecutionTask } from "../models/strategyExecutionTask";
import { StrategySetting } from "../models/strategySetting";
import { StrategySymbol } from "../models/strategySymbol";
import { Symbol } from "../models/symbol";
import { Token, User, UserFromValues } from "../models/user";
import { store } from "../stores/store";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://89.44.194.194/';

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) config.headers!.Authorization = `JWT ${token}`
    return config
})

// axios.interceptors.response.use(async Response => {
//     await sleep(1000);
//     return Response;
// }, (error: AxiosError) => {
//     console.log(error);
//     return Promise.reject(error);
// })

const responseBody = <T>(Response: AxiosResponse<T>) => Response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const StrategySettings = {
    list: () => requests.get<StrategySetting[]>('engine/strategy_settings/'),
    details: (id: number) => requests.get<StrategySetting>(`engine/strategy_settings/${id}/`),
    create: (strategySetting: StrategySetting) => requests.post<void>('engine/strategy_settings/', strategySetting),
    update: (strategySetting: StrategySetting) => requests.put<void>(`engine/strategy_settings/${strategySetting.id}/`, strategySetting),
    delete: (id: number) => requests.del<void>(`engine/strategy_settings/${id}/`),
}

const StrategyExecutionSTaskSymbols = {
    list: () => requests.get('engine/strategy_symbols/'),
    update: (strategySymbols: any) => requests.put('engine/update_strategy_symbol/', strategySymbols),
}

const Symbols = {
    list: () => requests.get<Symbol[]>('engine/symbols/'),
}

const ManualSymbols = {
    list: () => requests.get('engine/manual_symbol/'),
    details: (id: number) => requests.get(`engine/manual_symbol/${id}/`),
    create: (manualSymbol: any) => requests.post<void>('engine/manual_symbol/', manualSymbol),
    update: (manual_symbol: any) => requests.put<void>(`engine/manual_symbol/${manual_symbol.id}/`, manual_symbol),
    delete: (id: number) => requests.del<void>(`engine/manual_symbol/${id}/`),
}


const ApiInformation = {
    list: () => requests.get('engine/api_information/'),
    details: (id: number) => requests.get(`engine/api_information/${id}/`),
    create: (apiInformation: any) => requests.post<void>('engine/api_information/', apiInformation),
    update: (apiInformation: any) => requests.put<void>(`engine/api_information/${apiInformation.id}/`, apiInformation),
    delete: (id: number) => requests.del<void>(`engine/api_information/${id}/`),
}

const StrategyExecutionTasks = {
    list: () => requests.get<StrategyExecutionTask[]>('engine/strategy_executions/'),
}

const Orders = {
    list: () => requests.get<Order[]>('engine/orders/'),
    details: (id: string) => requests.get<symbol>(`engine/orders/${id}/`),
}

const Account = {
    current: () => requests.get<User>('auth/users/me/'),
    login: (user: UserFromValues) => requests.post<Token>('auth/jwt/create/', user)
}

const Strategy = {
    run_short: () => requests.get('engine/run_short/'),
    run_long: () => requests.get('engine/run_long/'),
    terminate_short: () => requests.get('engine/terminate_short/'),
    terminate_long: () => requests.get('engine/terminate_long/'),
    terminate: () => requests.get('engine/terminate/'),
    checkRisk: () => requests.get('engine/check_risk/')
}

const StrategyReturn = {
    list: () => requests.get('engine/strategy/')
}

const agent = {
    strategySettings: StrategySettings,
    orders: Orders,
    account: Account,
    strategy: Strategy,
    symbols: Symbols,
    strategyExecutionTasks: StrategyExecutionTasks,
    strategyExecutionTaskSymbols: StrategyExecutionSTaskSymbols,
    strategyReturn: StrategyReturn,
    manualSymbol: ManualSymbols,
    apiInformation: ApiInformation
}

export default agent;