import { IFile } from "types";

import jpg from "../images/jpg.svg";
import png from "../images/png.svg";
import pdf from "../images/pdf.svg";
import doc from "../images/doc.svg";
import zip from "../images/zip.svg";
import xls from "../images/xls.svg";
import txt from "../images/txt.svg";
import ppt from "../images/ppt.svg";
import csv from "../images/csv.svg";
import defaultIcon from "../images/file.svg";

export const getIconNameByFileType = (file: IFile): string => {
  const ext = file.name.split(".")[1];

  switch (ext) {
    case "jpg":
    case "jpeg":
      return jpg;
    case "png":
      return png;
    case "pdf":
      return pdf;
    case "doc":
    case "docx":
      return doc;
    case "zip":
      return zip;
    case "xls":
      return xls;
    case "txt":
      return txt;
    case "ppt":
      return ppt;
    case "csv":
      return csv;
    default:
      return defaultIcon;
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
