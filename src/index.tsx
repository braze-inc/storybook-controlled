import React, { useCallback } from "react";
import type { Args, Decorator } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { fn } from "@storybook/test";

/**
 * KeysMatching
 * @description Get the keys of T whose values extend V
 * @example `KeysMatching<{ a: string, b: number }, string>` yeilds "a"
 */
export type KeysMatching<T, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];

/**
 * controlledDecorator
 * @param callbackName The name (key) of the callback arg
 * @param propSetter One of three options:
 * 1. The name (key) of a single arg to update with the first argument of the callback
 * 2. An array of arg names (keys) to update with the first n arguments of the callback
 * 3. A delegate function that takes the same parameters as the callback and returns an object to merge with the args
 * @returns A decorator that will update the controls with the new state
 * @example If a component has currentPage and setPage: `const decorator = controlledDecorator<MyProps>("setPage", "currentPage")`
 * @example If a component has currentPage, and totalPages and setPage's type is `(currentPage, totalPages) => void`: `const decorator = controlledDecorator<MyProps>("setPage", ["currentPage", "totalPages"])`
 * @example If a component has a complex callback: `const decorator = controlledDecorator<MyProps>("setPage", (obj) => ({ myProp: obj.myProp }))`
 */
export const controlledDecorator = <
  TArgs extends Args = Args,
  CallbackName extends KeysMatching<
    TArgs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (...args: any) => any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  > = KeysMatching<TArgs, (...args: any) => any>
>(
  callbackName: CallbackName,
  propSetter:
    | keyof TArgs
    | (keyof TArgs)[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | (TArgs[CallbackName] extends (...args: any) => any
        ? (...args: Parameters<TArgs[CallbackName]>) => Partial<TArgs>
        : never)
): Decorator<TArgs> => {
  return function Decorator(Story, { args }) {

    // First get the setArgs function which will allow us to update args later
    const [, setArgs] = useArgs<TArgs>();

    // Memoize the callback so that the component doesn't constantly rerender
    const callback = useCallback(
      (
        ...values: TArgs[CallbackName] extends (...args: unknown[]) => unknown
          ? Parameters<TArgs[CallbackName]>
          : never
      ) => {
        // There are three potential options for the second parameter, which dictate how we handle changing the args
        if (typeof propSetter === "function") {
          // If it is a function, then we delegate to the function
          setArgs(propSetter(...values));
        } else if (Array.isArray(propSetter)) {
          // If it is an array, then each item is a key that should positionally map to the arguments in the callback function
          // e.g. if the callback is `(first, second) => void` and propSetter is ["this", "that"], then the args will be updated to { this: first, that: second }
          setArgs(
            Object.fromEntries(
              // create key-value pairs from the array of keys and values
              propSetter.map((prop, index) => [prop, values[index]])
            ) as Partial<TArgs>
          );
        } else {
          // if it's a single value it is the name/key of the arg to update with the first parameter of the callback
          setArgs({ [propSetter]: values[0] } as Partial<TArgs>);
        }

        // In the end we return the values untouched, so that the mocks exactly the data that were passed in
        return [...values];
      },
      [setArgs]
    );

    // We want to get an action and be able to spy on the callback, so use storybook's mocking tools
    const mock = fn(callback);
    // This is necessary to make the mock show up in the actions panel
    // We give the mock the callback's name, matching what happens when fn is used normally in args
    mock.mockName(callbackName.toString());

    // pass the constructed callback in with the rest of the args
    return <Story args={{ ...args, [callbackName]: mock }} />;
  } satisfies Decorator<TArgs>;
};
