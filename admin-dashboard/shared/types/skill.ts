export type Skill = {
  id: string;
  name: string;
  imageUrl: string;
};

export type CreateSkillInput = {
  name: string;
  imageUrl: string;
};

export type GetSkillResponse = {
  getSkills: Skill[];
};
export type UpdateSkillInput = {
  name: string;
  imageUrl: string;
};