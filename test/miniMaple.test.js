import {MiniMaple} from "../src/miniMaple";

test('it fails', () => {
    expect(false).toBeTruthy();
});

test('test empty input string', () =>{
    expect(new MiniMaple().set_input_string("")).toBe(false);
    expect(new MiniMaple().set_input_string(null)).toBe(false);
    expect(new CMiniMaple().set_input_string(undefined)).toBe(false);
});

test('test input string', () =>{
    expect(new MiniMaple().set_input_string("+-*^")).toBe(false);
    expect(new MiniMaple().set_input_string("*x3^, x")).toBe(false);
    expect(new MiniMaple().set_input_string("4*x^3y,")).toBe(false);
    expect(new MiniMaple().set_input_string("4x3x")).toBe(false);
    expect(new MiniMaple().set_input_string("4*x^3")).toBe(false);
});