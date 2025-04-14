import { DicPage } from "./dic-page";

export const DicService = {
  id: null,
  title: null,
  price: null,
  description: null,
  location: null,
  creationDate: null,
  userProfile: {
    id: null,
    name: null,
    description: null,
    title: null,
  },
  skills: [],
  contractedListings: [
    {
      id: null,
      status: null,
      clientRequest: null,
      startedAt: null,
      finishedAt: null,
      client: {
        id: null,
        name: null,
        phone: null,
        address: null,
        postalCode: null,
        skills: null,
        document: null,
        description: null,
        title: null,
      },
      evaluation:
        {
          id: null,
          comment: null,
          stars: null,
          contractedListingId: null,
        },
    },
  ],
};

export const DicListingService = {
  content: [
    {
      ...DicService,
    },
  ],
  page: DicPage,
};
