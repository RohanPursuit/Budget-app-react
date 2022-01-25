import EditTransaction from "../components/EditTransaction"
import {useParams} from "react-router-dom"

function Edit() {
    const {index} = useParams()
    return (
        <div>
            <h2>Edit</h2>
            <EditTransaction index={index}/>
        </div>
    )
}

export default Edit