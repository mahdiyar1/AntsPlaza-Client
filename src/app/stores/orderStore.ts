import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Order } from "../models/order";



export default class OrderStore {
    orderRegistry = new Map<string, Order>();
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get listOrders() {
        return Array.from(this.orderRegistry.values())
    }

    loadingOrders = async () => {
        this.loadingInitial = true;
        try {
            const orders = await agent.orders.list();
            orders.forEach(order => {
                runInAction(() => {
                    this.orderRegistry.set(order.id, order);
                    this.loadingInitial = false;
                })

            })
            runInAction(() => this.loadingInitial = false)
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingInitial = false)
        }
    }

}