import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { dataOfReportRate } from "../../../../utils/consts";

//! Annotation 구현 안됨
// const Annotation = (props) => {
//   return (
//     <text
//       x={props.x}
//       y={props.y}
//       fill="#ff0000"
//       fontSize="10"
//       textAnchor="middle"
//       transform={`rotate(${props.rotation}, ${props.x}, ${props.y})`}
//     >
//       {props.text}
//     </text>
//   );
// };

export default function ReportRateChart() {
  return (
    <>
      <BarChart
        width={600}
        height={600}
        data={dataOfReportRate}
        margin={{
          top: 10,
          right: 50,
          left: 10,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" dy={5} unit={"년"} />
        <YAxis
          domain={[0, 30]}
          ticks={[0, 5, 10, 15, 20, 25, 30]}
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
        <Bar
          dataKey="가정폭력 신고 비율"
          fill="#3e4e34"
          barSize={50}
          label={{ position: "top" }}
        />
        {/* <Annotation rotation={12} x={150} y={150} text="2년간 2.2% 증가" /> */}
      </BarChart>
    </>
  );
}
