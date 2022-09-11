import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Divider, Header, Segment } from 'semantic-ui-react';
import agent from '../../app/api/agent';
import { useStore } from '../../app/stores/store';
import { toast } from "react-toastify";

interface Props {
    activeTask: any;
    symbolShort: string;
    symbolLong: string;
}

export default observer(function ConfirmSymbols(props: Props) {
    const { modalStore } = useStore()
    const [loading, setLoading] = useState(false)

    function handleSymbolSave() {
        setLoading(!loading)
        agent.strategyExecutionTaskSymbols.update(
            {
                'strategyExecutionTask': props.activeTask.id,
                'strategyExecutionTaskSymbolShort': props.symbolShort,
                'strategyExecutionTaskSymbolLong': props.symbolLong
            }).then(() => {
                setLoading(!loading)
                modalStore.closeModal()
                toast.success('Successfully Update Symbols')
            })

    }

    function handleCancel() {
        modalStore.closeModal();
    }

    return (
        <>
            <Header as='h2' content={props.activeTask.name.substring(0, 7)} color='teal' textAlign='center' />
            <Divider />

            <Segment inverted tertiary color='orange' >
                <Header as='h3' content={`Short Symbol: ${props.symbolShort}`} textAlign='center' />
            </Segment>
            <Segment inverted tertiary color='blue' style={{ textAlign: 'center' }} >
                <Header as='h3' content={`Long Symbol: ${props.symbolLong}`} textAlign='center' />
            </Segment>
            <Divider />

            <Button floated='right' size='big' positive circular icon='checkmark' type='submit' style={{ topMargin: 20, marginLeft: 20, marginBottom: 20 }}
                onClick={handleSymbolSave} loading={loading} />
            <Button floated='right' size='big' circular icon='close' color='red' style={{ topMargin: 20 }} onClick={handleCancel} />
        </>
    )
})