import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";



export default class ApiInformationStore {
    apiInformationRegistry = new Map<number, any>();
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get listApiInformation() {
        return Array.from(this.apiInformationRegistry.values())
    }

    loadingApiInformation = async () => {
        this.loadingInitial = true;
        try {
            const apiInformations: any = await agent.apiInformation.list();
            apiInformations.forEach((apiInformation: any) => {
                runInAction(() => {
                    this.apiInformationRegistry.set(apiInformation.id, apiInformation);

                })
            })
            runInAction(() => this.loadingInitial = false)
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingInitial = false)
        }
    }

    updateApiInformation = async (apiInformation: any) => {
        const oldManualSymbol = this.apiInformationRegistry.get(apiInformation.id);
        this.apiInformationRegistry.set(apiInformation.id, apiInformation);
        try {
            await agent.apiInformation.update(apiInformation);
        } catch (error) {
            console.log(error);
            this.apiInformationRegistry.set(apiInformation.id, oldManualSymbol!);
        }
    }

}