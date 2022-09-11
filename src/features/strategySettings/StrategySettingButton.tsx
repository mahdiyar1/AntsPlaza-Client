import React from 'react';
import { observer } from 'mobx-react-lite';

import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

export default observer(function StrategySettingButton() {

    return (
        <Button color='green' as={Link} to='/strategy_setting' style={{ marginLeft: '10px' }} >Strategies Settings</Button>
    )
})