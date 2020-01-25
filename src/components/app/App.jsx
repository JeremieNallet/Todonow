import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSpring } from 'react-spring';

// Store
import { connect } from 'react-redux';
import { toggleNav } from '../../store/actions/UIActions';

// Pages
import auth from '../../pages/Auth';
import preAuth from '../../pages/PreAuth';

// Components
import SideNav from '../layout/SideNav';
import SideNavCopy from '../layout/SideNav';
import Header from '../layout/Header';
import FallbackLoader from '../layout/FallbackLoader';

import statistics from '../../pages/Statistics';
import myTodos from '../../pages/MyTodos';

// Pages (lazy)
const dashboard = lazy(() => import('../../pages/Dashboard'));

const App = ({ isLoggedIn, isLoaded, toggleNav, isNavOpen, guest }) => {
    const ty = (ty = 0) => `translate3d(${ty}%, 0, 0)`;
    const props = useSpring({ transform: isNavOpen ? ty() : ty(-100) });

    return (
        <>
            {isLoggedIn || guest ? (
                <>
                    <Header isNavOpen={isNavOpen} onClick={() => toggleNav()} />
                    <SideNav />
                    <SideNavCopy style={props} type="fixed-copy" />
                    <Suspense fallback={<FallbackLoader />}>
                        <Switch>
                            <Route exact path="/" component={dashboard} />
                            <Route exact path="/mytodos" component={myTodos} />
                            <Route exact path="/statistics" component={statistics} />
                            <Redirect to="/" />
                        </Switch>
                    </Suspense>
                </>
            ) : (
                <>
                    <Switch>
                        <Route exact path="/" component={preAuth} />
                        <Route exact path="/auth" component={auth} />
                        {isLoaded && <Redirect to="/" />}
                    </Switch>
                </>
            )}
        </>
    );
};

App.propTypes = {
    isLoggedIn: PropTypes.string,
    isLoaded: PropTypes.bool,
    toggleNav: PropTypes.func,
    isNavOpen: PropTypes.bool
};

const mapStateToProps = ({ firebase, ui, auth }) => ({
    isNavOpen: ui.isNavOpen,
    isLoggedIn: firebase.auth.uid,
    isLoaded: firebase.auth.isLoaded,
    guest: auth.guestUser
});

const mapDispatchToProps = {
    toggleNav: toggleNav
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
