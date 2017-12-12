import { filter } from 'rxjs/operator';

export function ofActionName(...keys) {
  return function ofTypeOperatorFunction(source) {
    return source.pipe$(
      filter((action) => {
        action.functionName
        const len = keys.length;
        if (len === 1) {
          return keyHasType(type, keys[0]);
        } else {
          for (let i = 0; i < len; i++) {
            if (keyHasType(type, keys[i])) {
              return true;
            }
          }
        }
        return false;
      })
    )
  };
}