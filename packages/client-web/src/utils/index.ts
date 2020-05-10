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
