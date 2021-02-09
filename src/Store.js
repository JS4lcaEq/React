
let store = {}
class Store {


    ini(name){
        store[name] = {data:null, callbacks:[], meta: {loaded: null, saved: null, changed: null} }
    }

    Data(name, data){
        if(!store[name]){
            this.ini(name)
        }
        if(data){
            store[name].data = data;
            store[name].changed = new Date()
            store[name].callbacks.forEach(callBack => {
                callBack(store[name])
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
            store[name].meta.loaded = new Date()  
            this.Data(name, result)
          },
            (error) => {
                console.log(error)
          }
        )              
    }
}

const item = new Store()

export default item;