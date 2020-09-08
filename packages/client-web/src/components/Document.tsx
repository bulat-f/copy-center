import React, { useCallback } from "react";
import { List, Icon, Button } from "semantic-ui-react";
import { getIconNameByFileType } from "utils";

import { IFileWithId, ISettings } from "types";

import styles from "./Document.module.css";

interface IProps {
  file: IFileWithId;
  settings: ISettings;
  onRemove: (id: string) => void;
}

export const Document: React.FC<IProps> = ({ file, settings, onRemove }) => {
  const handleRemove = useCallback(() => onRemove(file.id), [
    file.id,
    onRemove,
  ]);
  return (
    <List.Item>
      <img
        className={styles.Image}
        src={getIconNameByFileType(file)}
        alt="file icon"
      />
      <List.Content verticalAlign="middle">
        <List.Header>{file.name}</List.Header>
        <List.Description>
          {[
            `Paper size: ${settings.paperSize}`,
            `Layout: ${settings.layout}`,
            `Copies: ${settings.copies}`,
          ].join(" | ")}
        </List.Description>
      </List.Content>
      <List.Icon verticalAlign="middle">
        <Button.Group basic>
          <Button icon>
            <Icon name="settings" />
          </Button>
          <Button icon onClick={handleRemove}>
            <Icon name="trash alternate outline" />
          </Button>
        </Button.Group>
      </List.Icon>
    </List.Item>
  );
};
