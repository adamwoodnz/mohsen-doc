import * as React from "react";
import { Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as Loadable from "react-loadable";
import Routing from "./Routing";
import * as routePaths from "../models/constants/routePaths";
import { Loader } from "./common/elements/loader";

// Here we are asynchronously loading components based on their path
const NotFound = Loadable({ loader: () => import("./common/NotFound"), loading: () => null });

interface AppProps {
    progress: number;
}

class App extends React.Component<AppProps, any>  {
    constructor(props: any) {
        super(props);

    }

    toggleSidebar(event): void {
        event.stopPropagation();
        if (this.state.sidebarToggle) {
            this.setState({ sidebarToggle: false });
        } else {
            this.setState({ sidebarToggle: true });
        }
    }

    closeSideMenu() {
        if (this.state.sidebarToggle) {
            this.setState({ sidebarToggle: false });
        }
    }

    render() {
        return (
            <div className="app-container">
                <Loader toggle={this.props.progress > 0} />

                <div className="route-holders">
                    <Switch>
                        <Routing path="/" exact={true} component={NotFound} props={null} />
                        <Routing path="*" component={NotFound} props={null} />
                    </Switch>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: any): { progress: number } {
    return { progress: state.ajaxCallsInProgress };
}
export default withRouter(connect(mapStateToProps)(App));
