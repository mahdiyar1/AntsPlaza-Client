import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";
import OrderStore from "./orderStore";
import StrategySettingStore from "./strategySettingStore";
import ManualSymbolStore from "./manualSymbolStore";
import ApiInformationStore from "./apiInformationStore";

interface Store {
    orderStore: OrderStore;
    userStore: UserStore;
    commonStore: CommonStore;
    modalStore: ModalStore;
    strategySettingStore: StrategySettingStore;
    manualSymbolStore: ManualSymbolStore;
    apiInformationStore: ApiInformationStore
}

export const store: Store = {
    orderStore: new OrderStore(),
    userStore: new UserStore(),
    commonStore: new CommonStore(),
    modalStore: new ModalStore(),
    strategySettingStore: new StrategySettingStore(),
    manualSymbolStore: new ManualSymbolStore(),
    apiInformationStore: new ApiInformationStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}