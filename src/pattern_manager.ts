// ヘッダーとフッターのパターンを管理するクラス
export interface Pattern {
    id: string
    text: string
    enabled: boolean
}

export class PatternManager {
    private static STORAGE_KEY_HEADER = 'mail_smooth_header_patterns'
    private static STORAGE_KEY_FOOTER = 'mail_smooth_footer_patterns'

    // ヘッダーパターンを取得
    static getHeaderPatterns(): Pattern[] {
        return this.getPatterns(this.STORAGE_KEY_HEADER)
    }

    // フッターパターンを取得
    static getFooterPatterns(): Pattern[] {
        return this.getPatterns(this.STORAGE_KEY_FOOTER)
    }

    // パターンを取得
    private static getPatterns(key: string): Pattern[] {
        const stored = localStorage.getItem(key)
        if (!stored) {
            return []
        }
        try {
            return JSON.parse(stored) as Pattern[]
        } catch (e) {
            console.error('Failed to parse patterns:', e)
            return []
        }
    }

    // ヘッダーパターンを保存
    static saveHeaderPatterns(patterns: Pattern[]): void {
        this.savePatterns(this.STORAGE_KEY_HEADER, patterns)
    }

    // フッターパターンを保存
    static saveFooterPatterns(patterns: Pattern[]): void {
        this.savePatterns(this.STORAGE_KEY_FOOTER, patterns)
    }

    // パターンを保存
    private static savePatterns(key: string, patterns: Pattern[]): void {
        localStorage.setItem(key, JSON.stringify(patterns))
    }

    // ヘッダーパターンを追加
    static addHeaderPattern(text: string): void {
        const patterns = this.getHeaderPatterns()
        patterns.push({
            id: this.generateId(),
            text: text,
            enabled: true
        })
        this.saveHeaderPatterns(patterns)
    }

    // フッターパターンを追加
    static addFooterPattern(text: string): void {
        const patterns = this.getFooterPatterns()
        patterns.push({
            id: this.generateId(),
            text: text,
            enabled: true
        })
        this.saveFooterPatterns(patterns)
    }

    // ヘッダーパターンを削除
    static removeHeaderPattern(id: string): void {
        const patterns = this.getHeaderPatterns().filter(p => p.id !== id)
        this.saveHeaderPatterns(patterns)
    }

    // フッターパターンを削除
    static removeFooterPattern(id: string): void {
        const patterns = this.getFooterPatterns().filter(p => p.id !== id)
        this.saveFooterPatterns(patterns)
    }

    // ヘッダーパターンの有効/無効を切り替え
    static toggleHeaderPattern(id: string): void {
        const patterns = this.getHeaderPatterns()
        const pattern = patterns.find(p => p.id === id)
        if (pattern) {
            pattern.enabled = !pattern.enabled
            this.saveHeaderPatterns(patterns)
        }
    }

    // フッターパターンの有効/無効を切り替え
    static toggleFooterPattern(id: string): void {
        const patterns = this.getFooterPatterns()
        const pattern = patterns.find(p => p.id === id)
        if (pattern) {
            pattern.enabled = !pattern.enabled
            this.saveFooterPatterns(patterns)
        }
    }

    // ユニークなIDを生成
    private static generateId(): string {
        return `pattern_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    }

    // テキストからヘッダーを削除
    static removeHeader(text: string): string {
        const patterns = this.getHeaderPatterns().filter(p => p.enabled)
        let result = text

        for (const pattern of patterns) {
            // パターンを行単位で検索し、最初に見つかった位置以降を返す
            const lines = result.split('\n')
            const patternLines = pattern.text.split('\n')

            // パターンに一致する行を探す
            for (let i = 0; i < lines.length; i++) {
                let match = true
                for (let j = 0; j < patternLines.length && i + j < lines.length; j++) {
                    if (!lines[i + j].includes(patternLines[j].trim())) {
                        match = false
                        break
                    }
                }
                if (match) {
                    // マッチした行以降のテキストを返す
                    result = lines.slice(i + patternLines.length).join('\n')
                    break
                }
            }
        }

        return result
    }

    // テキストからフッターを削除
    static removeFooter(text: string): string {
        const patterns = this.getFooterPatterns().filter(p => p.enabled)
        let result = text

        for (const pattern of patterns) {
            // パターンを行単位で検索し、最初に見つかった位置以前を返す
            const lines = result.split('\n')
            const patternLines = pattern.text.split('\n')

            // パターンに一致する行を探す
            for (let i = 0; i < lines.length; i++) {
                let match = true
                for (let j = 0; j < patternLines.length && i + j < lines.length; j++) {
                    if (!lines[i + j].includes(patternLines[j].trim())) {
                        match = false
                        break
                    }
                }
                if (match) {
                    // マッチした行以前のテキストを返す
                    result = lines.slice(0, i).join('\n')
                    break
                }
            }
        }

        return result
    }
}
