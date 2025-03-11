import { useState } from "react";
import RequestAccessCode from "../../components/RequestAccessCode";
import Chart from "../../components/Chart";

const Frequencia = () => {
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

  const labels = filteredFrequencia.map((item: any) =>
    new Date(item.Data).toLocaleDateString()
  );

  const manha: number[] = filteredFrequencia.map((item: any) => {
    let sum = 0;
    if (item["Horário"] === "manhã") {
      for (const key in item) {
        if (key !== "Data" && key !== "Horário" && key !== "Comentario") {
          sum += Number(item[key] || 0);
        }
      }
    }
    return sum;
  });
  const noite: number[] = filteredFrequencia.map((item: any) => {
    let sum = 0;
    if (item["Horário"] === "noite") {
      for (const key in item) {
        if (key !== "Data" && key !== "Horário" && key !== "Comentario") {
          sum += Number(item[key] || 0);
        }
      }
    }
    return sum;
  });

  const average = (data: number[], size: number): number[] =>
    data.map((_, index) => {
      const tmpData = data
        .slice(
          Math.max(0, index - size),
          Math.min(data.length - 1, index + size)
        )
        .filter((n) => n);
      return tmpData.reduce((a, d) => a + d, 0) / tmpData.length;
    });

  return (
    <>
      <Chart
        config={{
          data: {
            labels,
            datasets: [
              {
                type: "bar",
                label: "manhã",
                data: manha,
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
              },
              {
                type: "bar",
                label: "noite",
                data: noite,
                backgroundColor: "rgba(54, 162, 235, 0.5)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
              },
              {
                type: "line",
                label: "média manhã",
                data: average(manha, 10),
                borderColor: "rgba(255, 99, 132, 1)",
                fill: false,
                tension: 0.1,
                pointRadius: 0,
              },
              {
                type: "line",
                label: "noite manhã",
                data: average(noite, 10),
                borderColor: "rgba(54, 162, 235, 1)",
                fill: false,
                tension: 0.1,
                pointRadius: 0,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        }}
      />
      <button onClick={() => localStorage.clear()}>Reset</button>
    </>
  );
};

export default Frequencia;
