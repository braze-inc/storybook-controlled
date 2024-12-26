import React, { useCallback } from "react";
import type { Args, Decorator } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { fn } from "@storybook/test";

type KeysMatching<T, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];

/**
 * makeStateDecorator
 * @param callbackName A key on props whose value is a callback
 * @param propSetter One of three options:
 * 1. A key on props whose value will be updated with the first argument of the callback
 * 2. An array of keys on props whose values will be updated with the first n arguments of the callback
 * 3. A function that will return an object to be merged with the props
 * @returns A decorator that will update the controls with the new state
 * @example If a component has currentPage and setPage: `const decorator = makeStateDecorator<MyProps>("setPage", "currentPage")`
 * @example If a component has currentPage, and totalPages and setPage's type is `(currentPage, totalPages) => void`: `const decorator = makeStateDecorator<MyProps>("setPage", ["currentPage", "totalPages"])`
 * @example If a component has a complex callback: `const decorator = makeStateDecorator<MyProps>("setPage", (obj) => ({ myProp: obj.myProp }))`
 */
export const makeStateDecorator = <
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
    const [, setArgs] = useArgs<TArgs>();

    const callback = useCallback(
      (
        ...values: TArgs[CallbackName] extends (...args: unknown[]) => unknown
          ? Parameters<TArgs[CallbackName]>
          : never
      ) => {
        if (typeof propSetter === "function") {
          setArgs(propSetter(...values));
        } else if (Array.isArray(propSetter)) {
          setArgs(
            Object.fromEntries(
              propSetter.map((prop) => [prop, values.shift()])
            ) as Partial<TArgs>
          );
        } else {
          setArgs({ [propSetter]: values[0] } as Partial<TArgs>);
        }
        return [...values];
      },
      [setArgs]
    );

    return <Story args={{ ...args, [callbackName]: fn(callback) }} />;
  } satisfies Decorator<TArgs>;
};
