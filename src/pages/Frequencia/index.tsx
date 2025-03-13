import { useState } from "react";
import RequestAccessCode from "../../components/RequestAccessCode";
import Menu from "../../components/Menu";
import NumberInput from "../../components/NumberInput";
import PrimaryGraph from "./components/PrimaryGraph";
import SecondaryGraph, { CompositionType } from "./components/SecondaryGraph";
import Card from "./components/Card";
import HorizontalSplit from "../../components/HorizontalSplit";
import Checkbox from "../../components/Checkbox";
import RadioButtonGroup from "../../components/Inputs/RadioButtonGroup";

const Frequencia = () => {
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

  const sumByKeysIncludes = (d: CompositionType, key: string) =>
    +Object.entries(d).reduce((a, [k, v]) => (k.includes(key) ? a + v : a), 0);

  return (
    <>
      <Menu>
        <NumberInput
          label="Média Móvel"
          value={averageSize}
          onChange={setAverageSize}
        />
        {/* <RadioButtonGroup
          name="tipo-de-grafico"
          options={["a", "b", "c"]}
          selected="a"
        /> */}
      </Menu>
      <Card title="Frequência total ao longo dos domingos">
        <PrimaryGraph
          frequencia={frequencia}
          averageSize={averageSize}
          onHover={(composition: any) =>
            setComposition({
              Homens: sumByKeysIncludes(composition, "Homens"),
              Mulheres: sumByKeysIncludes(composition, "Mulheres"),
              Jovens: sumByKeysIncludes(composition, "Jovens"),
              Adolescentes: sumByKeysIncludes(composition, "Adolescentes"),
            })
          }
        />
      </Card>
      <HorizontalSplit sizes={[1, 2]}>
        <Card>
          <SecondaryGraph composition={composition} />
        </Card>
      </HorizontalSplit>
    </>
  );
};

export default Frequencia;
