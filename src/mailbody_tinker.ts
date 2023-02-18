import { CONST } from "./constants"

// メール本文の処理を行うクラス
export class MailbodyTinker {
    title: string
    raw_body: string
    bodies: string[]
    max_part_length: number

    constructor(max_part_length = 10000) {
        this.title = ""
        this.raw_body = ""
        this.bodies = []
        this.max_part_length = max_part_length

    }

    proc(body: string): string[] {
        if (body.length == 0) {
            throw new Error("メール本文が未入力です。")
        }
        this.raw_body = body

        body = this.regex_convert(body)
        this.bodies = this.split_body(body, this.max_part_length)

        return this.bodies

    }

    // 正規表現を使って文字列の置換処理を行う
    regex_convert(raw_body: string): string {
        let converted: string

        // セパレーター文字列のシュリンク
        const reg_shrink = new RegExp(CONST.RE_SHRINK, 'g')
        converted = raw_body.replace(reg_shrink, "$1")
        const reg_url = new RegExp(CONST.RE_URL, 'g')

        // URLの置換
        converted = converted.replace(reg_url, '(URL)')
        console.log(converted.length)

        return converted
    }

    // 指定文字数以内で文字列を区切った文字列配列を返す
    split_body(body: string, max: number): string[] {
        // 指定文字列未満のとき、そのまま帰す
        if (body.length < max) {
            return [body]
        }

        const splitted = body.split(/\n\n/)

        const result = splitted.reduce((prev: string[], paragraph: string) => {
            paragraph += "\n\n"
            const count = prev[prev.length - 1].length
            if (count + paragraph.length > max) {
                // 新しくパラグラフを追加する
                prev.push(paragraph)
            }
            else {
                // 末端のパラグラフに連結する
                prev[prev.length - 1] = prev[prev.length - 1].concat(paragraph)
            }
            return prev
        }, [""])

        return result
    }

}