import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  Legend,
} from "recharts";
import { useCallback, useState } from "react";
import { dataOfSupportServices } from "../../../../utils/consts";
import styled from "styled-components";

export default function SupportServicesChart() {
  const [activeIndex, setActiveIndex] = useState(2);
  const activeItem = dataOfSupportServices[activeIndex];
  const handleClick = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  return (
    <Container>
      <BarChart
        width={600}
        height={550}
        data={dataOfSupportServices}
        margin={{
          top: 10,
          right: 50,
          left: 10,
          bottom: 40,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" dy={25} interval={0} angle={-15} />
        <YAxis
          domain={[0, 100]}
          ticks={[0, 20, 40, 60, 80, 100]}
          label={{
            value: "단위(%)",
            position: "insideLeft",
            angle: -90,
            dx: -5,
          }}
          dx={-7}
        />
        <Tooltip />
        <Legend
          verticalAlign="top"
          height={30}
          align="right"
          iconType={"square"}
          iconSize={15}
        />
        <Bar dataKey="인지율" label={{ position: "top" }} onClick={handleClick}>
          {dataOfSupportServices.map((entry, index) => (
            <Cell
              cursor="pointer"
              fill={index === activeIndex ? "#3e4e34" : "#a7c097"}
              key={`cell-${index}`}
            />
          ))}
        </Bar>
      </BarChart>
      <Desc>{`[${activeItem.name} 의 인지율 ${activeItem.인지율}%]`}</Desc>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
`;

const Desc = styled.div`
  text-align: right;
  font-size: 15px;
  margin-right: 40px;
`;
