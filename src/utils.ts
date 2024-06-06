

export class Utils {

    // 空文字列ではないことをチェックする
    static is_not_empty_string(test_str: string | string[] | undefined | null) {
        return !Utils.is_empty_string(test_str)
    }

    // 空文字列であることをチェックする
    static is_empty_string(test_str: string | string[] | undefined | null) {
        if (test_str == null || test_str == undefined) {
            return true
        }

        if (test_str.length > 0) {
            return false
        }

        return true
    }

    // 設定値またはデフォルト値を取得
    static get_from = (dic: { [key: string]: string }, conf_key: string, defaults: string): string => {
        if (dic.hasOwnProperty(conf_key)) {
            return dic[conf_key]
        }
        return defaults
    }

    // ノードを構築して返す
    /**
     * HTML要素を作成し、指定された属性を設定して返します。
     * @param tagName 作成する要素のタグ名
     * @param className 要素に設定するクラス名（デフォルトは空文字列）
     * @param childElements 追加する子要素の配列（デフォルトは空の配列）
     * @param textContent 要素のテキストコンテンツ（デフォルトは空文字列）
     * @param attrs 要素に設定する属性のオブジェクト（デフォルトはundefined）
     * @return 作成されたHTML要素
     */
    static createElement = (
        tagName: string,
        className: string = "",
        childElements: HTMLElement[] = [],
        textContent: string = "",
        attrs: { [key: string]: string } | undefined = undefined
    ): HTMLElement => {
        const el = document.createElement(tagName)
        el.className = className
        el.textContent = textContent

        if (childElements.length > 0) {
            childElements.forEach((child) => {
                el.appendChild(child)
            })
        }

        // 属性値をセット
        if (attrs) {
            Object.entries(attrs).forEach(([key, value]) => {
                el.setAttribute(key, value)
            })
        }
        return el
    }

    // shotcut for createElement
    /**
     * createElement関数のショートカット
     * @param t 作成する要素のタグ名
     * @param c 要素に設定するクラス名（デフォルトは空文字列）
     * @param ce 追加する子要素の配列（デフォルトは空の配列）
     * @param tc 要素のテキストコンテンツ（デフォルトは空文字列）
     * @param at 要素に設定する属性のオブジェクト（デフォルトはundefined）
     * @return 作成されたHTML要素
     */
    static ce = (
        t: string,
        c: string = "",
        ce: HTMLElement[] = [],
        tc: string = "",
        at: { [key: string]: string } | undefined = undefined
    ): HTMLElement => {
        return this.createElement(t, c, ce, tc, at)
    }
    /**
     * kintoneのメニューアイコン風にスタイルを付与する
     * @param el 装飾対象のノード
     */
    static decorate_menu_icon(el: HTMLElement): HTMLElement {
        el.style.height = '48px'
        el.style.backgroundColor = '#f7f9fa'
        el.style.fontSize = '28px'
        el.style.border = '1px solid #e3e7e8'
        el.style.display = 'inline'
        el.style.marginLeft = '2px'
        el.style.marginRight = '2px'
        el.style.verticalAlign = 'middle'

        return el
    }


    /**
     * テキストだけを持ったDIV要素を構築して返す
     * @param msg innerText
     * @returns 
     */
    static simpleDiv = (msg: string): HTMLDivElement => {
        return Utils.createElement('div', '', [], msg) as HTMLDivElement
    }

    // 配列のうち、重複したものがあればTrueを返す
    static is_overlapped = (list: any[]) => {
        const overlapped = Utils.overlapped(list)

        if (overlapped.length > 0) {
            return true
        }
        return false
    }

    // 配列のうち、重複したものをUniqして返す
    static overlapped = (list: any[]) => {
        const overlapped = list.filter((x, _i, self) => {
            return self.indexOf(x) !== self.lastIndexOf(x)
        })

        return Array.from(new Set(overlapped))

    }

    // 現在開いているkintoneドメインのうち指定した番号のアプリのURLを構築して返す
    static get_application_url(appid: string): string {
        return `${location.protocol}//${location.host}/k/${appid}`
    }


    // kintone clientのエラーを受け取ってメッセージを抽出し、文字列配列の形で返す
    static retrieve_errors(error: any, max_msgs: number = -1): string[] | undefined {
        const errors = error?.error?.errors
        if (errors == undefined) {
            return undefined
        }

        // メッセージの構築
        let whole_errors: string[] = []
        Object.keys(errors).forEach((field) => {
            const msgs = errors[field].messages
            const comments = msgs.map((msg: string) => {
                return `[${field}] ${msg}`
            })
            whole_errors = whole_errors.concat(comments)
        })

        // ソート
        whole_errors.sort()

        // エラーレコードの件数が多い場合に省略
        if (max_msgs >= 0 && max_msgs < whole_errors.length) {
            const remain_msgs = whole_errors.length - max_msgs
            whole_errors = whole_errors.splice(0, max_msgs)
            whole_errors.push(`以下${remain_msgs}件のエラーメッセージを省略しました。`)
        }

        return whole_errors
    }
}
