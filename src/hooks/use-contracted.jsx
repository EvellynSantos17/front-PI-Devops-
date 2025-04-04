import { useState } from "react";
import {
  DicContracted,
  DicListingContracted,
} from "./dictionary/dic-contracted-";

export function UseContracted() {
  const [contracted, setContracted] = useState(DicContracted);
  const [listContracted, setListContracted] = useState(DicListingContracted);

  function updateOneValueContracted({ field, value }) {
    setContracted((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  }

  function updateContracted(newValue) {
    setContracted(newValue);
  }

  function updateListContracted(newValue) {
    setListContracted(newValue);
  }

  return {
    contracted,
    listContracted,
    updateOneValueContracted,
    updateContracted,
    updateListContracted,
  };
}
