import React from "react";
import { List, Icon, Button } from "semantic-ui-react";
import { getIconNameByFileType } from "utils";

interface IProps {
  name: string;
  type: string;
}

export const File: React.FC<IProps> = ({ name, type }) => {
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
          <Button icon>
            <Icon name="trash alternate outline" />
          </Button>
        </Button.Group>
      </List.Icon>
    </List.Item>
  );
};
