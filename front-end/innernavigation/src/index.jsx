import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

chayns.ready
    .then(() => {
        try {
            ReactDOM.render(<App />, document.querySelector('#root'));
        } catch (e) {
            console.error('Encountered error at `ReactDOM.render`: ', e);
        }
    })
    .catch((error) => {
        console.warn('No chayns environment found.', error);
    });
