import { PieChart, Pie, Cell, Tooltip, Sector } from "recharts";
import React, { useCallback, useState, useMemo, useEffect } from "react";
import { dataOfArrested, colorsOfArrested } from "../../../../utils/consts";

const RADIAN = Math.PI / 180;
const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  // const sin = useMemo(() => Math.sin(-RADIAN * midAngle), [midAngle]);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <>
      <g>
        <text
          x={cx}
          y={cy}
          dy={8}
          textAnchor="middle"
          fill="#333"
          fontSize={20}
        >
          {"총 검거 인원 254,728명"}
          {"총 검거 인원 254,728명" && (
            <tspan fontSize={15} fill={"#333"} x={cx} y={cy} dy={36}>
              (구속: 1,969명 / 불구속 : 252,759명)
            </tspan>
          )}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`${payload.name} ${(percent * 100).toFixed(2)}%`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(${payload.desc})`}
        </text>
      </g>
    </>
  );
};

export default function ArrestedChart() {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  // useEffect(() => {
  //   console.log(React.isValidElement(RenderActiveShape()));
  // }, []);
  return (
    <>
      <PieChart width={700} height={550}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={dataOfArrested}
          cx={350}
          cy={250}
          innerRadius={140}
          outerRadius={190}
          startAngle={50}
          endAngle={450}
          dataKey="value"
          onMouseEnter={onPieEnter}
        >
          {dataOfArrested.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colorsOfArrested[index % colorsOfArrested.length]}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </>
  );
}
