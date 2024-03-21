import { StateSchema } from "app/providers/store-providers/config/state-schema";

export const getUsername = (state: StateSchema) => state.user.user.username.username
