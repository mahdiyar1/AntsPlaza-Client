import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Tab } from 'semantic-ui-react'
import { useStore } from '../../app/stores/store'
import { StrategyExecutionTask } from '../../app/models/strategyExecutionTask'
import agent from '../../app/api/agent'
import { Symbol } from "../../app/models/symbol";
import StrategyExecutionTaskSymbols from './StrategyExecutionTaskSymbols'
import LoadingComponent from '../../app/layout/LoadingComponent'

export default observer(function Trading() {
    const { commonStore } = useStore()
    const [loaded, SetLoaded] = useState(false)
    const [symbols, setSymbols] = useState<Symbol[]>();
    const [strategyExecutionTasks, setStrategyExecutionTasks] = useState<StrategyExecutionTask[]>();
    const [strategyExecutionTaskSymbols, setStrategyExecutionTaskSymbols] = useState<any>()

    useEffect(() => {
        agent.symbols.list().then(symbols => setSymbols(symbols));
        agent.strategyExecutionTasks.list().then(strategyExecutionTasks => {
            let shortTasks = []
            for (const strategyExecutionTask of strategyExecutionTasks) {
                if (strategyExecutionTask.task.includes('run_short')) shortTasks.push(strategyExecutionTask)
            }
            setStrategyExecutionTasks(shortTasks);
            console.log(shortTasks)
        }
        );
        agent.strategyExecutionTaskSymbols.list().then(
            strategyExecutionTaskSymbols => {
                setStrategyExecutionTaskSymbols(strategyExecutionTaskSymbols);
                SetLoaded(!loaded);
            });
    }, [])

    function renderPanes() {
        let panes: any = []
        for (const strategyExecutionTask of strategyExecutionTasks!) {
            let pane = {
                menuItem: strategyExecutionTask.name.substring(0, 7),
                render: () => <Tab.Pane>
                    {symbols && strategyExecutionTaskSymbols && <StrategyExecutionTaskSymbols
                        symbols={symbols!}
                        activeTask={strategyExecutionTask}
                        TaskSymbols={strategyExecutionTaskSymbols}
                    />}
                </Tab.Pane>
            }
            panes.push(pane)
        }

        return panes
    }

    if (!loaded) return <LoadingComponent content='Loading Trade Symbols...' />

    return (
        <>
            {strategyExecutionTasks && <Tab
                menu={{ color: 'teal', attached: true, tabular: true }}
                panes={renderPanes()}
                onTabChange={(e, data) => commonStore.setActiveTab(data.activeIndex)}
            />}
        </>
    )
})