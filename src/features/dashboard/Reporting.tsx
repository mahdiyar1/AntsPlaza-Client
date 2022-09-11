import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

export default function Reporting() {
    const data = [
        { "id": "1000", "date": "2022-07-01", "numberOfRun": 65, "totalReturn": 24, "totalReturnPercentage": 5, "orders": [{ "id": "1000", "productCode": "f230fh0g3", "date": "2020-09-13", "amount": 65, "totalReturn": 1, "customer": "David James", "status": "PENDING" }, { "id": "1001", "productCode": "f230fh0g3", "date": "2020-05-14", "amount": 130, "totalReturn": 2, "customer": "Leon Rodrigues", "status": "DELIVERED" }, { "id": "1002", "productCode": "f230fh0g3", "date": "2019-01-04", "amount": 65, "totalReturn": 1, "customer": "Juan Alejandro", "status": "RETURNED" }, { "id": "1003", "productCode": "f230fh0g3", "date": "2020-09-13", "amount": 195, "totalReturn": 3, "customer": "Claire Morrow", "status": "CANCELLED" }] },
        { "id": "1001", "date": "2022-07-02", "numberOfRun": 72, "totalReturn": 61, "totalReturnPercentage": 4, "orders": [{ "id": "2000", "productCode": "nvklal433", "date": "2020-05-14", "amount": 72, "totalReturn": 1, "customer": "Maisha Jefferson", "status": "DELIVERED" }, { "id": "2001", "productCode": "nvklal433", "date": "2020-02-28", "amount": 144, "totalReturn": 2, "customer": "Octavia Murillo", "status": "PENDING" }] },
        { "id": "1002", "date": "2022-07-03", "numberOfRun": 79, "totalReturn": 2, "totalReturnPercentage": 3, "orders": [{ "id": "3000", "productCode": "zz21cz3c1", "date": "2020-07-05", "amount": 79, "totalReturn": 1, "customer": "Stacey Leja", "status": "DELIVERED" }, { "id": "3001", "productCode": "zz21cz3c1", "date": "2020-02-06", "amount": 79, "totalReturn": 1, "customer": "Ashley Wickens", "status": "DELIVERED" }] },
        { "id": "1003", "date": "2022-07-04", "numberOfRun": 29, "totalReturn": 25, "totalReturnPercentage": 5, "orders": [] },
        { "id": "1004", "date": "2022-07-05", "numberOfRun": 15, "totalReturn": 73, "totalReturnPercentage": 4, "orders": [{ "id": "5000", "productCode": "h456wer53", "date": "2020-09-05", "amount": 60, "totalReturn": 4, "customer": "Mayumi Misaki", "status": "PENDING" }, { "id": "5001", "productCode": "h456wer53", "date": "2019-04-16", "amount": 2, "totalReturn": 30, "customer": "Francesco Salvatore", "status": "DELIVERED" }] },
        { "id": "1005", "date": "2022-07-06", "numberOfRun": 120, "totalReturn": 0, "totalReturnPercentage": 4, "orders": [{ "id": "6000", "productCode": "av2231fwg", "date": "2020-01-25", "amount": 120, "totalReturn": 1, "customer": "Isabel Sinclair", "status": "RETURNED" }, { "id": "6001", "productCode": "av2231fwg", "date": "2019-03-12", "amount": 240, "totalReturn": 2, "customer": "Lionel Clifford", "status": "DELIVERED" }, { "id": "6002", "productCode": "av2231fwg", "date": "2019-05-05", "amount": 120, "totalReturn": 1, "customer": "Cody Chavez", "status": "DELIVERED" }] },
        { "id": "1006", "date": "2022-07-07", "numberOfRun": 32, "totalReturn": 5, "totalReturnPercentage": 3, "orders": [{ "id": "7000", "productCode": "bib36pfvm", "date": "2020-02-24", "amount": 32, "totalReturn": 1, "customer": "Arvin Darci", "status": "DELIVERED" }, { "id": "7001", "productCode": "bib36pfvm", "date": "2020-01-14", "amount": 64, "totalReturn": 2, "customer": "Izzy Jones", "status": "PENDING" }] },
        { "id": "1007", "date": "2022-07-08", "numberOfRun": 34, "totalReturn": 23, "totalReturnPercentage": 5, "orders": [{ "id": "8000", "productCode": "mbvjkgip5", "date": "2020-06-19", "amount": 34, "totalReturn": 1, "customer": "Jennifer Smith", "status": "DELIVERED" }] },
        { "id": "1008", "date": "2022-07-09", "numberOfRun": 99, "totalReturn": 2, "totalReturnPercentage": 4, "orders": [{ "id": "9000", "productCode": "vbb124btr", "date": "2020-01-05", "amount": 99, "totalReturn": 1, "customer": "Jeanfrancois David", "status": "DELIVERED" }, { "id": "9001", "productCode": "vbb124btr", "date": "2020-01-19", "amount": 198, "totalReturn": 2, "customer": "Ivar Greenwood", "status": "RETURNED" }] },
        { "id": "1009", "date": "2022-07-10", "numberOfRun": 299, "totalReturn": 63, "totalReturnPercentage": 3, "orders": [{ "id": "10000", "productCode": "cm230f032", "date": "2020-06-24", "amount": 299, "totalReturn": 1, "customer": "Kadeem Mujtaba", "status": "PENDING" }, { "id": "10001", "productCode": "cm230f032", "date": "2020-05-11", "amount": 299, "totalReturn": 1, "customer": "Ashley Wickens", "status": "DELIVERED" }, { "id": "10002", "productCode": "cm230f032", "date": "2019-02-07", "amount": 299, "totalReturn": 1, "customer": "Julie Johnson", "status": "DELIVERED" }, { "id": "10003", "productCode": "cm230f032", "date": "2020-04-26", "amount": 299, "totalReturn": 1, "customer": "Tony Costa", "status": "CANCELLED" }] }
    ];

    const [expandedRows, setExpandedRows] = useState(null);

    const rowExpansionTemplate = (data: { orders: any[] | undefined; }) => {
        return (
            <div className="orders-subtable">
                <DataTable value={data.orders} responsiveLayout="scroll">
                    <Column field="id" header="Id" sortable></Column>
                    <Column field="customer" header="Customer" sortable></Column>
                    <Column field="date" header="Date" sortable></Column>
                </DataTable>
            </div>
        );
    }

    return (
        <div className="datatable-rowexpansion-demo">
            <div className="card">
                <DataTable value={data} header='Strategies Statistics' showGridlines rowExpansionTemplate={rowExpansionTemplate} dataKey="id">
                    <Column align='center'  expander style={{ width: '3em' }} />
                    <Column align='center' field="date" header="Date" sortable />
                    <Column align='center' field="numberOfRun" header="Number Of Run" sortable />
                    <Column align='center' field="totalReturn" header="Total Return" sortable />
                    <Column align='center' field="totalReturnPercentage" header="Total Return Percentage" sortable />
                </DataTable>
            </div>
        </div>
    );
}
