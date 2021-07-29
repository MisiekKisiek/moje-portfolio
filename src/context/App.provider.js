import React, {Component} from 'react';

//Context
import AppContext, {defaultValue} from './App.context';

class AppProvider extends Component {
    constructor(props){
        super(props);
        this.state = defaultValue;
    }
    render() { 
        return ( <>
        
            </>);
    }
}
 
export default AppProvider;