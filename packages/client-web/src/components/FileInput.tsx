import React, { Fragment, useRef, useCallback } from "react";
import { Button, Icon } from "semantic-ui-react";

interface IProps {
  name: string;
  onAddFiles: (files: any[]) => void;
}

export const FileInput: React.FC<IProps> = ({ name, onAddFiles }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = useCallback(
    () => inputRef.current && inputRef.current.click(),
    [inputRef]
  );
  const handleAddFiles = useCallback((event) => {
    onAddFiles(event.target.files);
  }, []);

  return (
    <Fragment>
      <input
        ref={inputRef}
        type="file"
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
