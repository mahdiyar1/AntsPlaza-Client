import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";



export default class ManualSymbolStore {
    manualSymbolRegistry = new Map<number, any>();
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get listManualSymbols() {
        return Array.from(this.manualSymbolRegistry.values())
    }

    loadingManualSymbols = async () => {
        this.loadingInitial = true;
        try {
            const manualSymbols: any = await agent.manualSymbol.list();
            manualSymbols.forEach((manualSymbol: any) => {
                runInAction(() => {
                    this.manualSymbolRegistry.set(manualSymbol.id, manualSymbol);

                })
            })
            console.log(this.manualSymbolRegistry.values())
            runInAction(() => this.loadingInitial = false)
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingInitial = false)
        }
    }

    updateManualSymbol = async (manualSymbol: any) => {
        const oldManualSymbol = this.manualSymbolRegistry.get(manualSymbol.id);
        this.manualSymbolRegistry.set(manualSymbol.id, manualSymbol);
        try {
            await agent.manualSymbol.update(manualSymbol);
        } catch (error) {
            console.log(error);
            this.manualSymbolRegistry.set(manualSymbol.id, oldManualSymbol!);
        }
    }

}