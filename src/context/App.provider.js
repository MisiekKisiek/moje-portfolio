import React, {Component} from 'react';

//Context
import AppContext, {defaultValue} from './App.context';

class AppProvider extends Component {
    constructor(props){
        super(props);
        this.state = defaultValue;
    }

    componentDidMount(){
        window.addEventListener('scroll',()=>{
            const {oldScroll, newScroll} = this.state;
            this.setState({
                newScroll: window.pageYOffset,
            })

            if(oldScroll - newScroll < 0){
                this.setState({
                    scrollDirection: false,
                })
            } else if(oldScroll - newScroll >= 0){
                this.setState({
                    scrollDirection: true,
                })
            }

            this.setState({
                oldScroll: newScroll,
            })
        })
    }



    render() { 
        return ( <AppContext.Provider value={{
            scrollDirection: this.state.scrollDirection
          }}>
            {this.props.children}
          </AppContext.Provider>
        );
    }
}
 
export default AppProvider;