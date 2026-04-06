import { taskResponseSchema } from "../task/task.doc";
import { projectResponseSchema } from "../project/project.doc";

export const syncSchema = {
  description: "Bulk synchronize tasks and projects between client and server",
  tags: ["Sync"],
  body: {
    type: "object",
    properties: {
      tasks: {
        type: "array",
        items: taskResponseSchema,
      },
      projects: {
        type: "array",
        items: projectResponseSchema,
      },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        tasksToUpdate: {
          type: "array",
          items: taskResponseSchema,
        },
        projectsToUpdate: {
          type: "array",
          items: projectResponseSchema,
        },
      },
    },
  },
};
