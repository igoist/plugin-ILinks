import useMethods from './useMethods';

export const arrayMethods = {
  push(state, item) {
    return state.concat(item);
  },
  pop(state) {
    return state.slice(0, -1);
  },
  slice(state, start, end) {
    return state.slice(start, end);
  },
  empty() {
    return [];
  },
  set(state, newValue) {
    return newValue;
  },
  remove(state, item) {
    const index = state.indexOf(item);
    if (index < 0) {
      return state;
    }
    return [...state.slice(0, index), ...state.slice(index + 1)];
  },
};

export const useArray = (initialValue = []) => {
  if (!Array.isArray(initialValue)) {
    console.log('useArray: initialValue must be an array');
  }

  return useMethods(initialValue, arrayMethods);
};

export default useArray;
