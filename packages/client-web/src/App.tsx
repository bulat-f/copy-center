import React, { useReducer, useCallback, FormEvent } from "react";
import {
  Container,
  Grid,
  Card,
  List,
  Form,
  Button,
  Radio,
  CheckboxProps,
  Select,
  Input,
  InputOnChangeData,
  DropdownProps,
} from "semantic-ui-react";
import { Document } from "components/Document";
import { FileInput } from "components/FileInput";

import { reducer, defaultState } from "reducers";
import {
  ADD_FILES,
  REMOVE_FILE,
  SET_DELIVERY_ADDRESS,
  SET_DELIVERY_METHOD,
} from "constants/actionTypes";

import { IFileWithId, IAction } from "types";

const pickUpOptions = [
  {
    value: "First pick up point",
    key: "first_point",
    text: "First pick up point",
  },
  {
    value: "Second pick up point",
    key: "second_point",
    text: "Second pick up point",
  },
];

const addFiles = (files: IFileWithId[]): IAction => ({
  type: ADD_FILES,
  payload: files,
});

const removeFile = (id: string): IAction => ({
  type: REMOVE_FILE,
  payload: { id },
});

const setDeliveryMehtod = (method: string): IAction => ({
  type: SET_DELIVERY_METHOD,
  payload: method,
});

const setDeliveryAddress = (address: string): IAction => ({
  type: SET_DELIVERY_ADDRESS,
  payload: address,
});

function App() {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const {
    documents: { files, settings },
    deliveryMethod: { method, address },
  } = state;

  const handleAddFiles = useCallback(
    (files: any[]) => dispatch(addFiles(files)),
    [dispatch]
  );
  const handleRemoveFile = useCallback(
    (id: string) => dispatch(removeFile(id)),
    [dispatch]
  );
  const handleChangeDeliveryMethod = useCallback(
    (event: FormEvent<HTMLInputElement>, data: CheckboxProps): void => {
      const value = data.value ? data.value.toString() : "pick_up";
      dispatch(setDeliveryMehtod(value));
    },
    [dispatch]
  );

  const handleChangePickUpAddress = useCallback(
    (
      event: React.SyntheticEvent<HTMLElement, Event>,
      data: DropdownProps
    ): void => {
      const value = typeof data.value === "string" ? data.value : "";

      dispatch(setDeliveryAddress(value));
    },
    [dispatch]
  );

  const handleChangeDeliveryAddress = useCallback(
    (event: FormEvent<HTMLInputElement>): void => {
      const value =
        typeof event.currentTarget.value === "string"
          ? event.currentTarget.value
          : "";

      dispatch(setDeliveryAddress(value));
    },
    [dispatch]
  );

  return (
    <Container>
      <Grid padded="vertically">
        <Grid.Row>
          <Card fluid>
            <Card.Content>
              <Card.Header>Documents to print</Card.Header>
              <List divided relaxed>
                {files.map((file: IFileWithId) => (
                  <Document
                    key={file.id}
                    file={file}
                    settings={settings[file.id]}
                    onRemove={handleRemoveFile}
                  />
                ))}
              </List>
            </Card.Content>
            <Card.Content extra>
              <FileInput name="files" onAddFiles={handleAddFiles} />
            </Card.Content>
          </Card>
        </Grid.Row>
        <Grid.Row>
          <Card fluid>
            <Card.Content>
              <Card.Header>Delivery method</Card.Header>

              <Form.Field>
                <Radio
                  label="I'll pick up by my own"
                  name="delivery_method"
                  value="pick_up"
                  checked={method === "pick_up"}
                  onChange={handleChangeDeliveryMethod}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label="Deliver it to this address"
                  name="delivery_method"
                  value="deliver"
                  checked={method === "deliver"}
                  onChange={handleChangeDeliveryMethod}
                />
              </Form.Field>
              <Form.Field>
                {method === "pick_up" ? (
                  <Select
                    name="pick_up_address"
                    value={address}
                    options={pickUpOptions}
                    onChange={handleChangePickUpAddress}
                  />
                ) : (
                  <Input
                    name="delivery_address"
                    value={address}
                    onChange={handleChangeDeliveryAddress}
                  />
                )}
              </Form.Field>
            </Card.Content>
          </Card>
        </Grid.Row>
        <Grid.Row>
          <Button primary size="big">
            Submit
          </Button>
        </Grid.Row>
        <pre>{JSON.stringify(state, undefined, 2)}</pre>
      </Grid>
    </Container>
  );
}

export default App;
