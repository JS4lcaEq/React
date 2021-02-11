import React from 'react';

import Store from './Store';


class DebugComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data: null
        };
        this.myMethod = this.myMethod.bind(this);


      }  

      componentDidMount() { 

        //console.log("DebugComponent componentDidMount this.props.debugDataStoreName=" + this.props.debugDataStoreName )

        Store.Subscribe(this.props.debugDataStoreName, (store)=>{
            //console.log("DebugComponent Subscribe ", store.data);
            this.setState(state => ({data: store.data}));
            
          })

      }
    
      myMethod(p){
        console.log("myMethod=" + new Date())

      }

      componentWillUnmount() {
        console.log("componentWillUnmount" + new Date())
      }
    
     
    render() {

      return (
        <div className="debug-component">
            <p>debug-component</p>
           <p>debugDataStoreName={this.props.debugDataStoreName}</p>
           <p>counter={this.state.data}</p>
        </div>  

      );
    }
}

export default DebugComponent;