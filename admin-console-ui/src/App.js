import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import DashboardLayout from './layouts/DashboardLayout';
import Login from './views/pages/login';

import './vibe/scss/styles.scss';
import Widgets from './views/pages/Widgets';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>

        <Route component={DashboardLayout} />

      </Switch>
    </BrowserRouter>
  );
}
