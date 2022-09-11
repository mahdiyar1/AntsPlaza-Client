import { useEffect, useState } from "react";
import { Button, Divider, Grid, Header, Icon, Item, Label, Segment, Tab, TabPane } from "semantic-ui-react";
import { Chart } from 'primereact/chart';
import DataTableRowExpansionDemo from "./DataTableRowExpansionDemo";
import agent from "../../app/api/agent";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";

export default observer(function Dashboard() {
    const { commonStore } = useStore()

    const [loading, setLoading] = useState(false)
    const [returns, setReturns] = useState<any>()
    const [traderId, setTraderId] = useState(0)
    const [refresh, setRefresh] = useState(false)

    const [monthData] = useState({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Portfolio',
                data: [65, 59, 76, 43, 79, 100, 90],
                fill: false,
                borderColor: 'blue',
                tension: .4
            }
        ],
    });
    const [weakData] = useState({
        labels: ['weak 1', 'weak 2', 'weak 3', 'weak 4'],
        datasets: [
            {
                label: 'Portfolio',
                data: [65, 67, 76, 70, 79, 82, 90],
                fill: false,
                borderColor: 'blue',
                tension: .4
            }
        ],
    });
    const [dayData] = useState({
        labels: ['1', '2', '3', '4', '5', '6', '7'],
        datasets: [
            {
                label: 'Portfolio',
                data: [65, 62, 69, 70, 71, 73, 65],
                fill: false,
                borderColor: 'blue',
                tension: .4
            }
        ],
    });


    const getLightTheme = () => {
        let basicOptions = {
            maintainAspectRatio: false,
            aspectRatio: .7,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };
        return basicOptions
    }
    const basicOptions = getLightTheme();

    const panes = [
        {
            menuItem: 'Monthly',
            render: () =>
                <TabPane>
                    <div className="card">
                        <Chart type="line" data={monthData} options={basicOptions} />
                    </div>
                </TabPane>
        },
        {
            menuItem: 'Weakly',
            render: () =>
                <TabPane>
                    <div className="card">
                        <Chart type="line" data={weakData} options={basicOptions} />
                    </div>
                </TabPane>
        },
        {
            menuItem: 'Daily',
            render: () =>
                <TabPane>
                    <div className="card">
                        <Chart type="line" data={dayData} options={basicOptions} />
                    </div>
                </TabPane>
        }
    ]

    const square = { width: 250, height: 150 }

    useEffect(() => {
        setLoading(true)
        agent.strategy.checkRisk().then(() => {
            agent.strategyReturn.list().then((strategyReturns: any) => {
                setReturns(strategyReturns[traderId].last_strategy_execution);
                console.log(strategyReturns[traderId].last_strategy_execution);
                setLoading(false);
            });
        });
    }, [traderId, refresh])


    return (
        <>
            <Grid>
                <Grid.Column width={9} >
                    <Segment >
                        <Tab
                            menu={{ color: 'teal', attached: true, tabular: true }}
                            panes={panes}
                            onTabChange={(e, data) => commonStore.setActiveTab(data.activeIndex)}
                        />
                    </Segment>
                </Grid.Column>
                {returns && <Grid.Column width={7} >
                    <Segment inverted tertiary color="grey">{returns.is_strategy_end ? <Header textAlign='center'>
                        No Active Strategy
                        <Button loading={loading} onClick={() => setRefresh(!refresh)} style={{ marginLeft: 10 }} circular color='violet' >
                            <Icon name='refresh' fitted size="large" />
                        </Button>
                    </Header> :
                        <Item style={{ textAlign: 'center' }} >
                            <Item.Content >
                                <Item.Header as='h1' >Active Strategy </Item.Header>
                                <Item.Meta  >
                                    <Button loading={loading} onClick={() => setRefresh(!refresh)} circular color='violet' >
                                        <Icon name='refresh' fitted size="large" />
                                    </Button>
                                </Item.Meta>
                                <Item.Description as='h3'>
                                    Return:
                                    <Label color={returns.last_short_return + returns.last_long_return >= 0 ? 'green' : 'red'}>
                                        {(returns.last_short_return + returns.last_long_return).toFixed(2)}$
                                    </Label>
                                </Item.Description>
                                <Item.Extra as='h3' >
                                    Percentage Return
                                    <Label color={returns.last_short_return + returns.last_long_return >= 0 ? 'green' : 'red'}>
                                        {(returns.last_short_return_ratio * 100 + returns.last_long_return_ratio * 100).toFixed(2)}%
                                    </Label>
                                </Item.Extra>
                            </Item.Content>
                        </Item>}
                    </Segment>
                    <Divider horizontal>Details</Divider>
                    <Grid>
                        <Grid.Column width={7}>
                            <Segment circular tertiary inverted color="orange" style={square} >
                                {returns.is_strategy_end || !returns.is_short_success || returns.is_short_closed ? <Header textAlign='center' content='No Active Short Position' /> :
                                    <Item style={{ textAlign: 'center' }} >
                                        <Item.Content >
                                            <Item.Header as='h1' >Short</Item.Header>
                                            <Item.Meta as='h3' >Currency : {returns.short_symbol.split('-')[0]}</Item.Meta>
                                            <Item.Description as='h3' >
                                                Return: <Label color={returns.last_short_return >= 0 ? 'green' : 'red'}>{returns.last_short_return.toFixed(2)}$</Label>
                                            </Item.Description>
                                            <Item.Extra as='h4' >
                                                Percentage return:
                                                <Label color={returns.last_short_return_ratio >= 0 ? 'green' : 'red'}>
                                                    {(returns.last_short_return_ratio * 100).toFixed(2)}%
                                                </Label>
                                            </Item.Extra>
                                        </Item.Content>
                                    </Item>}
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={2}>
                            <Divider vertical>Vs</Divider>
                        </Grid.Column>
                        <Grid.Column width={7}>
                            <Segment circular tertiary inverted color="blue" style={square}>
                                {returns.is_strategy_end || !returns.is_long_success || returns.is_long_closed ? <Header textAlign='center' content='No Active Long Position' /> :
                                    <Item style={{ textAlign: 'center' }} >
                                        <Item.Content >
                                            <Item.Header as='h1' >Long</Item.Header>
                                            <Item.Meta as='h3' >Currency : {returns.long_symbol.split('-')[0]}</Item.Meta>
                                            <Item.Description as='h3'>
                                                Return : <Label color={returns.last_long_return >= 0 ? 'green' : 'red'} >{returns.last_long_return.toFixed(2)}$</Label>
                                            </Item.Description>
                                            <Item.Extra as='h4' >
                                                Percentage Return :
                                                <Label color={returns.last_long_return_ratio >= 0 ? 'green' : 'red'}>
                                                    {(returns.last_long_return_ratio * 100).toFixed(2)}%
                                                </Label>
                                            </Item.Extra>
                                        </Item.Content>
                                    </Item>}
                            </Segment>
                        </Grid.Column>
                    </Grid>
                </Grid.Column>}
            </Grid>
            <Segment>
                <DataTableRowExpansionDemo />
            </Segment>
        </>
    )
})