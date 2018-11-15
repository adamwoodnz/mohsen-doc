import * as React from "react";

export interface ErrorBannerProps {
    errors?: any;
}

const ErrorBanner: React.StatelessComponent<ErrorBannerProps> = (props: ErrorBannerProps): React.ReactElement<void> => {
    return (
        <div className="error-banner">
            <ul>
                {props.errors && Object.keys(props.errors).length > 0 && Object.keys(props.errors).map((item, index) =>
                    <li key={index}>{(props.errors[item] !== "") ? <div className="values">{props.errors[item]}</div> : ""}</li>
                )}
            </ul>
        </div>
    );
};

export default ErrorBanner;
