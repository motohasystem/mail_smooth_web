import { MailbodyTinker } from "./mailbody_tinker";

// jest template

test('test', () => {
    const tinker = new MailbodyTinker(10)

    let act, exp, input;

    input = `
https://example.com/abcdefg?abc=def
====================
`
    act = tinker.regex_convert(input);
    exp = `
(URL)
=
=
`;
    expect(act).toBe(exp);

    input = `
なにか
てきとうな

不要な文字が入っている

なかから

タイトル文字列

このあたりは本文が入っている

が

つながっていく

`
    act = tinker.split_body(input, 20);
    console.log(act)
    exp = 5;
    expect(act.length).toBe(exp);
});
