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
    cardValue: string;
    expiry: string;
    postCode: string;
    note: string;
}

export class Payment extends React.Component<PaymentProps, PaymentState>  {
    constructor(props: PaymentProps) {
        super(props);

        this.state = {
            cardValue: "",
            expiry: "",
            postCode: "",
            note: ""
        };

    }

    // API Calls-----------------------------------------------
    getBrand(digits: number) {
        this.props.actions.getCardBrandAction(digits)
            .then(() => {
                responseInterceptor(
                    this.props.brandResult,
                    (data: any): void => {
                        console.log("brand success", data);
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
                        console.log("payment success", data);
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
                    this.props.brandResult,
                    (data: any): void => {
                        console.log("Status success", data);
                    },
                    (error: any): void => {
                        console.error("Something went wrong, we cant get status", error);
                    },
                    this.props.history
                );
            });
    }

    // Life Cyle Events-----------------------------------------
    render() {
        return (
            <div className="payment-container">
                <div className="content">
                    <div className="title">Pushpay</div>
                    <div className="amount">$0.00</div>
                    <div className="form-holder">
                        <TextBox
                            name="card"
                            placeHolder="0000 0000 0000 0000"
                            value={this.state.cardValue}
                            onChange={(event) => { this.setState({ cardValue: event.target.value }); }}
                        />
                        <TextBox
                            name="year"
                            placeHolder="Expiry Year"
                            value={this.state.expiry}
                            onChange={(event) => { this.setState({ expiry: event.target.value }); }}
                        />
                        <TextBox
                            name="postcode"
                            placeHolder="Post Code"
                            value={this.state.postCode}
                            onChange={(event) => { this.setState({ postCode: event.target.value }); }}
                        />
                        <TextBox
                            name="note"
                            placeHolder="Optional Note"
                            value={this.state.note}
                            onChange={(event) => { this.setState({ note: event.target.value }); }}
                        />
                    </div>
                    <Button
                        label="Pay"
                        onClick={() => { alert("Button Clicked"); }}
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
