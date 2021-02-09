import React from 'react';

import Store from './Store';

class MyComponent1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data: null,
          meta: null
        };
    }  

    componentDidMount() {
        Store.Subscribe("s1", (store)=>{
          this.setState(state => ({data: store.data, meta: store.meta}));
        })
    }
    

    render() {
      return (
        <div className="MyComponent1">
            <p>MyComponent1 this.state.data = {this.state.data}</p>           
        </div>  

      );
    }
}

export default MyComponent1;