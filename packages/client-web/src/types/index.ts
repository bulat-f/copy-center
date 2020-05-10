export interface IAction {
  type: string;
  payload: any;
}

export interface IFile {
  name: string;
  type: string;
  size: number;
}

export interface IFileWithId extends IFile {
  id: string;
}

export type PaperSize =
  | "A1"
  | "A2"
  | "A3"
  | "A4"
  | "A5"
  | "A6"
  | "B1"
  | "B2"
  | "B3"
  | "B4"
  | "B5"
  | "B6";

export type Layout = "Portrait" | "Landspace";

export interface ISettings {
  paperSize: PaperSize;
  layout: Layout;
  copies: number;
}
