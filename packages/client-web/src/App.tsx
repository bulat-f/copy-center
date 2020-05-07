import React, { useReducer, useCallback } from "react";
import { Container, Grid, Card, List } from "semantic-ui-react";
import { File } from "components/File";
import { FileInput } from "components/FileInput";

import { IFileWithId } from "types";

const ADD_FILES = "ADD_FILES";

interface IAddFileAction {
  type: string;
  payload?: IFileWithId[];
  meta?: { id: number | string };
}

interface IRemoveFileAction {
  type: string;
  meta: { id: number | string };
}

const filesReducer = (
  state: IFileWithId[] = [],
  action: IAddFileAction
): IFileWithId[] => {
  switch (action.type) {
    case ADD_FILES:
      return [...state, ...action.payload];
    default:
      return state;
  }
};

const addFiles = (files: any[]) => ({ type: ADD_FILES, payload: files });

function App() {
  const [state, dispatch] = useReducer(filesReducer, []);
  const handleAddFiles = useCallback(
    (files: any[]) => dispatch(addFiles(files)),
    [dispatch]
  );
  return (
    <Container>
      <Grid>
        <Grid.Row>
          <Card fluid>
            <Card.Content>
              <List divided relaxed>
                {state.map((file) => (
                  <File key={file.name} {...file} />
                ))}
              </List>
            </Card.Content>
          </Card>
        </Grid.Row>
        <Grid.Row>
          <FileInput name="files" onAddFiles={handleAddFiles} />
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default App;
