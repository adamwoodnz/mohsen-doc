import * as React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { responseInterceptor } from "../../utils/responseInterceptor";
import { AppSharedProps } from "../../models/reduxModel";

interface StatisticContainerProps extends AppSharedProps {
    actions: any;
    contactResult: any;
}

export class Payment extends React.Component<StatisticContainerProps, any>  {
    constructor(props: StatisticContainerProps) {
        super(props);

    }

    render() {
        return (
            <div className="payment-container">
                Payment
            </div >
        );
    }
}

function mapStateToProps(state: any) {
    return {
    };
}

export default withRouter(connect(mapStateToProps)(Payment));
