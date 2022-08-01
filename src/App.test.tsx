import { act, renderHook } from "@testing-library/react";
import React, { useReducer } from "react";

import { ActionType, listReducer } from "./reducers/listReducer";

test("add single user", () => {
    const { result } = renderHook(() => useReducer(listReducer, []));
    const newUser = { user: "user 1", age: 18 };

    act(() => {
        const dispatch = result.current[1];

        dispatch({ type: ActionType.ADD, payload: newUser });
    });

    const state = result.current[0];
    expect(state).toHaveLength(1);
    expect(state[0].user).toEqual(newUser.user);
    expect(state[0].age).toEqual(newUser.age);
});

test("add multiple users", () => {
    const { result } = renderHook(() => useReducer(listReducer, []));
    const newUser1 = { user: "user 1", age: 18 };
    const newUser2 = { user: "user 2", age: 21 };
    const newUser3 = { user: "user 3", age: 40 };

    act(() => {
        const dispatch = result.current[1];

        dispatch({ type: ActionType.ADD, payload: newUser1 });
        dispatch({ type: ActionType.ADD, payload: newUser2 });
        dispatch({ type: ActionType.ADD, payload: newUser3 });
    });

    const state = result.current[0];
    expect(state).toHaveLength(3);

    expect(state[0].user).toEqual(newUser1.user);
    expect(state[0].age).toEqual(newUser1.age);

    expect(state[1].user).toEqual(newUser2.user);
    expect(state[1].age).toEqual(newUser2.age);

    expect(state[2].user).toEqual(newUser3.user);
    expect(state[2].age).toEqual(newUser3.age);
});

test("select user", () => {
    const initUser = { id: "1", user: "user 1", age: 21, selected: false };
    const { result } = renderHook(() => useReducer(listReducer, [initUser]));

    act(() => {
        const dispatch = result.current[1];

        dispatch({ type: ActionType.SELECT, payload: { id: initUser.id } });
    });

    const state = result.current[0];
    expect(state[0].selected).toBeTruthy();
});

test("delete single user", () => {
    const { result } = renderHook(() => useReducer(listReducer, [{ id: "1", user: "user 1", age: 21, selected: true }]));

    act(() => {
        const dispatch = result.current[1];

        dispatch({ type: ActionType.DELETE });
    });

    const state = result.current[0];
    expect(state).toHaveLength(0);
});

test("delete multiple users", () => {
    const firstUser = { id: "1", user: "user 1", age: 21, selected: false };
    const secondUser = { id: "2", user: "user 2", age: 18, selected: false };

    const { result } = renderHook(() => useReducer(listReducer, [firstUser, secondUser]));

    act(() => {
        const dispatch = result.current[1];

        dispatch({ type: ActionType.SELECT, payload: { id: firstUser.id } });
        dispatch({ type: ActionType.DELETE });
        dispatch({ type: ActionType.SELECT, payload: { id: secondUser.id } });
        dispatch({ type: ActionType.DELETE });
    });

    const state = result.current[0];
    expect(state).toHaveLength(0);
});

test("clear all users", () => {
    const { result } = renderHook(() =>
        useReducer(listReducer, [
            { id: "1", user: "user 1", age: 21, selected: false },
            { id: "2", user: "user 2", age: 18, selected: false },
        ])
    );

    act(() => {
        const dispatch = result.current[1];
        dispatch({ type: ActionType.CLEARAll });
    });

    const state = result.current[0];
    expect(state).toHaveLength(0);
});
