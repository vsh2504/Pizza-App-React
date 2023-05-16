// Entry file
// Need to tell browser where our app is and where to load it (inside root id div)

import ReactDOM from 'react-dom';
import './Index.css';
import App from './App'

ReactDOM.render(
    <App />,
    document.getElementById('root')
);