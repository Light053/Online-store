import { StateSchema } from "app/providers/store-providers/config/state-schema";
//@ts-ignore
export const getUsername = (state: StateSchema) => state.user.user.username.username;