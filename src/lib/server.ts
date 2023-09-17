import {
  BodyPart,
  CreateExerciseInput,
  DeleteExerciseInput,
  Exercise,
  UpdateExerciseInput,
} from "@/lib/types";

const env = process.env.NODE_ENV || "development";
const isProd = env === "production";

const MAIN_URL = isProd
  ? "https://sports-server.fly.dev"
  : "http://localhost:8080";

const DEFAULT_FETCH_OPTIONS = {};

type ApiProps = {
  input?: { [index: string]: any };
  fetchOptions?: RequestInit;
};

function api<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET"
) {
  return async (props: ApiProps = {}) => {
    const { input, fetchOptions } = props;
    const options = {
      ...DEFAULT_FETCH_OPTIONS,
      ...fetchOptions,
      method,
      body: input ? JSON.stringify(input) : undefined,
    };

    const response = await fetch(url, options);
    const data: T = await response.json();

    return data;
  };
}

const URLS = {
  exercise: {
    getMany: `${MAIN_URL}/exercise`,
    post: `${MAIN_URL}/exercise`,
    put: (id: number) => `${MAIN_URL}/exercise/${id}`,
    delete: (id: number) => `${MAIN_URL}/exercise/${id}`,
  },
  bodyParts: {
    getMany: `${MAIN_URL}/body-parts`,
  },
};

/**
 *
 * APIS
 *
 */

const exercise = {
  getMany: () => api<Exercise[]>(URLS.exercise.getMany)(),
  post: (input: CreateExerciseInput) =>
    api<Exercise>(URLS.exercise.post, "POST")({ input }),
  put: (input: UpdateExerciseInput) =>
    api<Exercise>(URLS.exercise.put(input.id), "PUT")({ input }),
  delete: (input: DeleteExerciseInput) =>
    api<Exercise>(URLS.exercise.delete(input.id), "DELETE")(),
};

const bodyParts = {
  getMany: () => api<BodyPart[]>(URLS.bodyParts.getMany)(),
};

export const server = {
  exercise,
  bodyParts,
};
