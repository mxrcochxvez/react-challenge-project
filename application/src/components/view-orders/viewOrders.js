import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Template } from '../../components';
import { SERVER_IP } from '../../private';
import './viewOrders.css';

class ViewOrders extends Component {
    state = {
        orders: []
    }

    componentDidMount() {
        fetch(`${SERVER_IP}/api/current-orders`)
            .then(response => response.json())
            .then(response => {
                if (response.success) {
                    this.setState({ orders: response.orders });
                } else {
                    console.log('Error getting orders');
                }
            });
    }

    deleteOrder = userId => {
        //When the order gets deleted, you have to refresh the page 
        fetch(`${SERVER_IP}/api/delete-order`, { method: "post", headers: { "Accept": "application/json", "Content-type": "application/json" }, body: JSON.stringify({ id: userId }) })
            .then(response => response.json());
        //This is what I tried to use to fix the refresh issue. This did not work.
        this.forceUpdate();
    }

    pushOrder = (order) => {
        this.props.history.push({
            pathname: '/order',
            state: order
        })
    }

    render() {
        return (
            <Template>
                <div className="container-fluid">
                    {this.state.orders.map(order => {
                        const createdDate = new Date(order.createdAt);
                        return (
                            <div className="row view-order-container" key={order._id}>
                                <div className="col-md-4 view-order-left-col p-3">
                                    <h2>{order.order_item}</h2>
                                    <p>Ordered by: {order.ordered_by || ''}</p>
                                </div>
                                <div className="col-md-4 d-flex view-order-middle-col">
                                    <p>Order placed at {`${createdDate.getHours()}:${(createdDate.getMinutes() < 10 ? '0' : '') + createdDate.getMinutes()}:${createdDate.getSeconds()}`}</p>
                                    <p>Quantity: {order.quantity}</p>
                                </div>
                                <div className="col-md-4 view-order-right-col">
                                    <button className="btn btn-success" onClick={() => this.pushOrder(order)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => this.deleteOrder(order._id)}>Delete</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Template>
        );
    }
}

export default withRouter(ViewOrders);
