import React, { useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Segment } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Dropdown } from 'primereact/dropdown';

export default observer(function ApiInformationTableEdit() {
    const { apiInformationStore } = useStore();

    useEffect(() => {
        if (apiInformationStore.apiInformationRegistry.size <= 1) apiInformationStore.loadingApiInformation();
    }, [apiInformationStore])

    const onRowEditComplete = (e: any) => {
        apiInformationStore.updateApiInformation(e.newData);
    }

    const textEditor = (options: any) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    }

    const header = (
        <h2 style={{ textAlign: 'center' }} className="table-header">
            API Setting
        </h2>
    );

    return (
        <Segment className="datatable-editing-demo">
            <div className="card p-fluid">
                <DataTable value={apiInformationStore.listApiInformation} editMode="row" loading={apiInformationStore.loadingInitial} dataKey="id" showGridlines
                    onRowEditComplete={onRowEditComplete} header={header} responsiveLayout="scroll" >
                    <Column field="trader" header="Trader Id" align='center'  editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                    <Column field="exchange" header="Exchange" align='center'  editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                    <Column field="key" header="Key" align='center'  editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                    <Column field="secret" header="Secret" align='center'  editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                    <Column field="password" header="Password" align='center'  editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                    <Column rowEditor headerStyle={{ width: '-10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                </DataTable>
            </div>
        </Segment>
    );
})