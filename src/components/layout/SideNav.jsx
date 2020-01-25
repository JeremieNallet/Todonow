import React, { Fragment as Key } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { animated as a } from 'react-spring';

// Assets / services
import { Timer, Tasks, Statistics, Logout } from '../../assets/svg/icons';

// Store
import { connect } from 'react-redux';
import { signoutUser, disconectGuestUser } from '../../store/actions/authActions';
import { closeNav } from '../../store/actions/UIActions';

//Components
import LockedLayout from '../layout/LockedLayout';

const SideNav = ({ signoutUser, disconectGuestUser, type, closeNav, style, guestUser }) => {
    const items = [
        {
            id: 1,
            title: 'My Timer',
            page: '/',
            icon: <Timer className="sidenav__link--icon" />
        },
        {
            id: 2,
            title: 'My todos',
            page: '/mytodos',
            icon: <Tasks className="sidenav__link--icon" />
        },
        {
            id: 3,
            title: 'My stats',
            page: '/statistics',
            icon: <Statistics className="sidenav__link--icon" />
        }
    ];
    const disconect = () => {
        if (guestUser) {
            disconectGuestUser();
        } else {
            signoutUser();
        }
    };
    const LinkItem = ({ title, page, icon, onClick }) => (
        <li className="sidenav__list-item">
            <NavLink
                onClick={onClick}
                exact
                to={page}
                className="sidenav__link"
                activeClassName="active"
            >
                {icon}
                <span className="sidenav__link--title">{title}</span>
            </NavLink>
        </li>
    );

    return (
        <a.div style={style} className={`sidenav-container ${type}`}>
            <LockedLayout className="sidenav-container__top">
                <nav className="sidenav">
                    <ul className="sidenav__list">
                        {items.map((_, i) => (
                            <Key key={i}>
                                <LinkItem
                                    onClick={closeNav}
                                    title={_.title}
                                    icon={_.icon}
                                    page={_.page}
                                />
                            </Key>
                        ))}
                    </ul>
                </nav>
            </LockedLayout>
            <LockedLayout className="sidenav-container__bottom">
                <button onClick={() => disconect()} className="sidenav__link">
                    <Logout className="sidenav__link--icon solid" />
                    <span className="sidenav__link--title solid">Logout</span>
                </button>
            </LockedLayout>
        </a.div>
    );
};
SideNav.propTypes = {
    signoutUser: PropTypes.func,
    type: PropTypes.string,
    closeNav: PropTypes.func,
    style: PropTypes.object,
    title: PropTypes.string,
    page: PropTypes.string,
    icon: PropTypes.node,
    onClick: PropTypes.func
};
const mapStateToProps = ({ auth }) => ({
    guestUser: auth.guestUser
});
const mapDispatchToProps = {
    signoutUser,
    disconectGuestUser,
    closeNav
};

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
