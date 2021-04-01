import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Child from './Child';

ReactDOM.render(
    <App>
        <div>
            <Child dataField="No.1" description="A child!" />
            <header>
                <Child dataField="No.2" description="Another child!" />
                <div>
                    <Child dataField="No.3" description="This is also child!" />
                </div>
            </header>
        </div>
    </App>, 
    document.getElementById('root')
);
