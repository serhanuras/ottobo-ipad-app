import React from 'react';
import ReactDOM from "react-dom";
import { } from "react-router-dom";
import { Route, BrowserRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Container } from "react-bootstrap";
import GoogleFontLoader from 'react-google-font-loader';
import OrderPicking from './containers/order-picking-container/order-picking';
import Header from "./components/header";
import AsyncImport from "./components/async-import";


const AsyncUser = AsyncImport(() => {
    return import('./containers/user-container/user.js');
})

const StartApp = () => {

    return (
        <div className="App" style={{ fontFamily: 'Roboto' }}>
            <GoogleFontLoader
                fonts={[
                    {
                        font: 'Roboto',
                        weights: [400, '400i'],
                    },
                    {
                        font: 'Roboto Mono',
                        weights: [400, 700],
                    },
                ]}
                subsets={['cyrillic-ext', 'greek']}
            />
            <Helmet>
                <meta charSet="utf-8" />
                <title>Ottobo</title>
                <meta http-equiv="ScreenOrientation" content="autoRotate:disabled"></meta>
            </Helmet>


            <BrowserRouter>
                <div className="App" style={{ fontFamily: "Roboto" }}>
                    <Container fluid>
                        <Header />

                        <Route path="/" exact component={OrderPicking} />
                        <Route path="/users" component={AsyncUser} />
                    </Container>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default React.memo(StartApp);
