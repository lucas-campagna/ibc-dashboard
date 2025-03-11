import { useState, useEffect } from "react";
// @ts-ignore
import Sheet from "@lprett/gsheetdb";

// type SheetProps = {
//   deploymentId: string;
//   username?: string;
//   password?: string;
//   token?: string;
// };

type AccessProps = (prop: string) => void;

const credentialsKey = (name: string) => `sheetsCredential:${name}`;

const useSheet = (name: string): [any, AccessProps] => {
  const [sheet, setSheet] = useState<any>(null);

  useEffect(() => {
    const localSheetCredentials = JSON.parse((localStorage.getItem(credentialsKey(name)) ?? '{}') as string)
    if (Object.keys(localSheetCredentials).length > 0) { 
      const newSheet = new Sheet(localSheetCredentials);
      setSheet(newSheet);
    }
  }, []);

  const setCredentials: AccessProps = (deploymentId) => {
    const newSheet = new Sheet({ deploymentId });
    localStorage.setItem(credentialsKey(name), JSON.stringify({ deploymentId }));
    setSheet(newSheet);
  };

  return [sheet, setCredentials];
};

export default useSheet;
