import React from 'react';
import { Helmet } from "react-helmet";
import GoogleFontLoader from 'react-google-font-loader';
import App from './App';

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
            <App/>

        </div>
    );
}

export default React.memo(StartApp);
