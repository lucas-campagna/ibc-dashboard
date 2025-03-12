import { useState } from "react";
import RequestAccessCode from "../../components/RequestAccessCode";
import Chart from "../../components/Chart";
import Menu from "../../components/Menu";
import movingAverage, { TData } from "../../utils/movingAverage";
import NumberInput from "../../components/NumberInput";

const Frequencia = () => {
  const [averageValue, setAverageValue] = useState(10);
  const [frequencia, setFrequencia] = useState(
    JSON.parse(localStorage.getItem("sheetFrequencia") ?? "[]")
  );

  const handleOnFrequencia = async (sheet: any) => {
    const newFrequencia = await sheet?.get("frequencia");
    localStorage.setItem("sheetFrequencia", JSON.stringify(newFrequencia));
    setFrequencia(newFrequencia);
  };

  if (frequencia.length === 0) {
    return (
      <RequestAccessCode
        table={"frequencia"}
        text={
          "Para acessar os dados internos da Igreja Batista do Conforto, é necessário obter o código de acesso ao banco de dados. Entre em contato com o administrador para solicitar o código e as instruções de acesso."
        }
        onAccess={handleOnFrequencia}
      />
    );
  }

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
    <>
      <Menu>
        <NumberInput
          label='Média Móvel'
          value={averageValue}
          onChange={setAverageValue}
        />
      </Menu>
      <Chart
        data={{
          datasets: [
            {
              type: "bar",
              label: "manhã",
              data: manha as any,
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
            {
              type: "bar",
              label: "noite",
              data: noite as any,
              backgroundColor: "rgba(54, 162, 235, 0.5)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
            {
              type: "line",
              label: "média manhã",
              data: movingAverage(manha, averageValue) as any,
              borderColor: "rgba(255, 99, 132, 1)",
              fill: false,
              tension: 0.1,
              pointRadius: 0,
            },
            {
              type: "line",
              label: "noite manhã",
              data: movingAverage(noite, averageValue) as any,
              borderColor: "rgba(54, 162, 235, 1)",
              fill: false,
              tension: 0.1,
              pointRadius: 0,
            },
          ],
        }}
        options={{
          scales: {
            y: {
              type: "linear",
              position: "left",
              beginAtZero: true,
            },
          },
        }}
      />
    </>
  );
};

export default Frequencia;
