import React from 'react'
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LabelList,
  Tooltip,
} from 'recharts'

const PieChartComponent = ({ data }) => {
  const COLORS = [
    'var(--green-dark)',
    'var(--primary-900)',
    'var(--primary-500)',
    'var(--grey-600)',
    'var(--red-dark)',
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart width={730} height={250}>
        <Tooltip />
        <Pie
          data={data}
          dataKey="count"
          nameKey="_id"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#000"
          label
          labelList
        >
          <LabelList dataKey="_id" fill="#000" />
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              color="#000"
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default PieChartComponent
