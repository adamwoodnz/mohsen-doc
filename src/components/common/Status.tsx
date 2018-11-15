import * as React from "react";

export interface ErrorBannerProps {
    status?: string;
}

const Status: React.StatelessComponent<ErrorBannerProps> = (props: ErrorBannerProps): React.ReactElement<void> => {
    return (
        <div className="status-holder">
            <div className="status">{props.status}</div>
        </div>
    );
};

export default Status;
