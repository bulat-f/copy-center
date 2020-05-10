import React, { useReducer, useCallback } from "react";
import { Container, Grid, Card, List, Button } from "semantic-ui-react";
import { Document } from "components/Document";
import { FileInput } from "components/FileInput";

import { reducer, defaultState } from "reducers";
import { ADD_FILES, REMOVE_FILE } from "constants/actionTypes";

import { IFileWithId, IAction } from "types";

const addFiles = (files: IFileWithId[]): IAction => ({
  type: ADD_FILES,
  payload: files,
});

const removeFile = (id: string): IAction => ({
  type: REMOVE_FILE,
  payload: { id },
});

function App() {
  const [state, dispatch] = useReducer(reducer, defaultState);
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
                {state.files.map((file: IFileWithId) => (
                  <Document
                    key={file.id}
                    file={file}
                    settings={state.settings[file.id]}
                    onRemove={handleRemoveFile}
                  />
                ))}
              </List>
              <FileInput name="files" onAddFiles={handleAddFiles} />
            </Card.Content>
          </Card>
        </Grid.Row>
        <Grid.Row>
          <Button primary size="big">
            Submit
          </Button>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default App;
