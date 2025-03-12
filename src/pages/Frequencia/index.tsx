import { useState } from "react";
import RequestAccessCode from "../../components/RequestAccessCode";
import Menu from "../../components/Menu";
import NumberInput from "../../components/NumberInput";
import PrimaryGraph from "./components/PrimaryGraph";
import SecondaryGraph, {CompositionType} from "./components/SecondaryGraph";

const Frequencia = () => {
  const [averageSize, setAverageSize] = useState(10);
  const [frequencia, setFrequencia] = useState(
    JSON.parse(localStorage.getItem("sheetFrequencia") ?? "[]")
  );
  const [composition, setComposition] = useState<CompositionType>({
    Homens: 0,
    Mulheres: 0,
    Jovens: 0,
    Adolescentes: 0,
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

  const sumByKeysIncludes = (d: CompositionType, key: string) => +Object.entries(d).reduce((a, [k, v]) => k.includes(key) ? a + v : a, 0)

  return (
    <>
      <Menu>
        <NumberInput
          label="Média Móvel"
          value={averageSize}
          onChange={setAverageSize}
        />
      </Menu>
      <h1 className="font-bold uppercase">
        Frequência total ao longo dos domingos
      </h1>
      <PrimaryGraph
        frequencia={frequencia}
        averageSize={averageSize}
        onHover={(composition: any) =>
          setComposition({
            Homens: sumByKeysIncludes(composition, 'Homens'),
            Mulheres: sumByKeysIncludes(composition, 'Mulheres'),
            Jovens: sumByKeysIncludes(composition, 'Jovens'),
            Adolescentes: sumByKeysIncludes(composition, 'Adolescentes'),
          })
        }
      />
      <div className="flex flex-col md:flex-row gap-4">
        <div>
          <h1 className="font-bold uppercase">Composição dos membros</h1>
          <SecondaryGraph composition={composition}/>
        </div>
      </div>
    </>
  );
};

export default Frequencia;
