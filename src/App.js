import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PageLR from "./LRcomponents/PageLR"

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <PageLR />
                </Route>
            </Switch>
        </Router>
    )
}