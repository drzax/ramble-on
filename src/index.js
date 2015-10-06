import './vendor/hello.js';
import './vendor/hello.twitter.custom.js';
import './index.css';

import debounce from 'debounce';
import document from 'global/document';
import {app} from 'mercury';

import App from './components/App';

const model = App({
    text: localStorage.getItem('RambleOn_text'),
    counterName: localStorage.getItem('RambleOn_counterName'),
    decoratorName: localStorage.getItem('RambleOn_decoratorName')
});

model.text(debounce((text) => {
    localStorage.setItem('RambleOn_text', text);
}, 500));

model.counterName((counterName) => {
    localStorage.setItem('RambleOn_counterName', counterName);
});

model.decoratorName((decoratorName) => {
    localStorage.setItem('RambleOn_decoratorName', decoratorName);
});

app(document.body, model, App.render);
