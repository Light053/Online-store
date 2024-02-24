import { AppDispatch, RootState } from "app/providers/store-providers/config/store";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector