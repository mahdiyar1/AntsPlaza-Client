import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Container } from 'semantic-ui-react';
import ModalContainer from '../../common/modals/ModalContainer';
import ApiInformationTableEdit from '../../features/apiInformation/ApiInformationTableEdit';
import Dashboard from '../../features/dashboard/Dashboard';
import HomePage from '../../features/home/HomePage';
import OrdersTable from '../../features/orders/OrdersTable';
import Report from '../../features/report/Report';
import StrategySettingTableEdit from '../../features/strategySettings/StrategySettingTableEdit';
import ManualSymbolTableEdit from '../../features/symbol/ManualSymbolTableEdit';
import TradeSetting from '../../features/trading/Trading';
import LoginFrom from '../../features/users/LoginFrom';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import NavBar from './NavBar';

function App() {
  const location = useLocation();
  const { userStore, commonStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => {
        commonStore.setAppLoaded();
      });

    } else {
      commonStore.setAppLoaded();
      console.log('no token');
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />

  return (
    <>
      <ToastContainer position='bottom-right' theme='colored' />
      <ModalContainer />
      <Route exact path='/' component={HomePage} />
      <Route path={'/(.+)'} render={() => (
        <>
          <NavBar />
          <Container style={{ marginTop: '7em' }}>
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/orders' component={OrdersTable} />
              <Route exact path='/dashboard' component={Dashboard} />
              <Route exact path='/trading' component={TradeSetting} />
              <Route exact path='/strategy_setting' component={StrategySettingTableEdit} />
              <Route exact path='/dashboard' component={Dashboard} />
              <Route exact path='/report' component={Report} />
              <Route exact path='/symbols' component={ManualSymbolTableEdit} />
              <Route exact path='/api_setting' component={ApiInformationTableEdit} />
              {/* <Route path='/profiles/:username' component={ProfilePage} /> */}
              {/* <Route path='/errors' component={TestErrors} /> */}
              {/* <Route path='/server-error' component={ServerError} /> */}
              <Route path='/login' component={LoginFrom} />
              {/* <Route component={NotFound} /> */}
            </Switch>
          </Container>
        </>
      )} />
    </>
  );
}

export default observer(App);
