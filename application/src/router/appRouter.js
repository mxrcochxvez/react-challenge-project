import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Main, Login, OrderForm, ViewOrders } from '../components';

const PrivateRoute = ({ Component, auth, ...rest }) => (
	<Route
		{...rest}
		render={props => {
			if (auth.token != null) {
				return <Component {...props} />;
			} else {
				return <Redirect to="/login" />;
			}
		}}
	/>
);

const AppRouter = (props) => {

  const { auth } = props;

  return (
    <Router>
      <Route path="/" exact component={Main} />
      <Route path="/login" exact component={Login} />
      {/* I had this set to a private route as well but I kept getting a bug where it would ask the
      user to sign in twice. */}
      <Route path="/order" exact component={OrderForm} />
      <PrivateRoute path="/view-orders" exact Component={ViewOrders} auth={auth} />
    </Router>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, null)(AppRouter);
