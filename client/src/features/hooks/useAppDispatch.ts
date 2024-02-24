import { AppDispatch } from "app/providers/store-providers/config/store";
import { useDispatch } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();