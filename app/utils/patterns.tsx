import { FieldPath, FieldValues } from 'react-hook-form/dist/types';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';

type RulesType<T extends FieldValues> = Omit<
  RegisterOptions<T, FieldPath<T>>,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
>;

export function emailRules<T extends FieldValues>(): RulesType<T> {
  return {
    required: 'This field is required.',
    pattern: {
      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      message: 'Invalid email address',
    },
  };
}

export function passwordRules<T extends FieldValues>(): RulesType<T> {
  return {
    maxLength: {
      value: 32,
      message: 'Password cannot contain more than 32 charters',
    },
    minLength: {
      value: 6,
      message: 'Password cannot contain less than 6 charters',
    },
    required: 'Password is required',
  };
}
export function usernameRules<T extends FieldValues>(): RulesType<T> {
  return {
    maxLength: {
      value: 32,
      message: 'Password cannot contain more than 32 charters',
    },
    minLength: {
      value: 6,
      message: 'Password cannot contain less than 6 charters',
    },
    required: 'Password is required',
  };
}

// export const usernameRules = (): RulesType => {
//   return {
//     maxLength: {
//       value: 32,
//       message: 'Password cannot contain more than 32 charters',
//     },
//     minLength: {
//       value: 6,
//       message: 'Password cannot contain less than 6 charters',
//     },
//     required: 'Password is required',
//   };
// };
