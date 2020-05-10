import { IFileWithId, ISettings, IAction } from "types";
import { ADD_FILES, REMOVE_FILE } from "constants/actionTypes";

interface ISettingsState {
  [id: string]: ISettings;
}

const defaultSettings: ISettings = {
  paperSize: "A4",
  layout: "Portrait",
  copies: 1,
};

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

const settingsReducer = (
  state: ISettingsState = {},
  action: IAction
): ISettingsState => {
  switch (action.type) {
    case ADD_FILES: {
      const settings = action.payload.reduce(
        (acc: ISettingsState, currentFile: IFileWithId): ISettingsState => ({
          ...acc,
          [currentFile.id]: defaultSettings,
        }),
        {}
      );
      return { ...state, ...settings };
    }
    default:
      return state;
  }
};

interface IDocumentsReducer {
  files: IFileWithId[];
  settings: ISettingsState;
}

export const defaultState = {
  files: [],
  settings: {},
};

const ducumentReducer = (
  state: IDocumentsReducer,
  action: IAction
): IDocumentsReducer => {
  return {
    files: filesReducer(state.files, action),
    settings: settingsReducer(state.settings, action),
  };
};

export { ducumentReducer as reducer };
