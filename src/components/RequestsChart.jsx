import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const convertHourToIST = (utcHour) => {
  const date = new Date();

  date.setUTCHours(Number(utcHour), 0, 0, 0);

  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });
};

const LocalTimeTick = ({ x, y, payload }) => {
  if (!payload) return null;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        fill="#94a3b8"
        fontSize={12}
        fontWeight={500}
      >
        {convertHourToIST(payload.value)}
      </text>
    </g>
  );
};

const RequestsChart = ({ data = [] }) => {
  return (
    <section className="rounded-lg border border-[#20202a] bg-[#0b0b12] p-6 shadow-2xl shadow-black/10">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">
          Hourly Requests
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Request volume throughout the day (displayed in IST).
        </p>
      </div>

      <div className="h-80 w-full xl:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 12,
              right: 24,
              left: 0,
              bottom: 12,
            }}
          >
            <CartesianGrid
              stroke="#20202a"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="hour"
              axisLine={false}
              tickLine={false}
              tick={<LocalTimeTick />}
              interval={2}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#94a3b8",
                fontSize: 12,
              }}
            />

            <Tooltip
              cursor={{
                stroke: "#a855f7",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
              labelFormatter={(label) =>
                `Time: ${convertHourToIST(label)}`
              }
              formatter={(value) => [
                value,
                "Requests",
              ]}
              contentStyle={{
                backgroundColor: "#09090f",
                border: "1px solid #20202a",
                borderRadius: "8px",
                boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
                color: "#f8fafc",
              }}
              labelStyle={{
                color: "#cbd5e1",
                fontSize: 12,
                fontWeight: 600,
              }}
              itemStyle={{
                color: "#c084fc",
                fontSize: 12,
              }}
            />

            <Line
              type="monotone"
              dataKey="requests"
              stroke="#a855f7"
              strokeWidth={3}
              dot={{
                r: 3,
                fill: "#a855f7",
                stroke: "#0b0b12",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 6,
                fill: "#c084fc",
                stroke: "#ffffff",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default RequestsChart;
