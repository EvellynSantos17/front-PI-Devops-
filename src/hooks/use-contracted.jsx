import { useState } from "react";
import {
  DicContracted,
  DicContractedDetailed,
  DicListingContracted,
  DicListingContractedDetailed,
} from "./dictionary/dic-contracted-";

export function UseContracted() {
  const [contracted, setContracted] = useState(DicContracted);
  const [contractedDetailed, setContractedDetailed] = useState(DicContractedDetailed);
  const [listContracted, setListContracted] = useState(DicListingContracted);
  const [listContractedDetailed, setListContractedDetailed] = useState(DicListingContractedDetailed);

  function updateOneValueContracted({ field, value }) {
    setContracted((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  }

  function updateContractedDetailed(newValue) {
    console.log(newValue)
    setContractedDetailed(newValue);
  }

  function updateListContracted(newValue) {
    setListContracted(newValue);
  }

  function updateListContractedDetailed(newValue) {
    setListContractedDetailed(newValue);
  }

  return {
    updateListContractedDetailed,
    updateOneValueContracted,
    updateContractedDetailed,
    listContractedDetailed,
    updateListContracted,
    contractedDetailed,
    listContracted,
    contracted,
  };
}
