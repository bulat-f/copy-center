import { SemanticICONS } from "semantic-ui-react";

export const getIconNameByFileType = (type: string): SemanticICONS => {
  switch (type) {
    case "image/jpeg":
    case "image/png":
      return "file image";
    case "application/pdf":
      return "file pdf";
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return "file word";
    case "application/x-zip-compressed":
    case "application/zip":
      return "file archive";
    default:
      return "file";
  }
};

type Reducer = (state: any, action: any) => any;

interface IReducers {
  [name: string]: Reducer;
}

export const combineReducers = (reducers: IReducers) => {
  const names = Object.keys(reducers);
  const combinedReducers = (state: any, action: any) => {
    return names.reduce(
      (acc: any, currentName: string) => ({
        ...acc,
        [currentName]: reducers[currentName](state[currentName], action),
      }),
      {}
    );
  };

  return combinedReducers;
};
