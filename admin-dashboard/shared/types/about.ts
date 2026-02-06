export interface About {
  id: string;
  paragraph: string;
}

export interface CreateAboutInput {
  paragraph: string;
}

export interface CreateAboutResponse {
  createAbout: {
    id: string;
  };
}

export interface GetAboutResponse {
  getAbout: About[];
}
