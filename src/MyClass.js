
    let store = {}
class Store {


    ini(name){
        store[name] = {data:null, callbacks:[], loaded: null, saved: null, changed: null}
    }

    Data(name, data){
        if(!store[name]){
            this.ini(name)
        }
        if(data){
            store[name].data = data;
            store[name].callbacks.forEach(callBack => {
                callBack(store[name].data)
            });
        }
        return store[name].data
    }

    Subscribe(name, callBack){
        if(!store[name]){
            this.ini(name)
        }
        store[name].callbacks.push(callBack)

    }

    Load(name, url){
        const self = this
        if(!store[name]){
            this.ini(name)
        }
        fetch(url)
        .then(res => res.json())
        .then(
          (result) => {
            store[name].data = result
            store[name]
          },
            (error) => {
          }
        )              
    }
}

const item = new Store()

export default item;