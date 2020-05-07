export interface IFile {
  name: string;
  type: string;
  size: number;
}

export interface IFileWithId extends IFile {
  id: number | string;
}
