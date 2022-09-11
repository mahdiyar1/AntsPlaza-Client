import React from 'react'
import { observer } from 'mobx-react-lite'
import { Segment } from 'semantic-ui-react'

export default observer(function Report() {
    return (
        <Segment>
            <iframe
                width="1100"
                height="900"
                src="https://datastudio.google.com/embed/reporting/cd2cbaf2-1f2d-43e2-8c8d-b13ffac989e2/page/6zXD"
            />
        </Segment>
    )
})