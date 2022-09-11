import React, { useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Segment } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';

export default observer(function StrategySettingTableEdit() {
    const { strategySettingStore } = useStore();

    useEffect(() => {
        if (strategySettingStore.strategySettingRegistry.size <= 1) strategySettingStore.loadingStrategySettings();
    }, [strategySettingStore])

    const onRowEditComplete = (e: any) => {
        strategySettingStore.updateStrategySetting(e.newData);
    }

    const textEditor = (options: any) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    }

    const header = (
        <h2 style={{textAlign: 'center'}} className="table-header">
            Strategy Setting
        </h2>
    );

    return (
        <Segment className="datatable-editing-demo">
            <div className="card p-fluid">
                <DataTable value={strategySettingStore.listStrategySettings} editMode="row" loading={strategySettingStore.loadingInitial} dataKey="id" showGridlines
                    onRowEditComplete={onRowEditComplete} header={header} responsiveLayout="scroll">
                    {/* <Column field="strategy" header="Strategy" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column> */}
                    <Column field="name" header="Name" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                    <Column field="value" header="Value" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                    <Column field="comment" header="Comment" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                    {/* <Column field="ctrlValue" header="Value" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                    <Column field="ctrlComment" header="Comment" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column> */}
                    <Column rowEditor headerStyle={{ width: '-10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                </DataTable>
            </div>
        </Segment>
    );
})