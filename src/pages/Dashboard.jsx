import { useSelector } from "react-redux";
import { ToyChart } from "../cmps/Chart";


export function Dashboard() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    console.log(toys)
    const labelCounts = {}
    toys.forEach(toy => {
        toy.labels?.forEach(label => {
            labelCounts[label] = (labelCounts[label] || 0) + 1
        })
    })
    return (
        <section className="dashboard-container">
            <h1>Labels chart:</h1>
            <ToyChart labelCounts={labelCounts} />
        </section>
    )
}