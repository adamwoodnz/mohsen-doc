import * as React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "./elements/button";

const NotFound: React.StatelessComponent = (): React.ReactElement<void> => {
    return (
        <div className="notfound-container">
            <div className="content">
                <div className="header">404</div>
                <div className="desc">Page not found!</div>
                <div className="link">
                    <NavLink to="/">
                        <Button
                            label="Return Home"
                            onClick={() => true}
                        />
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
