import React, { useState } from "react";
import {
	Switch,
	Route,
	Link,
	useLocation
} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faSearch, faBars, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from "react-router";
import './assets/dashboard.css';
import { setUser } from "./store/actions";
import { connect } from "react-redux";
import { store } from "./store";
import LocalStorage from 'local-storage';
import Home from "./screen/Home";

function App({ dispatchSignin }) {
	const history = useHistory();
	const locationInfo = useLocation();

	return (
		<>
			<div className="container">
				<Switch>
					<Route path="/" children={<Home />} />
				</Switch>
			</div>
		</>
	);
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
	dispatchSignin: data => dispatch(setUser(data)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(App);
