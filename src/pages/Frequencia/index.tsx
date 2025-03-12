import { useState } from "react";
import RequestAccessCode from "../../components/RequestAccessCode";
import Menu from "../../components/Menu";
import NumberInput from "../../components/NumberInput";
import PrimaryGraph from "./components/PrimaryGraph";

const Frequencia = () => {
  const [averageSize, setAverageSize] = useState(10);
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
      <PrimaryGraph frequencia={frequencia} averageSize={averageSize}/>
      <div className="flex flex-col md:flex-row gap-4">
        <div>
          <h1 className="font-bold uppercase">Composição dos membros</h1>
          
        </div>
      </div>
    </>
  );
};

export default Frequencia;
