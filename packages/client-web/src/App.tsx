import React, { useReducer, useCallback } from "react";
import { Container, Grid, Card, List } from "semantic-ui-react";
import { File } from "components/File";
import { FileInput } from "components/FileInput";

import { IFileWithId } from "types";

const ADD_FILES = "ADD_FILES";
const REMOVE_FILE = "REMOVE_FILE";

interface IAction {
  type: string;
  payload: any;
}

const filesReducer = (
  state: IFileWithId[] = [],
  action: IAction
): IFileWithId[] => {
  switch (action.type) {
    case ADD_FILES:
      return [...state, ...action.payload];
    case REMOVE_FILE: {
      const index = state.findIndex(
        (file: IFileWithId) => file.id === action.payload.id
      );

      return [...state.slice(0, index), ...state.slice(index + 1)];
    }
    default:
      return state;
  }
};

const addFiles = (files: IFileWithId[]): IAction => ({
  type: ADD_FILES,
  payload: files,
});

const removeFile = (id: string): IAction => ({
  type: REMOVE_FILE,
  payload: { id },
});

function App() {
  const [state, dispatch] = useReducer(filesReducer, []);
  const handleAddFiles = useCallback(
    (files: any[]) => dispatch(addFiles(files)),
    [dispatch]
  );
  const handleRemoveFile = useCallback(
    (id: string) => dispatch(removeFile(id)),
    [dispatch]
  );
  return (
    <Container>
      <Grid>
        <Grid.Row>
          <Card fluid>
            <Card.Content>
              <List divided relaxed>
                {state.map((file: IFileWithId) => (
                  <File key={file.id} {...file} onRemove={handleRemoveFile} />
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
