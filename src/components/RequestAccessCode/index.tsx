import { useState, useEffect } from 'react';
import useSheet from '../../hooks/useSheet';

type RequestAccessCodeProps = {
  text: string;
  table: string;
  onAccess: (sheet: any) => void;
};

function RequestAccessCode({ text, table, onAccess }: RequestAccessCodeProps) {
  const [code, setCode] = useState('');
  const [sheet, setCredentials] = useSheet(table);

  const handleSendCode = () => {
    setCredentials(code);
    setCode('');
  };

  useEffect(() => {
    if (sheet) {
      onAccess(sheet);
    }
  }, [sheet]);

  return (
    <div className="max-w-md mx-auto p-4">
      <p className="text-lg mb-4">{text}</p>
      <div className="flex">
        <input
          type="text"
          placeholder="Código de acesso"
          className="w-full border rounded p-2 mr-2"
          onChange={(e) => setCode(e.target.value)}
          value={code}
        />
        <button
          disabled={code.length < 50}
          onClick={handleSendCode}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}

export default RequestAccessCode;