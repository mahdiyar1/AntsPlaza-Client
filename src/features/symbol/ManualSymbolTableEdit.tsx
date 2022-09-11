import React, { useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Segment } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Dropdown } from 'primereact/dropdown';

export default observer(function ManualSymbolTableEdit() {
    const { manualSymbolStore } = useStore();

    useEffect(() => {
        if (manualSymbolStore.manualSymbolRegistry.size <= 1) manualSymbolStore.loadingManualSymbols();
    }, [manualSymbolStore])

    const choices = [
        { label: 'Enable', value: 'E' },
        { label: 'Short Only', value: 'S' },
        { label: 'Long Only', value: 'L' },
        { label: 'Disable', value: 'D' }
    ];

    const getChoiceLabel = (choice: any) => {
        switch (choice) {
            case 'E':
                return 'Enable';

            case 'S':
                return 'Short Only';

            case 'L':
                return 'Long Only';

            case 'D':
                return 'Disable';

            default:
                return 'NA';
        }
    }

    const kucoinChoicesBodyTemplate = (rowData: any) => {
        return getChoiceLabel(rowData.kucoin_symbol_choice);
    }

    const binanceChoicesBodyTemplate = (rowData: any) => {
        return getChoiceLabel(rowData.binance_symbol_choice);
    }

    const statusEditor = (options: any) => {
        return (
            <Dropdown value={options.value} options={choices} optionLabel="label" optionValue="value"
                onChange={(e) => options.editorCallback(e.value)} placeholder="Select a Choice"
                itemTemplate={(option) => {
                    return <span className={`product-badge status-${option.value.toLowerCase()}`}>{option.label}</span>
                }} />
        );
    }

    const onRowEditComplete = (e: any) => {
        manualSymbolStore.updateManualSymbol(e.newData);
    }

    const textEditor = (options: any) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    }

    const header = (
        <h2 style={{ textAlign: 'center' }} className="table-header">
            Symbols Setting
        </h2>
    );

    return (
        <Segment className="datatable-editing-demo">
            <div className="card p-fluid">
                <DataTable value={manualSymbolStore.listManualSymbols} editMode="row" loading={manualSymbolStore.loadingInitial} dataKey="id" showGridlines
                    onRowEditComplete={onRowEditComplete} header={header} responsiveLayout="scroll" >
                    <Column align='center' field="id" header="Symbol" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                    <Column align='center' field="kucoin_symbol_choice" header="Kucoin" body={kucoinChoicesBodyTemplate} editor={(options) => statusEditor(options)} style={{ width: '20%' }}></Column>
                    <Column align='center' header='Max Borrow' ></Column>
                    <Column field="binance_symbol_choice" header="Binance" body={binanceChoicesBodyTemplate} editor={(options) => statusEditor(options)} style={{ width: '20%' }}></Column>
                    <Column header='Max Borrow' ></Column>
                    <Column rowEditor headerStyle={{ width: '-10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                </DataTable>
            </div>
        </Segment>
    );
})