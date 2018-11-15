import * as React from "react";

const logo: string = require("../../assets/images/logo.png");

const TitleBar: React.StatelessComponent = (): React.ReactElement<void> => {
    return (
        <div className="title-holder">
            <div className="header-logo">
                <img className="logo-icon" src={logo} />
            </div>
            <div className="header-title">Pushpay</div>
        </div>
    );
};

export default TitleBar;
