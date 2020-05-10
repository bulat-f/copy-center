import React, { useCallback } from "react";
import { List, Icon, Button } from "semantic-ui-react";
import { getIconNameByFileType } from "utils";

interface IProps {
  id: string;
  name: string;
  type: string;
  onRemove: (id: string) => void;
}

export const File: React.FC<IProps> = ({ id, name, type, onRemove }) => {
  const handleRemove = useCallback(() => onRemove(id), [id, onRemove]);
  return (
    <List.Item>
      <List.Icon
        name={getIconNameByFileType(type)}
        size="huge"
        verticalAlign="middle"
      />
      <List.Content verticalAlign="middle">
        <List.Header>{name}</List.Header>
        <List.Description>{type}</List.Description>
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
