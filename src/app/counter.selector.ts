import { createFeatureSelector, createSelector } from "@ngrx/store";
import { counterState } from "./shop/counter.state";
import { AppState } from "./appStore/app.state";

let SELECTED_FEATURE_NAME=createFeatureSelector<counterState>('selected_feature');
export const selectFeatureCount = createSelector(SELECTED_FEATURE_NAME,(state: counterState ) => state.counter
  );

  export const selectFeatures = (state: AppState) => state.cart;