import { PieChart, Pie, Cell, Legend } from "recharts";
import {
  dataOfSurveyResults,
  colorsOfSurveyResults,
} from "../../../../utils/consts";

const percentFormat = (value) => `${value}%`;

export default function SurveyResultsChart() {
  return (
    <>
      <PieChart width={600} height={300}>
        <Pie
          data={dataOfSurveyResults}
          cx={"50%"}
          cy={"70%"}
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={100}
          paddingAngle={5}
          dataKey="value"
          label={({ value }) => `${percentFormat(value)}`}
        >
          {dataOfSurveyResults.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colorsOfSurveyResults[index % colorsOfSurveyResults.length]}
            />
          ))}
        </Pie>
        <Legend layout="vertical" align="center" iconType="rect" />
      </PieChart>
    </>
  );
}
