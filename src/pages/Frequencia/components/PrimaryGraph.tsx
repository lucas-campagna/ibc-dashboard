import Chart from "../../../components/Chart";
import movingAverage, { TData } from "../../../utils/movingAverage";

type PrimaryGraphProps = {
  frequencia: any[];
  averageSize: number;
  onHover?: (props: any) => void;
};

function PrimaryGraph({ frequencia, averageSize, onHover }: PrimaryGraphProps) {
  const filteredFrequencia = frequencia.filter(
    (item: any) => new Date(item.Data).getDay() === 0
  );

  const x = filteredFrequencia.map((item: any) =>
    new Date(item.Data).toLocaleDateString()
  );

  const manha: TData[] = filteredFrequencia
    .map((item: any) => {
      let sum = 0;
      if (item["Horário"] === "manhã") {
        for (const key in item) {
          if (key !== "Data" && key !== "Horário" && key !== "Comentario") {
            sum += Number(item[key] || 0);
          }
        }
      }
      return sum;
    })
    .map((y: number, i: number) => ({ x: x[i], y }));
  const noite: TData[] = filteredFrequencia
    .map((item: any) => {
      let sum = 0;
      if (item["Horário"] === "noite") {
        for (const key in item) {
          if (key !== "Data" && key !== "Horário" && key !== "Comentario") {
            sum += Number(item[key] || 0);
          }
        }
      }
      return sum;
    })
    .map((y: number, i: number) => ({ x: x[i], y }));

  return (
    <Chart
      datasets={[
        {
          type: "bar",
          label: "manhã",
          data: manha.map(({y}) => y),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
        {
          type: "bar",
          label: "noite",
          data: noite.map(({y}) => y),
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          type: "line",
          label: "média manhã",
          data: movingAverage(manha, averageSize).map(({y}) => y),
          borderColor: "rgba(255, 99, 132, 1)",
          fill: false,
          tension: 0.1,
          pointRadius: 0,
        },
        {
          type: "line",
          label: "noite manhã",
          data: movingAverage(noite, averageSize).map(({y}) => y),
          borderColor: "rgba(54, 162, 235, 1)",
          fill: false,
          tension: 0.1,
          pointRadius: 0,
        },
      ]}
      labels={manha.map(({x}) => x)}
      options={{
        scales: {
          y: {
            type: "linear",
            position: "left",
            beginAtZero: true,
          },
        },
      }}
      onHover={({ x }) => filteredFrequencia[x] && onHover?.(filteredFrequencia[x])}
    />
  );
}

export default PrimaryGraph;
