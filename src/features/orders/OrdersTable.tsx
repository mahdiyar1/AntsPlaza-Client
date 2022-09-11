import React, { useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Segment } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';

export default observer(function SymbolsTableEdit() {
    const { orderStore } = useStore();

    useEffect(() => {
        if (orderStore.orderRegistry.size <= 1) orderStore.loadingOrders();
    }, [orderStore])

    const header = (
        <h2 style={{textAlign: 'center'}} className="table-header">
            Orders
        </h2>
    );

    return (
        <Segment className="datatable-editing-demo">
            <div className="card p-fluid">
                <DataTable value={orderStore.listOrders} loading={orderStore.loadingInitial} dataKey="id" showGridlines
                    header={header} stripedRows responsiveLayout="scroll">
                    <Column field="strategy" header="Trader Strategy Id" style={{ width: '20%' }}></Column>
                    <Column field="symbol" header="Symbol" style={{ width: '20%' }}></Column>
                    <Column field="position" header="Position" style={{ width: '20%' }}></Column>
                    <Column field="side" header="Side" style={{ width: '20%' }}></Column>
                    <Column field="average" header="Average Price" style={{ width: '20%' }}></Column>
                    <Column field="amount" header="Amount" style={{ width: '20%' }}></Column>
                    <Column field="cost" header="Cost" style={{ width: '20%' }}></Column>
                    <Column field="datetime" header="DateTime" style={{ width: '20%' }}></Column>
                </DataTable>
            </div>
        </Segment>
    );
})