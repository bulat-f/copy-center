import React, { Fragment, useRef, useCallback } from "react";
import { Button, Icon } from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";

import { IFile, IFileWithId } from "types";

interface IProps {
  name: string;
  onAddFiles: (files: IFileWithId[]) => void;
}

export const FileInput: React.FC<IProps> = ({ name, onAddFiles }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = useCallback(
    () => inputRef.current && inputRef.current.click(),
    [inputRef]
  );
  const handleAddFiles = useCallback(
    (event) => {
      const files: IFile[] = Array.from(event.target.files);
      const filesWithId = files.map((file: IFile) => ({
        id: uuidv4(),
        name: file.name,
        type: file.type,
        size: file.size,
      }));

      onAddFiles(filesWithId);
    },
    [onAddFiles]
  );

  return (
    <Fragment>
      <input
        ref={inputRef}
        type="file"
        multiple
        name={name}
        hidden
        onChange={handleAddFiles}
      />
      <Button onClick={handleClick}>
        <Icon name="attach" />
        Add file
      </Button>
    </Fragment>
  );
};
