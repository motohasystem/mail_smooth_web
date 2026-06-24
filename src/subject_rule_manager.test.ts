import { SubjectRuleManager } from "./subject_rule_manager";

beforeEach(() => {
    localStorage.clear();
});

test('ルールの追加・取得', () => {
    SubjectRuleManager.addRule('週刊Life is beautiful', 'LIB');
    const rules = SubjectRuleManager.getRules();
    expect(rules.length).toBe(1);
    expect(rules[0].pattern).toBe('週刊Life is beautiful');
    expect(rules[0].subject).toBe('LIB');
    expect(rules[0].enabled).toBe(true);
});

test('本文に含まれるパターンと一致したら見出しを返す', () => {
    SubjectRuleManager.addRule('週刊Life is beautiful', 'LIB');
    const body = '週刊Life is beautiful ２０２３年２月７日号： GPT3は電気羊の夢を見るか？\n\n今週のざっくばらん';
    expect(SubjectRuleManager.match(body)).toBe('LIB');
});

test('一致するパターンが無ければ null を返す', () => {
    SubjectRuleManager.addRule('週刊Life is beautiful', 'LIB');
    expect(SubjectRuleManager.match('まったく別のメルマガ本文')).toBeNull();
});

test('空文字・null の本文では null を返す', () => {
    SubjectRuleManager.addRule('週刊Life is beautiful', 'LIB');
    expect(SubjectRuleManager.match('')).toBeNull();
    expect(SubjectRuleManager.match(null)).toBeNull();
    expect(SubjectRuleManager.match(undefined)).toBeNull();
});

test('上に登録したルールが優先される', () => {
    SubjectRuleManager.addRule('マンデーランチビュッフェ', 'MLB');
    SubjectRuleManager.addRule('夜間飛行', 'YKH');
    // 両方のパターンを含む本文
    const body = '小寺・西田の「マンデーランチビュッフェ」Vol179【夜間飛行】';
    expect(SubjectRuleManager.match(body)).toBe('MLB');
});

test('無効化したルールは照合対象から外れる', () => {
    SubjectRuleManager.addRule('週刊Life is beautiful', 'LIB');
    const id = SubjectRuleManager.getRules()[0].id;
    SubjectRuleManager.toggleRule(id);
    expect(SubjectRuleManager.match('週刊Life is beautiful 今週号')).toBeNull();
});

test('ルールの削除', () => {
    SubjectRuleManager.addRule('週刊Life is beautiful', 'LIB');
    const id = SubjectRuleManager.getRules()[0].id;
    SubjectRuleManager.removeRule(id);
    expect(SubjectRuleManager.getRules().length).toBe(0);
});
