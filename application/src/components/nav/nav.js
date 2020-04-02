import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import "./nav.css";
import { logoutUser } from "../../redux/actions/authActions";

const Nav = (props) => {
    return (
        <div className="nav-strip">
            <Link to={"/order"} className="nav-link">
                <div className="nav-link-style">
                    <label className="nav-label">Order Form</label>
                </div>
            </Link>
            <Link to={"/view-orders"} className="nav-link" id="middle-link">
                <div className="nav-link-style">
                    <label className="nav-label">View Orders</label>
                </div>
            </Link>
            <Link to={"/login"} className="nav-link">
                <div className="nav-link-style" onClick={props.logout}>
                    <label className="nav-label">Log Out</label>
                </div>
            </Link>
        </div>
    );
}

const mapStateToProps = (state) => ({
    logout: state.auth
})

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logoutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav);