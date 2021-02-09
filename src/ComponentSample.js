import React from 'react';

import Store from './MyClass';

class ComponentSample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          p1: 1, p2: 1, date: new Date(), dt: "dt", loaded: "ini_value"
        };
        this.myMethod = this.myMethod.bind(this);


      }  

      count = 0

      componentDidMount() {

        Store.Subscribe("s1", (data)=>{
          this.setState(state => ({dt: data}));
        })

        Store.Subscribe("loaded", (data)=>{
          this.setState(state => ({loaded: data[1].id}));
        })        

        this.timerID = setInterval(
          () => {
            this.count++
            Store.Data("s1", this.count)
          },
          200
        );
      }
    
      myMethod(p){
        console.log("myMethod=" + new Date())
        Store.Load("loaded", "data.json");

        Store.Data("s1", -10);
        this.count = 0
      }

      componentWillUnmount() {
        clearInterval(this.timerID);
      }
    
     
    render() {

      return (
        <div className="ComponentSample">
            <p>ComponentSample</p>
            <p>this.props.value = "{this.props.value}"</p>
            <p>this.state.loaded = "{this.state.loaded}"</p>
            <p>this.state.date = {this.state.date.toLocaleTimeString()}</p> 
            <button onClick={this.myMethod}>myMethod</button>
            <p>this.state.dt = {this.state.dt}</p> 
            
           
        </div>  

      );
    }
}

export default ComponentSample;