import * as React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { responseInterceptor } from "../../utils/responseInterceptor";
import * as paymentActions from "../../actions/paymentActions";
import { AppSharedProps } from "../../models/reduxModel";
import { Button } from "../common/elements/button";
import { TextBox } from "../common/elements/textBox";
import TitleBar from "../common/TitleBar";
import { PaymentModel } from "../../models/paymentModel";
import { luhnChk, isNumber, empty, lengthCheck } from "../../utils/cardUtil";
import { creditCardFormatter } from "../../utils/formatter";
import ErrorBanner from "../common/ErrorBanner";

interface PaymentProps extends AppSharedProps {
    actions: any;
    brandResult: any;
    paymentResult: any;
    statusResult: any;
}

interface PaymentState {
    payment: PaymentModel;
    errors: PaymentModel;
    errorExist: boolean;
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
            errors: {
                amount: "",
                card: "",
                expiry: "",
                postCode: ""
            },
            errorExist: false,
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
        const value = event.target.value;
        const payment = this.state.payment;

        if (field === "card") {

            if (value && isNumber(value) && value.length >= 4) {
                this.getBrand(value.substr(0, 4));
            }
            payment[field] = creditCardFormatter(value);

        } else if (field === "expiry" || field === "postCode") {
            if (isNumber(value)) {
                payment[field] = value;
            }
        } else {
            payment[field] = value;
        }
        this.setState({ payment: payment });
    }

    validateForm() {
        // reset errors upon click
        let formValidated = true;
        let errors = this.state.errors;
        errors = {
            amount: "",
            card: "",
            expiry: "",
            postCode: ""
        };

        if (empty(this.state.payment.amount)) {
            errors.amount = "Invalid Amount";
            formValidated = false;
        }
        if (!luhnChk(this.state.payment.card)) {
            errors.card = "Invalid Card";
            formValidated = false;
        }
        if (lengthCheck(this.state.payment.expiry, 4)) {
            errors.expiry = "Invalid Expiry Date";
            formValidated = false;
        }
        if (lengthCheck(this.state.payment.postCode, 4)) {
            errors.postCode = "Invalid Postal Code";
            formValidated = false;
        }

        this.setState({ errors: errors });
        return formValidated;
    }

    savePayment() {
        if (this.validateForm()) {
            this.setState({ errorExist: false });
            console.log("Save clicked", this.state.payment);
            this.createPayment(this.state.payment.amount);
        } else {
            this.setState({ errorExist: true });
        }
    }

    // Life Cyle Events-----------------------------------------
    render() {
        return (
            <div className="payment-container">
                {this.state.errorExist && <ErrorBanner errors={this.state.errors} />}
                <div className="content">
                    <TitleBar />
                    <div className="amount">
                        <TextBox
                            name="amount"
                            placeHolder="0.00"
                            currency="$"
                            className="input-amount"
                            error={this.state.errors.amount}
                            value={this.state.payment.amount}
                            onChange={this.inputChangeEvent}
                        /></div>
                    <div className="form-holder">
                        <TextBox
                            name="card"
                            error={this.state.errors.card}
                            placeHolder="0000 0000 0000 0000"
                            value={this.state.payment.card}
                            onChange={this.inputChangeEvent}
                        />
                        <TextBox
                            name="expiry"
                            placeHolder="Expiry Year"
                            className="half first"
                            error={this.state.errors.expiry}
                            value={this.state.payment.expiry}
                            max={4}
                            onChange={this.inputChangeEvent}
                        />
                        <TextBox
                            name="postCode"
                            placeHolder="Post Code"
                            className="half"
                            error={this.state.errors.postCode}
                            value={this.state.payment.postCode}
                            max={4}
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
                        label={"Pay" + (this.state.payment.amount ? (" $") + this.state.payment.amount : "") + (this.state.cardType ? (" with " + this.state.cardType) : "")}
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
