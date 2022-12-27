import { useEffect, useState } from "react"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const sampleData = [
    {
        month: "January"
    },
    {
        month: "February"
    },
    {
        month: "March"
    },
    {
        month: "April"
    },
    {
        month: "May"
    },
    {
        month: "June"
    },
    {
        month: "July"
    },
    {
        month: "August"
    },
    {
        month: "September"
    },
    {
        month: "October"
    },
    {
        month: "November"
    },
    {
        month: "December"
    }
]

const monthIndexMap = {
    "January": 0,
    "February": 1,
    "March": 2,
    "April": 3,
    "May": 4,
    "June": 5,
    "July": 6,
    "August": 7,
    "September": 8,
    "October": 9,
    "November": 10,
    "December": 11
}

// need to implement random colour selector

// const handleEmptyValues = (uniqueProducts, data) => {
//     if(data && data.length) {
//         let tempData = [...data]
//         data.map((d, index) => {
//             uniqueProducts.map((up, subIndex) => {
//                 if(!Object.keys(d).includes(up)) {
//                     data
//                 }
//             })
//         })
//     }
// }

const dataShaper = (filteredData) => {
    const uniqueProducts = []
    let tempData = [...sampleData]

    if(filteredData && filteredData.length) {
        filteredData.map((d, _index) => {
            if(!uniqueProducts.includes(d.product)) {
                uniqueProducts.push(d.product)
            }
        })
    }

    filteredData.map((d, _index) => {
        tempData[monthIndexMap[d.month]][d.product] = d.acv
    })

    // tempData = handleEmptyValues(uniqueProducts, tempData)
    return [tempData, uniqueProducts]
}

export function CustomLineChart({chartData}) {
    const [data, setData] = useState([])
    const [uniqueProducts, setUniqueProducts] = useState([])

    const updateData = () => {
        let [tempData, tempUniqueProducts] = dataShaper(chartData)
        if(tempUniqueProducts && tempUniqueProducts.length) {
            setUniqueProducts([...tempUniqueProducts])
        }
        if(tempData && tempData.length) {
            setData([...tempData])
        }
    }

    useEffect(() => {
        updateData()
    }, [chartData])

    useEffect(() => {
    }, [data])

    return (
        <LineChart width={1000} height={250} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            {
                uniqueProducts.map((up, index) => {
                    return (
                        <Line key={`line_${index}`} type="linear" dataKey={up} stroke="#8884d8" />
                    )
                })
            }
        </LineChart>
    )
}