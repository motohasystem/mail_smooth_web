import { MailbodyTinker } from "./mailbody_tinker";
import { PrepareMailbody } from "./prepare";

// jest template

test('test', () => {
    const tinker = new MailbodyTinker(10)

    let act, exp, input;

    input = `
https://example.com/abcdefg?abc=def
====================
`
    act = PrepareMailbody.convert(input);
    exp = `
(URL)
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

test('Markdown強調記法の除去', () => {
    let input, act, exp;

    // 単一の強調
    input = `これは**太字**のテキストです。`;
    act = PrepareMailbody.convert(input);
    exp = `これは太字のテキストです。`;
    expect(act).toBe(exp);

    // 複数の強調
    input = `**複数**の**強調**もOK。`;
    act = PrepareMailbody.convert(input);
    exp = `複数の強調もOK。`;
    expect(act).toBe(exp);

    // 強調なし
    input = `通常のテキスト`;
    act = PrepareMailbody.convert(input);
    exp = `通常のテキスト`;
    expect(act).toBe(exp);
});
