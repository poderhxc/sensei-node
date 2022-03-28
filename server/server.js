import express from 'express';
import fs from 'fs';
import path from 'path';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import App from '../src/App';

const PORT = "7000";

const app = express();

const ServerApp = () => {
    return (
        <StaticRouter>
            <App />
        </StaticRouter>
    );
}

app.use('/', (req, res) => {
    fs.readFile(path.resolve('./dist/index.html'), 'utf8', (err, data) => {
        if(err){
            console.log(err);
            return res.status(500).send('Something went wrong!');
        }
        return res.send(
            data.replace(
            '<div id="root"></div>', 
            `<div id="root">${ReactDOMServer.renderToString(<ServerApp />)}</div>`
            )
        );
    });
});

app.use(express.static(path.resolve(__dirname, '..', 'dist')));

app.listen(PORT, () => {
    console.log(`App launched on http://localhost:${PORT}`);
})
