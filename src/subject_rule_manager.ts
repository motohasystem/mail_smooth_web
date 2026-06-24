// 「本文に含まれる文字列 → 見出し」の対応ルールを管理するクラス
export interface SubjectRule {
    id: string
    // 本文に含まれているか照合する文字列（部分一致）
    pattern: string
    // 一致したときに採用する見出し
    subject: string
    enabled: boolean
}

export class SubjectRuleManager {
    private static STORAGE_KEY = 'mail_smooth_subject_rules'

    // ルール一覧を取得
    static getRules(): SubjectRule[] {
        const stored = localStorage.getItem(this.STORAGE_KEY)
        if (!stored) {
            return []
        }
        try {
            return JSON.parse(stored) as SubjectRule[]
        } catch (e) {
            console.error('Failed to parse subject rules:', e)
            return []
        }
    }

    // ルール一覧を保存
    static saveRules(rules: SubjectRule[]): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(rules))
    }

    // ルールを追加
    static addRule(pattern: string, subject: string): void {
        const rules = this.getRules()
        rules.push({
            id: this.generateId(),
            pattern: pattern,
            subject: subject,
            enabled: true
        })
        this.saveRules(rules)
    }

    // ルールを削除
    static removeRule(id: string): void {
        const rules = this.getRules().filter(r => r.id !== id)
        this.saveRules(rules)
    }

    // ルールの有効/無効を切り替え
    static toggleRule(id: string): void {
        const rules = this.getRules()
        const rule = rules.find(r => r.id === id)
        if (rule) {
            rule.enabled = !rule.enabled
            this.saveRules(rules)
        }
    }

    // ユニークなIDを生成
    private static generateId(): string {
        return `subject_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    }

    /**
     * 本文を登録済みルールと照合し、最初に一致したルールの見出しを返す。
     * 一致するものが無ければ null。
     * （上に登録されたルールが優先される）
     */
    static match(body: string | null | undefined): string | null {
        if (!body) {
            return null
        }
        const rules = this.getRules().filter(r => r.enabled && r.pattern !== '')
        for (const rule of rules) {
            if (body.includes(rule.pattern)) {
                return rule.subject
            }
        }
        return null
    }
}
