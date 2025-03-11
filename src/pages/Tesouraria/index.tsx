import RequestAccessCode from "../../components/RequestAccessCode";

const Tesouraria = () => {
  return (
    <RequestAccessCode
      table="tesouraria"
      text="
          Para acessar os dados internos da Igreja Batista do Conforto, é necessário obter o código de acesso ao banco de dados. Entre em contato com o administrador para solicitar o código e as instruções de acesso.
        "
        onAccess={() => alert('Sem implementacao no momento')}
    />
  );
};

export default Tesouraria;
