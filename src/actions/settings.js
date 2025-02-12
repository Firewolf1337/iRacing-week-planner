import debounce from 'lodash.debounce';
import { getFirestore, collection, doc, getDoc, setDoc } from "firebase/firestore";

export const UPDATE_FILTERS = 'SETTINGS/UPDATE_FILTERS';
export const RESET_FILTERS = 'SETTINGS/RESET_FILTERS';
export const RESET_SETTINGS = 'SETTINGS/RESET_SETTINGS';
export const UPDATE_SETTING = 'SETTINGS/UPDATE_SETTING';
export const LOAD_SETTINGS_FROM_FIREBASE = 'SETTINGS/LOAD_SETTINGS_FROM_FIREBASE';
export const FIREBASE_SYNCED = 'SETTINGS/FIREBASE_SYNCED';

export function saveSettingsToFirebase() {
  return async (dispatch, getState) => {
    const { user, firebaseApp } = getState().auth;
    const { settings } = getState();

    if (!user) {
      return;
    }

    const db = getFirestore(firebaseApp);
    const collectionRef = collection(db, 'settings');
    const docRef = doc(collectionRef, user.uid);
    await setDoc(docRef, settings);
    dispatch({ type: FIREBASE_SYNCED });
  };
}

const dispatchSaveSettingsToFirebase = (dispatch) => {
  dispatch(saveSettingsToFirebase());
};

export const debouncedDispatcherSaveSettings = debounce(dispatchSaveSettingsToFirebase, 10000);

export function updateFilters(newFilters) {
  return async (dispatch) => {
    await dispatch({ type: UPDATE_FILTERS, payload: { filters: newFilters } });
    debouncedDispatcherSaveSettings(dispatch);
  };
}

export function resetFilters() {
  return async (dispatch) => {
    await dispatch({ type: RESET_FILTERS, payload: {} });
    debouncedDispatcherSaveSettings(dispatch);
  };
}

export function resetSettings() {
  return async (dispatch) => {
    await dispatch({ type: RESET_SETTINGS });
    debouncedDispatcherSaveSettings(dispatch);
  };
}

export function updateSetting(key, value) {
  return async (dispatch) => {
    await dispatch({ type: UPDATE_SETTING, payload: { key, value } });
    debouncedDispatcherSaveSettings(dispatch);
  };
}

export function getSettingsFromFirebase() {
  return async (dispatch, getState) => {
    const { user, firebaseApp } = getState().auth;
    if (!user) {
      return;
    }

    const db = getFirestore(firebaseApp);
    const collectionRef = collection(db, 'settings');
    const docRef = doc(collectionRef, user.uid);
    const document = await getDoc(docRef);

    if (!document.exists) {
      dispatch(saveSettingsToFirebase());
      return;
    }

    dispatch({ type: LOAD_SETTINGS_FROM_FIREBASE, payload: document.data() });
  };
}
