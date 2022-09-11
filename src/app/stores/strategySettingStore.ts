import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { StrategySetting } from "../models/strategySetting";



export default class StrategySettingStore {
    strategySettingRegistry = new Map<number, StrategySetting>();
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get listStrategySettings() {
        return Array.from(this.strategySettingRegistry.values())
    }

    loadingStrategySettings = async () => {
        this.loadingInitial = true;
        try {
            const strategySettings = await agent.strategySettings.list();
            strategySettings.forEach(strategySetting => {
                runInAction(() => {
                    if (strategySetting.strategy === 3) {
                        this.strategySettingRegistry.set(strategySetting.id, strategySetting);
                    }

                })

            })
            runInAction(() => this.loadingInitial = false)
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingInitial = false)
        }
    }

    updateStrategySetting = async (strategySetting: StrategySetting) => {
        const oldStrategySetting = this.strategySettingRegistry.get(strategySetting.id);
        this.strategySettingRegistry.set(strategySetting.id, strategySetting);
        try {
            await agent.strategySettings.update(strategySetting);
        } catch (error) {
            console.log(error);
            this.strategySettingRegistry.set(strategySetting.id, oldStrategySetting!);
        }
    }

}