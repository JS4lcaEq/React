import Store from '../Store'

function fn() {
    Store.Mutation("l", "set", (data) => {
        return data
    })

    Store.Action("l", "load", () => {
        const p = fetch("data.json?t=" + Date.now())
            .then(res => res.json());
        p.then(
            (result) => {
                Store.Commit("l", "set", result)
            },
            (error) => {
                console.log(error)
            }
        )
        return p
    })
}

export default fn;