import { CONST } from "./constants"
import { MailbodyTinker } from "./mailbody_tinker"
import { Utils } from "./utils"

export class PrepareMailbody {
    top_id: string

    // inputのテキストフィールドから、outputのテキストフィールドに変換結果をコピーする
    constructor(id: string) {
        this.top_id = id
    }

    build() {
        this.build_forms(this.top_id)
    }

    // 画面を構築する
    build_forms(node_id: string) {
        const top = document.getElementById(node_id)
        top?.setAttribute("class", "me-5")

        // 実行ボタン
        const btn_run = Utils.ce('input', 'btn btn-primary mb-3', [], '', {
            type: 'button'
            , value: 'prepare'
            , id: CONST.ID_BUTTON_RUN
        })
        btn_run.addEventListener('click', PrepareMailbody.run)

        // 文字数上限入力フォーム
        const field_limit = Utils.ce("input", "float-end ms-2", [], "", {
            id: CONST.ID_LIMIT_LENGTH
            , value: `${CONST.LIMIT_LENGTH}`
        })

        // FROMフィールド
        const textfield_from = PrepareMailbody.create_textarea(CONST.ID_TEXT_FROM, "入力テキスト")
        textfield_from.addEventListener('change', PrepareMailbody.change_from)

        // TOフィールド
        const textfield_to = PrepareMailbody.create_textarea(CONST.ID_TEXT_TO, "読み上げ用テキスト")
        textfield_to.addEventListener('change', PrepareMailbody.change_to)

        // クリップボードにコピーボタン
        const copy_to_cb = PrepareMailbody.create_copybutton(CONST.ID_BTN_COPY, "copy to clipboard")

        // 全体を構築
        const formset = Utils.ce('div', '', [
            Utils.ce('span', 'float-end', [], '', {
                id: CONST.ID_LENGTH_FROM
            })
            , textfield_from
            , Utils.ce('div', 'float-end', [field_limit], "分割文字数の目安: ")
            , Utils.ce('div', '', [
                btn_run
            ])
            , Utils.ce('span', 'float-end', [], '', {
                id: CONST.ID_LENGTH_TO
            })
            , textfield_to
            , copy_to_cb
            , Utils.ce('div', '', [], '', {
                id: CONST.ID_BUTTONS
            })
        ])

        top?.append(formset)
    }

    static run() {
        PrepareMailbody.clear_copybutton(CONST.ID_BTN_COPY)

        const from = PrepareMailbody.get_from_field()
        const to = PrepareMailbody.get_to_field()

        const node_limit = document.getElementById(CONST.ID_LIMIT_LENGTH) as HTMLInputElement
        const tinker = new MailbodyTinker(parseInt(node_limit.value))
        const converted = tinker.proc(from.value)
        console.log(converted)

        const buttons = PrepareMailbody.list_splitted_contents(converted)
        const btn_group = Utils.ce("div", 'btn-group', buttons)

        const node_buttons = document.getElementById(CONST.ID_BUTTONS)
        if (node_buttons) {
            Array.from(node_buttons.childNodes).forEach(btn => {
                btn.remove()
            })
            node_buttons?.append(btn_group)
        }
        buttons[0].dispatchEvent(new Event('click'))
    }

    // パラグラフごとに表示ボタンを作成する
    static list_splitted_contents(contents: string[]): HTMLElement[] {
        const to_field = PrepareMailbody.get_to_field()
        let paging = 0
        return contents.map(text => {
            paging++
            const paragraph = Utils.ce("input", "btn  btn-secondary", [], "", {
                'type': 'button',
                'value': `page ${paging}`
            })

            paragraph.addEventListener("click", (event) => {
                to_field.value = text
                PrepareMailbody.change_to()
                PrepareMailbody.clear_copybutton(CONST.ID_BTN_COPY)
            })

            return paragraph
        })

    }

    static convert(content: string | null) {
        if (content == null) {
            return ""
        }
        let converted: string
        const reg_shrink = new RegExp(CONST.RE_SHRINK, 'g')
        converted = content.replace(reg_shrink, "$1")

        const reg_url = new RegExp(CONST.RE_URL, 'g')
        converted = converted.replace(reg_url, '(URL)')
        console.log(converted.length)
        return converted
    }

    // fromフィールドの編集イベント
    static change_from() {
        console.log('change from')
        const from = PrepareMailbody.get_from_field()
        const length = from.value.length

        const node_info = document.getElementById(CONST.ID_LENGTH_FROM) as HTMLElement
        if (node_info) {
            node_info.textContent = length.toString()
        }
    }

    // toフィールドの編集イベント
    static change_to() {
        console.log('change to')
        const to = PrepareMailbody.get_to_field()
        const length = to.value.length

        const node_info = document.getElementById(CONST.ID_LENGTH_TO) as HTMLElement
        if (node_info) {
            node_info.textContent = length.toString()
        }
    }

    // FROMフィールドを取得する
    static get_from_field(): HTMLTextAreaElement {
        const from = document.getElementById(CONST.ID_TEXT_FROM) as HTMLTextAreaElement
        if (from === null) {
            throw new Error('fromノードが取得できませんでした。')
        }
        return from
    }

    // TOフィールドを取得する
    static get_to_field(): HTMLTextAreaElement {
        const to = document.getElementById(CONST.ID_TEXT_TO) as HTMLTextAreaElement
        if (to === null) {
            throw new Error('toノードが取得できませんでした。')
        }
        return to
    }

    static read_to_field(): string {
        const to = PrepareMailbody.get_to_field()
        return to.value
    }

    static create_textarea(id: string, label: string): HTMLElement {
        //     <div class="mb-3">
        //     <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
        //     <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        //   </div>        
        const area = Utils.ce('textarea', 'form-control', [], '', {
            id: id
            , cols: '10'
            , rows: '5'
        })
        area.style.overflowX = "scroll"

        return Utils.ce('div', 'mb-3', [
            Utils.ce('label', 'form-label', [], label, {
                'for': id
            })
            , area
        ])
    }

    // クリップボードにコピーボタン
    static create_copybutton(id: string, label: string): HTMLElement {
        const style_default = CONST.STYLE_COPY_DEFAULT
        const copybutton = Utils.ce('input', 'btn float-end mee-2', [], '', {
            id: CONST.ID_BTN_COPY
            , type: "button"
            , value: CONST.VALUE_BTN_COPY
        })
        copybutton.classList.add(style_default)
        copybutton.addEventListener("click", (event) => {
            const cbtext = PrepareMailbody.read_to_field()
            navigator.clipboard.writeText(cbtext).then((data) => {
                copybutton.setAttribute('value', 'success!')
                copybutton.classList.remove(style_default)
                copybutton.classList.add(CONST.STYLE_COPY_SUCCESS)
            }).catch((e) => {
                copybutton.setAttribute('value', 'failed!')
            })
        })

        return copybutton
    }

    // コピーボタンを元に戻す
    static clear_copybutton(id: string) {
        const style_default = CONST.STYLE_COPY_DEFAULT
        const copybutton = document.getElementById(CONST.ID_BTN_COPY)
        if (copybutton) {
            copybutton.classList.remove(CONST.STYLE_COPY_SUCCESS)
            copybutton.classList.add(style_default)
            copybutton.setAttribute("value", CONST.VALUE_BTN_COPY)
        }

    }

}
