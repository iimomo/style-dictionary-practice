import fs from "fs";

interface Variable {
  id: string;
  name: string;
  type: string;
  resolvedValuesByMode: {
    "1:1": {
      resolvedValue: any;
      alias: string | null;
      aliasName: string | null;
    };
  };
}

interface FigmaJSON {
  id: string;
  name: string;
  modes: { [key: string]: string };
  variableIds: string[];
  variables: Variable[];
}

const inputFilePath = ".tokens/export-import-variables.json";
const outputFilePath = ".tokens/export-import-variables-after.json";

// 小数点2以下は四捨五入
const roundToTwoDecimals = (value: number): number => {
  return Math.round(value * 100) / 100;
};

const setNestedProperty = (obj: any, path: string, value: any) => {
  const keys = path.split(".");
  keys.reduce((acc, key, index) => {
    if (index === keys.length - 1) {
      acc[key] = value;
      return;
    }
    if (!acc[key]) acc[key] = {};
    return acc[key];
  }, obj);
};

const convertFigmaJsonToStyleDictionary = (
  inputFile: string,
  outputFile: string
) => {
  const rawData = fs.readFileSync(inputFile, "utf8");
  const figmaJson: FigmaJSON = JSON.parse(rawData);

  const styleDictionaryTokens = figmaJson.variables.reduce(
    (acc, variable) => {
      const { resolvedValue, aliasName } = variable.resolvedValuesByMode["1:1"];
      let value;

      if (variable.type === "COLOR") {
        value = aliasName
          ? `{${aliasName.replace(/\//g, ".")}}`
          : `rgba(${roundToTwoDecimals(resolvedValue.r * 255)}, ${roundToTwoDecimals(resolvedValue.g * 255)}, ${roundToTwoDecimals(resolvedValue.b * 255)}, ${resolvedValue.a})`;
      } else {
        value = aliasName
          ? `{${aliasName.replace(/\//g, ".")}}`
          : roundToTwoDecimals(resolvedValue).toString();
      }

      const path = variable.name.replace(/\//g, ".");
      setNestedProperty(acc, path, { value });

      return acc;
    },
    {} as { [key: string]: any }
  );

  fs.writeFileSync(
    outputFile,
    JSON.stringify(styleDictionaryTokens, null, 2),
    "utf8"
  );
};

convertFigmaJsonToStyleDictionary(inputFilePath, outputFilePath);
