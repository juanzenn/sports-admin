export type CreateExerciseInput = {
  name: string;
  body_part_id: number;
};

export type UpdateExerciseInput = {
  id: number;
  name: string;
  body_part_id: number;
};

export type DeleteExerciseInput = {
  id: number;
};

export type Exercise = {
  id: number;
  uuid: string;
  name: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  deleted_at: string;
};

export type BodyPart = {
  id: number;
  uuid: string;
  name: string;
};

export type BodyPartCategory = {
  id: number;
  uuid: string;
  name: string;
};
