import React from 'react';

import Store from './MyClass';

class MyComponent1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data: null
        };
    }  

    componentDidMount() {
        Store.Subscribe("s1", (data)=>{
          this.setState(state => ({data: data}));
        })
    }
    

    render() {
      return (
        <div className="MyComponent1">
            <p>this.state.data = {this.state.data}</p>           
        </div>  

      );
    }
}

export default MyComponent1;