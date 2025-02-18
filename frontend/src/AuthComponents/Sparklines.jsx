import React from 'react'
import { LineChart, Line, ResponsiveContainer } from "recharts";

const Sparklines = ({data}) => {
    // console.log(data)
    
    return (
        <ResponsiveContainer width="100%" height={30}>
            <LineChart data={data.map((price, index) => ({ index, price }))}>
                <Line type="monotone" dataKey="price" stroke={'#22c55e'}   strokeWidth={3} dot={false} />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default Sparklines