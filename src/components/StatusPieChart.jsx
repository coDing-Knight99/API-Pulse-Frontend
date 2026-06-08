import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#22c55e", // 200
  "#3b82f6", // 201
  "#f59e0b", // 4xx
  "#ef4444", // 5xx
  "#8b5cf6",
  "#06b6d4",
];
const getStatusCodePieData = (metrics) => {
  if (!metrics) return [];

  return Object.entries(metrics)
    .filter(([key]) => key.startsWith("statusCode:"))
    .map(([key, value]) => ({
      name: key.replace("statusCode:", ""),
      value: Number(value),
    }));
};
const StatusCodePieChart = ({ data, title }) => {
    data=getStatusCodePieData(data);
    if(data.length===0)    {
        return (
            <section className="rounded-lg border border-[#20202a] bg-[#0b0b12] p-5">
              <h2 className="mb-4 text-lg font-semibold text-white">
                {title}
              </h2>
              <div className="flex h-72 items-center justify-center text-slate-400">
                No data available
              </div>
            </section>
          );
    } 
  return (
    <section className="rounded-lg border border-[#20202a] bg-[#0b0b12] p-5">
      <h2 className="mb-4 text-lg font-semibold text-white">
        {title}
      </h2>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#09090f",
                border: "1px solid #20202a",
                borderRadius: "8px",
                color: "#fff",
              }}
            />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default StatusCodePieChart;