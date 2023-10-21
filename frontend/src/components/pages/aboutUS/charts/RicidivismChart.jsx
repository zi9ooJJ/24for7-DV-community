import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { dataOfRicidivism } from "../../../../utils/consts";

export default function RicidivismChart() {
  return (
    <>
      <BarChart
        width={700}
        height={550}
        data={dataOfRicidivism}
        margin={{
          top: 10,
          right: 50,
          left: 0,
          bottom: 50,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-45} tickMargin={30} interval={0} />
        <YAxis />
        <Tooltip />
        <Legend
          iconType={"square"}
          iconSize={10}
          verticalAlign="top"
          align="right"
          height={30}
        />
        <Bar
          dataKey="가정폭력 재발 신고건"
          stackId="a"
          fill="#3e4e34"
          animationBegin={0}
          animationDuration={500}
        />
        <Bar
          dataKey="전체신고건수"
          stackId="a"
          fill="#a7c097"
          animationBegin={0}
          animationDuration={500}
        />
      </BarChart>
    </>
  );
}
