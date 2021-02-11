import React from 'react';

import Store from './Store';


Store.Mutation("s1", "set", (data)=>{
  return data
})

Store.Mutation("s1", "++", ()=>{
  return Store.Get("s1").data + 1
})

Store.Mutation("debugData", "set", (data)=>{
  return data
})

Store.Action("debugData", "counter", ()=>{
  let counter = 0
  return new Promise((resolve, reject) => {
    setInterval(
      () => {
        counter++
        Store.Commit("debugData", "set", counter)
        resolve(counter)
      },
      200
    ); 
  }) 
})

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

        Store.Subscribe("s1", (store)=>{
          this.setState(state => ({dt: store.data}));
        })

        Store.Dispatch("debugData", "counter").then((data) => {
          console.log("Promice", data)
        });

        Store.Subscribe("l", (store)=>{
          this.setState(state => ({loaded: store}));
        })        

        this.timerID = setInterval(
          () => {
            this.count++
            Store.Commit("s1", "++")
          },
          300
        );
      }
    
      myMethod(p){
        //console.log("myMethod=" + new Date())
        Store.Dispatch("l", "load").then((data)=>{
          //console.log("Store.Dispatch('l', 'load') then data", data)
        });
        Store.Commit("debugData", "set", "myMethod");
        Store.Commit("s1", "set", -10);
        this.count = 0
        this.setState(state => ({newItem: "newItem"}));
        this.setState(state => ({newItem1: "newItem1"}));
      }

      componentWillUnmount() {
        clearInterval(this.timerID);
      }
    
     
    render() {

      return (
        <div className="component-sample">
            <p>ComponentSample</p>
            <p>this.props.value = "{this.props.value}"</p>
            <p>this.state.loaded = "{JSON.stringify(this.state.loaded)}"</p>
            <p>this.state.date = {this.state.date.toLocaleTimeString()}</p> 
            <button onClick={this.myMethod}>myMethod</button>
            <p>this.state = {JSON.stringify(this.state)}</p> 
            <p>this.state.newItem = {this.state.newItem}</p> 
           
        </div>  

      );
    }
}

export default ComponentSample;