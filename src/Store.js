
const _STORE = {}
const _CALLBACKS = {}
const _MUTATIONS = {}
const _ACTIONS = {}

function _ini(name){
    _STORE[name] = {name: name, data:null, meta: {loaded: null, saved: null, changed: null} }
    _CALLBACKS[name] = []
    _MUTATIONS[name] = {}
    _ACTIONS[name] = {}
}

function _data(name, data){
    if(!_STORE[name]) _ini(name)
    
    if(data !== undefined){
        _STORE[name].data = data;
        _STORE[name].meta.changed = new Date()
        _CALLBACKS[name].forEach(callBack => {
            callBack(_STORE[name])
        });
    }
    
    return _STORE[name].data
}

class Store {

    Mutation(storeName, mutationName, fn){
        if(!_STORE[storeName]) _ini(storeName)
        
        if(fn){
            _MUTATIONS[storeName][mutationName] = fn
        }        
    }

    Commit(storeName, mutationName, data){
        if(!_STORE[storeName]) _ini(storeName)
        
        if(_MUTATIONS[storeName][mutationName]){

            _data(storeName, _MUTATIONS[storeName][mutationName](data))
        }
    }

    Action(storeName, actionName, fn){
        if(!_STORE[storeName]) _ini(storeName)
        
        if(fn){
            _ACTIONS[storeName][actionName] = fn
        }
    }

    Dispatch(storeName, actionName, data){
        if(!_STORE[storeName]) _ini(storeName)
        
        if(_ACTIONS[storeName][actionName]){
            //console.log("Commit ", storeName, mutationName, data)
            return _ACTIONS[storeName][actionName](data)
        }        
    }

    Get(storeName){
        if(!_STORE[storeName]) _ini(storeName)

        return Object.assign({}, _STORE[storeName]); 
    }

    Subscribe(name, callBack){
        if(!_STORE[name]) _ini(name)

        _CALLBACKS[name].push(callBack)
    }

    Load(name, url){
        if(!_STORE[name]) _ini(name)

        const p = fetch(url)
        .then(res => res.json());
        p.then(
          (result) => {
            _STORE[name].meta.loaded = new Date()  
            _data(name, result)
          },
            (error) => {
                console.log(error)
          }
        )
        return p              
    }

}

const item = new Store()

export default item;