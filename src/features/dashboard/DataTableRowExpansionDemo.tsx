import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { data } from './data'


export default function DataTableRowExpansionDemo() {
    const [products, setProducts] = useState<any[]>([]);
    const [expandedRows, setExpandedRows] = useState<any[]>();
    const [expandedRowsLevel, setExpandedRowsLevel] = useState<any[]>();
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;
        setProducts(data)
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const rowExpansionTemplateLevel = (data: any) => {
        return (
            <div className="orders-subtable">
                <DataTable value={data.executions} showGridlines header='Positions Taken'>
                    <Column field="id" header="Id" sortable></Column>
                    <Column field="position" header="Position" sortable></Column>
                    <Column field="currency" header="Currency" sortable></Column>
                    <Column field="amount" header="Amount" sortable></Column>
                    <Column field="totalReturn" header="Total Return" sortable></Column>
                    <Column field="totalReturnPercentage" header="Total Return Percentage" sortable></Column>
                    <Column field='exitCase' header='Exit Case' sortable></Column>
                </DataTable>
            </div>
        );
    }

    const rowExpansionTemplate = (data: any) => {
        return (
            <div className="orders-subtable">
                <DataTable value={data.runs} expandedRows={expandedRowsLevel} onRowToggle={(e) => setExpandedRowsLevel(e.data)} header='Strategy Runs' showGridlines
                    rowExpansionTemplate={rowExpansionTemplateLevel}>
                    <Column expander style={{ width: '3em' }} />
                    <Column field="id" header="Id" sortable></Column>
                    <Column field="dateTimeBegin" header="Date Time Begin" sortable></Column>
                    <Column field="dateTimeEnd" header="Date Time End" sortable></Column>
                    <Column field="totalReturn" header="Total Return" sortable></Column>
                    <Column field="totalReturnPercentage" header="Total Return Percentage" sortable></Column>
                </DataTable>
            </div>
        );
    }

    const header = (
        <h2 style={{textAlign: 'center'}} className="table-header">
            Strategies Statistics
        </h2>
    );

    return (
        <div className="datatable-rowexpansion-demo">
            <div className="card">
                <DataTable value={products} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)} header={header} showGridlines
                    rowExpansionTemplate={rowExpansionTemplate} dataKey="id">
                    <Column expander style={{ width: '3em' }} />
                    <Column align='center' field="date" header="Date" sortable />
                    <Column align='center' field="numberOfRun" header="Number Of Run" sortable />
                    <Column align='center' field="totalReturn" header="Total Return" sortable />
                    <Column align='center' field="totalReturnPercentage" header="Total Return Percentage" sortable />
                </DataTable>
            </div>
        </div>
    );
}
