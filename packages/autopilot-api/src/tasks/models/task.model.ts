import GraphQLJSON from "graphql-type-json";

import { Field, ID, ObjectType } from "@nestjs/graphql";

import { TaskPayload } from "../types";

@ObjectType({ description: "Generic task" })
export class Task {
  @Field(() => ID)
  id: string;

  @Field()
  enabled: boolean;

  @Field()
  draft: boolean;

  @Field(() => GraphQLJSON)
  payload: TaskPayload;
}
