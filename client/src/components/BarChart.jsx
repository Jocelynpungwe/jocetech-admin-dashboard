import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
const BarChartContainer = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20 }}>
        <CartesianGrid strokeDasharray="3 3 " />
        <XAxis dataKey="_id" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="var(--secondy-chocolate)" barSize={35} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarChartContainer
