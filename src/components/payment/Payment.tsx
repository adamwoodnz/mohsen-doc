import * as React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { responseInterceptor } from "../../utils/responseInterceptor";
import * as paymentActions from "../../actions/paymentActions";
import { AppSharedProps } from "../../models/reduxModel";
import { Button } from "../common/elements/button";
import { TextBox } from "../common/elements/textBox";

interface PaymentProps extends AppSharedProps {
    actions: any;
    brandResult: any;
    paymentResult: any;
    statusResult: any;
}

interface PaymentState {
    payment: {
        amount: string;
        card: string;
        expiry: string;
        postCode: string;
        note?: string;
    };
    cardType: string;
}

export class Payment extends React.Component<PaymentProps, PaymentState>  {
    constructor(props: PaymentProps) {
        super(props);

        this.state = {
            payment: {
                amount: "",
                card: "",
                expiry: "",
                postCode: "",
                note: ""
            },
            cardType: ""
        };

        this.inputChangeEvent = this.inputChangeEvent.bind(this);
        this.savePayment = this.savePayment.bind(this);
    }

    // API Calls-----------------------------------------------
    getBrand(digits: number) {
        this.props.actions.getCardBrandAction(digits)
            .then(() => {
                responseInterceptor(
                    this.props.brandResult,
                    (data: any): void => {
                        console.log("brand success", data);
                        this.setState({ cardType: data });
                    },
                    (error: any): void => {
                        console.error("Something went wrong, we cant get brand", error);
                    },
                    this.props.history
                );
            });
    }

    createPayment(amount: string) {
        this.props.actions.createPaymentAction(amount)
            .then(() => {
                responseInterceptor(
                    this.props.paymentResult,
                    (data: any): void => {
                        console.log("payment success with ID: ", data);
                        this.getStatus(data);
                    },
                    (error: any): void => {
                        console.error("Something went wrong, we cant get payment", error);
                    },
                    this.props.history
                );
            });
    }

    getStatus(id: string) {
        this.props.actions.paymentStatusAction(id)
            .then(() => {
                responseInterceptor(
                    this.props.statusResult,
                    (data: any): void => {
                        console.log("Status success", data);
                        alert("Your payment Status: " + data);
                    },
                    (error: any): void => {
                        console.error("Something went wrong, we cant get status", error);
                    },
                    this.props.history
                );
            });
    }

    // Events---------------------------------------------------
    inputChangeEvent(event: any) {
        const field = event.target.name;
        const payment = this.state.payment;

        if (field === "card") {
            if (event.target.value && event.target.value.length === 4) {
                console.log("first card values", event.target.value);
                this.getBrand(event.target.value);
            }
        }
        payment[field] = event.target.value;
        this.setState({ payment: payment });
    }

    savePayment() {
        console.log("Btn clicked", this.state.payment);
        this.createPayment(this.state.payment.amount);
    }

    // Life Cyle Events-----------------------------------------
    render() {
        return (
            <div className="payment-container">
                <div className="content">
                    <div className="title">Pushpay</div>
                    <div className="amount">
                        <span className="type">$</span>
                        <TextBox
                            name="amount"
                            placeHolder="0.00"
                            value={this.state.payment.amount}
                            onChange={this.inputChangeEvent}
                        /></div>
                    <div className="form-holder">
                        <TextBox
                            name="card"
                            placeHolder="0000 0000 0000 0000"
                            value={this.state.payment.card}
                            onChange={this.inputChangeEvent}
                        />
                        <TextBox
                            name="expiry"
                            placeHolder="Expiry Year"
                            value={this.state.payment.expiry}
                            onChange={this.inputChangeEvent}
                        />
                        <TextBox
                            name="postCode"
                            placeHolder="Post Code"
                            value={this.state.payment.postCode}
                            onChange={this.inputChangeEvent}
                        />
                        <TextBox
                            name="note"
                            placeHolder="Optional Note"
                            value={this.state.payment.note}
                            onChange={this.inputChangeEvent}
                        />
                    </div>
                    <Button
                        label={"Pay $" + this.state.payment.amount + (this.state.cardType ? (" with " + this.state.cardType) : "")}
                        onClick={this.savePayment}
                    />
                </div>
            </div >
        );
    }
}

function mapStateToProps(state: any) {
    return {
        brandResult: state.brandResponse,
        paymentResult: state.paymentResponse,
        statusResult: state.statusResponse
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        actions: bindActionCreators(paymentActions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Payment));
