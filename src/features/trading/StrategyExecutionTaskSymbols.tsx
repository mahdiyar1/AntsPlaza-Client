import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Checkbox, Divider, Input, Label, Table } from 'semantic-ui-react'
import { Symbol } from "../../app/models/symbol";
import ConfirmSymbols from './ConfirmSymbols';
import { useStore } from '../../app/stores/store';
import agent from '../../app/api/agent';

interface Props {
    symbols: Symbol[];
    activeTask: any;
    TaskSymbols: any;
}

export default observer(function StrategyExecutionTaskSymbols(props: Props) {
    const { modalStore } = useStore()
    const [taskSymbols, setTaskSymbols] = useState<any>(props.TaskSymbols)
    const [checked, setChecked] = useState<any>()
    const [reload, setReload] = useState<any>(false)

    useEffect(() => {
        let checked: any = {};
        for (const symbol of props.symbols) {
            checked[symbol.id + '/short'] = false;
            checked[symbol.id + '/long'] = false;
            for (const taskSymbol of taskSymbols) {
                if (props.activeTask.id === taskSymbol.strategyExecutionTaskId &&
                    symbol.id === taskSymbol.symbol) {
                    checked[symbol.id + '/' + taskSymbol.position] = true
                }
            }
        }
        setChecked(checked);
    }, [props.activeTask])

    useEffect(() => {
        agent.strategyExecutionTaskSymbols.list().then(taskSymbols => setTaskSymbols(taskSymbols));
    }, [modalStore.modal.open])

    function handleSymbolSelection(data: any) {
        if (data.id.includes('kucoin')) {
            let key = data.id.split('/')[0] + '/' + data.id.split('/')[1];
            checked[key] = !checked[key]
            setReload(!reload)

        }
    }

    function handleSymbolBalance(data: any) {

    }

    function getSymbol(position: string) {
        for (const [key, value] of Object.entries(checked)) {
            if (key.includes(position) && value) {
                return key.split('/')[0]
            }
        }
    }

    return (
        <Table celled padded structured textAlign='center' >
            <Table.Header >
                <Table.Row>
                    <Table.HeaderCell rowSpan='2' >Symbol</Table.HeaderCell>
                    <Table.HeaderCell colSpan='2' >Kucoin</Table.HeaderCell>
                    <Table.HeaderCell colSpan='2' >Binance</Table.HeaderCell>
                    <Table.HeaderCell colSpan='2' >Forex</Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                    <Table.HeaderCell>Short</Table.HeaderCell>
                    <Table.HeaderCell>Long</Table.HeaderCell>
                    <Table.HeaderCell>Short</Table.HeaderCell>
                    <Table.HeaderCell>Long</Table.HeaderCell>
                    <Table.HeaderCell>Short</Table.HeaderCell>
                    <Table.HeaderCell>Long</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {props.symbols.map(symbol => (
                    <Table.Row ne key={symbol.id}>
                        <Table.Cell>{symbol.id}</Table.Cell>
                        <Table.Cell negative>
                            {checked && <Checkbox disabled={checked[symbol.id + '/long']} id={symbol.id + '/short' + '/kucoin'}
                                checked={checked[symbol.id + '/short']} onChange={(event, data) => handleSymbolSelection(data)} toggle />}
                            <Divider />
                            <Input id={symbol.id + '/short' + '/kucoin'} placeholder='Balance' size='large' style={{ width: 100, height: 25, marginRight: 20 }}>
                                <Label basic>%</Label>
                                <input />
                            </Input>
                        </Table.Cell>
                        <Table.Cell positive >
                            {checked && <Checkbox disabled={checked[symbol.id + '/short']} id={symbol.id + '/long' + '/kucoin'}
                                checked={checked[symbol.id + '/long']} onChange={(event, data) => handleSymbolSelection(data)} toggle />}
                            <Divider />
                            <Input placeholder='Balance' size='large' style={{ width: 100, height: 25, marginRight: 20 }}>
                                <Label basic>%</Label>
                                <input />
                            </Input>
                        </Table.Cell>
                        <Table.Cell negative >
                            <Checkbox disabled id={symbol.id + '/short' + '/binance'} onChange={(event, data) => handleSymbolSelection(data)} toggle />
                            <Divider />
                            <Input disabled placeholder='Balance' size='large' style={{ width: 100, height: 25, marginRight: 20 }}>
                                <Label basic>%</Label>
                                <input />
                            </Input>
                        </Table.Cell>
                        <Table.Cell positive >
                            <Checkbox disabled id={symbol.id + '/long' + '/binance'} onChange={(event, data) => handleSymbolSelection(data)} toggle />
                            <Divider />
                            <Input disabled placeholder='Balance' size='large' style={{ width: 100, height: 25, marginRight: 20 }}>
                                <Label basic>%</Label>
                                <input />
                            </Input>
                        </Table.Cell>
                        <Table.Cell negative >
                            <Checkbox disabled id={symbol.id + '/short' + '/forex'} onChange={(event, data) => handleSymbolSelection(data)} toggle />
                            <Divider />
                            <Input disabled placeholder='Balance' size='large' style={{ width: 100, height: 25, marginRight: 20 }}>
                                <Label basic>%</Label>
                                <input />
                            </Input>
                        </Table.Cell>
                        <Table.Cell positive >
                            <Checkbox disabled id={symbol.id + '/long' + '/forex'} onChange={(event, data) => handleSymbolSelection(data)} toggle />
                            <Divider />
                            <Input disabled placeholder='Balance' size='large' style={{ width: 100, height: 25, marginRight: 20 }}>
                                <Label basic>%</Label>
                                <input />
                            </Input>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>

            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan='7'>
                        <Button positive fluid content='Save' type='submit' onClick={() => modalStore.openModal(<ConfirmSymbols activeTask={props.activeTask}
                            symbolShort={getSymbol('short')!} symbolLong={getSymbol('long')!} />)} />
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    )
})