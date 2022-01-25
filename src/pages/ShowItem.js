import SingleTransaction from "../components/SingleTransaction"
import {useParams} from "react-router-dom"

function ShowItem() {
    const {index} = useParams()
    return (
        <div>
            <h2>Show Single</h2>
            <SingleTransaction index={index}/>
        </div>
    )
}

export default ShowItem