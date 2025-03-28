import { DicContracted } from "./dic-contracted-";
import { DicPage } from "./dic-page";

export const DicService = {
  id: null,
  title: null,
  // tipo: '' Esse campo do figma vai ser retirado!!
  price: null,
  // dt_limite: '', Esse campo tbm vai ser retirado!!
  creationDate: null,
  location: null,
  // skills: null,
  description: null,
};

export const DicServiceUserProfile = {
  id: null,
  name: null,
  description: null,
  title: null,
};

export const DicServiceDetailed = {
  ...DicService,
  userProfile: DicServiceUserProfile,
  contracted: DicContracted
}


export const DicListingService = {
  content:[{
    ...DicService,
    userProfile: DicServiceUserProfile
  }],
  page: DicPage
}

export const DicListingProfileDetailed = {
  content:[{
    ...DicService,
    userProfile: DicServiceDetailed,
    contracted: DicContracted

  }],
  page: DicPage
}


