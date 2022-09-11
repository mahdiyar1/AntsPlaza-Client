import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { User, UserFromValues } from "../models/user";
import { store } from "./store";

export default class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserFromValues) => {
        try {
            const token = await agent.account.login(creds);
            store.commonStore.setToken(token.access);
            const user = await agent.account.current();
            runInAction(() => this.user = user);
            history.push('/trading');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        store.orderStore.orderRegistry.clear();
        history.push('/')
    }

    getUser = async () => {
        try {
            const user = await agent.account.current();
            runInAction(() => this.user = user);
        } catch (error) {
            console.log(error);
        }
    }
}