import { useEffect, useState } from "react";
import RequestAccessCode from "../../components/RequestAccessCode";
import Menu from "../../components/Menu";
import Number from "../../components/Inputs/Number";
import PrimaryGraph from "./components/PrimaryGraph";
import SecondaryGraph, { CompositionType } from "./components/SecondaryGraph";
import Card from "./components/Card";
import HorizontalSplit from "../../components/HorizontalSplit";
import Table from "../../components/Table";

const Frequencia = () => {
  const [date, setDate] = useState({ Data: new Date().getTime() });
  const [averageSize, setAverageSize] = useState(10);
  const [frequencia, setFrequencia] = useState(
    JSON.parse(localStorage.getItem("sheetFrequencia") ?? "[]")
  );
  const [composition, setComposition] = useState<CompositionType>({
    Homens: 1,
    Mulheres: 1,
    Jovens: 1,
    Adolescentes: 1,
  });

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

  useEffect(() => {
    if (date) {
      const clock = setTimeout(() => {
        setComposition({
          Homens: sumByKeysIncludes(date, "Homens"),
          Mulheres: sumByKeysIncludes(date, "Mulheres"),
          Jovens: sumByKeysIncludes(date, "Jovens"),
          Adolescentes: sumByKeysIncludes(date, "Adolescentes"),
        });
      }, 10);
      return () => clearTimeout(clock);
    }
  }, [date]);

  const sumByKeysIncludes = (d: Record<string, number>, key: string) =>
    +Object.entries(d).reduce((a, [k, v]) => (k.includes(key) ? a + v : a), 0);

  return (
    <>
      <Menu>
        <Number
          label="Média Móvel"
          value={averageSize}
          onChange={setAverageSize}
        />
      </Menu>
      <Card title="Frequência total ao longo dos domingos">
        <PrimaryGraph
          frequencia={frequencia}
          averageSize={averageSize}
          onHover={(composition: any) => setDate(composition)}
        />
      </Card>
      <HorizontalSplit sizes={[1, 2]}>
        <Card>
          <SecondaryGraph composition={composition} />
        </Card>
        <Card>
          <Table
            current={{
              ...date,
              Data: new Date(date.Data).toLocaleDateString(),
            }}
            data={frequencia.map((f: any) => ({
              ...f,
              Data: new Date(f.Data).toLocaleDateString(),
            }))}
          />
        </Card>
      </HorizontalSplit>
    </>
  );
};

export default Frequencia;
