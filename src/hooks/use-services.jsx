import { useState } from "react";
import {  DicListingProfileDetailed, DicListingService, DicService, DicServiceDetailed } from "./dictionary/dic-service";

export function UseService() {

  const [service, setService] = useState(DicService);
  const [serviceDetailed,setServiceDetailed] = useState(DicServiceDetailed);
  const [listService, setListService] = useState(DicListingService);
  const [listServiceDetailed, setListServiceDetailed] = useState(DicListingProfileDetailed);  

  function updateOneValueServico({ field, value }) {
    setService((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  }

  function updateService(newValue){
    setService(newValue)
  }

  function updateServiceDetailed(newValue){
    setServiceDetailed(newValue)
  }

  function updateListService(newValue){
    setListService(newValue)
  }

  function updateListServiceDetailed(){
    setListServiceDetailed(newValue)
  }


  return {
    updateListServiceDetailed,
    updateServiceDetailed,
    updateOneValueServico,
    listServiceDetailed,
    updateListService,
    serviceDetailed,
    updateService,
    listService,
    service,
  };
}
