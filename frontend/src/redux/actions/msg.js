import { v4 as uuidv4, v4 } from "uuid";
import { CREATE_MSG, REMOVE_MSG } from "./types";

export const pushMsg = (type, text) => {
  return {
    type: CREATE_MSG,
    payload: {
      id: uuidv4(),
      text,
      type,
    },
  };
};

export const removeMsg = (id) => {
  return {
    type: REMOVE_MSG,
    payload: id,
  };
};
