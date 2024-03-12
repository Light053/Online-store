import { StateSchema } from "app/providers/store-providers/config/state-schema";

export const getIsAuth = (state: StateSchema) => state.user.isAuth;
