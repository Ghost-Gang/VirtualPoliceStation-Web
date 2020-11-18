import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Index from './Index'
import Home from './Home'
import NewFir from './NewFir'
import VpsChat from './VpsChat'
import FirStatus from './FirStatus'


class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Index} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/home/new-fir" component={NewFir} />
                <Route exact path="/home/fir-status" component={FirStatus} />
                <Route exact path="/home/vps-chat" component={VpsChat} />
                <Route
                    render={function () {
                        return <h1>Not Found</h1>;
                    }}
                />
            </Switch>
        )
    }
}
export default Routes