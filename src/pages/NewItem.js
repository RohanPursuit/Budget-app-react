import NewTransaction from "../components/NewTransaction"

function NewItem() {
    console.log("NewItem")
    return (
        <div>
            <h2>New</h2>
            <NewTransaction/>
        </div>
    )
}

export default NewItem