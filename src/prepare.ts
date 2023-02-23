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
        const btn_run = Utils.ce('input', 'btn btn-primary col-11 mt-3 mb-4', [], '', {
            type: 'button'
            , value: 'prepare'
            , id: CONST.ID_BUTTON_RUN
        })
        btn_run.addEventListener('click', PrepareMailbody.run)

        // 文字数上限入力フォーム
        const field_limit = Utils.ce("input", "col-5 ms-2", [], "", {
            id: CONST.ID_LIMIT_LENGTH
            , value: `${CONST.LIMIT_LENGTH}`
        })

        // FROMフィールド
        const label_from = Utils.ce('label', 'col-4 mb-2', [], "入力テキスト")
        const textfield_from = PrepareMailbody.create_textarea(CONST.ID_TEXT_FROM)
        textfield_from.addEventListener('change', PrepareMailbody.change_from)

        // TOフィールド
        const label_to = Utils.ce('label', 'col-4 mb-2', [], "読み上げ用テキスト")
        const textfield_to = PrepareMailbody.create_textarea(CONST.ID_TEXT_TO)
        textfield_to.addEventListener('change', PrepareMailbody.change_to)

        // クリップボードにコピーボタン
        const copy_to_cb = PrepareMailbody.create_copybutton(CONST.ID_BTN_COPY, CONST.VALUE_BTN_COPY)

        btn_run.classList.add("col-9")
        copy_to_cb.classList.add("row")
        // 全体を構築
        const formset = Utils.ce('div', 'container', [
            Utils.ce("div", "row", [
                label_from
                , Utils.ce('span', 'col-4', [], '', {
                    id: CONST.ID_LENGTH_FROM
                })
            ])

            , textfield_from
            , Utils.ce("div", "row mt-3", [
                Utils.ce('div', 'col-5', [], "分割文字数の目安: ")
                , field_limit
            ])
            , Utils.ce('div', 'row', [
                btn_run
            ])
            , Utils.ce("div", 'row', [
                label_to
                , Utils.ce('span', 'col-4', [], '', {
                    id: CONST.ID_LENGTH_TO
                })
            ])
            , textfield_to
            , copy_to_cb
            // , Utils.ce('div', '', [], '', {
            //     id: CONST.ID_BUTTONS
            // })
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

    // テキストエリアを構築(rowを返す)
    static create_textarea(id: string): HTMLElement {
        const area = Utils.ce('textarea', 'form-control', [], '', {
            id: id
            // , cols: '10'
            , rows: '5'
        })
        area.style.overflowX = "scroll"
        area.classList.add('col')
        area.classList.add('me-2')

        // インプットのテキストエリアをトップボトム移動ボタン
        const btn_input_top = PrepareMailbody.create_scroll_to_top("⬆️", id)
        const btn_input_bottom = PrepareMailbody.create_scroll_to_bottom("⬇️", id)

        btn_input_top.classList.add('row')
        btn_input_top.classList.add('mb-4')
        btn_input_bottom.classList.add('row')
        return Utils.ce('div', 'row', [
            area
            , Utils.ce('div', 'col-2', [
                btn_input_top
                , btn_input_bottom
            ])
        ])
    }

    // 指定したテキストエリアを操作するボタンを構築する(rowを返す)
    static callback_textarea_button(label: string, target: string, callback: (el: HTMLTextAreaElement) => void) {
        const btn_scroll = Utils.ce('input', CONST.STYLE_SCROLL, [], '', {
            type: "button"
            , value: label
        }) as HTMLInputElement
        // btn_scroll.classList.add(CONST.STYLE_SCROLL)
        btn_scroll.addEventListener("click", (event) => {
            const el = document.getElementById(target) as HTMLTextAreaElement
            if (el) {
                console.log(el)
                callback(el)
            }
        })
        btn_scroll.classList.add("col")

        return Utils.ce("div", "row", [btn_scroll])

    }

    // 指定したテキストエリアをトップにスクロールするボタンを構築する(rowを返す)
    static create_scroll_to_top(label: string, target_id: string): HTMLElement {
        const btn_scroll = PrepareMailbody.callback_textarea_button(label, target_id, (el: HTMLTextAreaElement) => {
            el.scrollTop = 0
        })

        return btn_scroll
    }


    // 指定したテキストエリアをボトムにスクロールするボタンを構築する
    static create_scroll_to_bottom(label: string, target_id: string): HTMLElement {
        const btn_scroll = PrepareMailbody.callback_textarea_button(label, target_id, (el: HTMLTextAreaElement) => {
            el.scrollTop = el.scrollHeight
        })

        return btn_scroll
    }


    // クリップボードにコピーボタン(rowを返す)
    static create_copybutton(id: string, label: string): HTMLElement {
        const style_default = CONST.STYLE_COPY_DEFAULT
        const copybutton = Utils.ce('input', 'btn mt-4 mb-2', [], '', {
            id: id
            , type: "button"
            , value: label
        }) as HTMLInputElement
        copybutton.classList.add(style_default)
        copybutton.addEventListener("click", (event) => {
            const cbtext = PrepareMailbody.read_to_field()
            navigator.clipboard.writeText(cbtext).then((data) => {
                copybutton.setAttribute('value', 'copied!')
                copybutton.classList.remove(style_default)
                copybutton.classList.add(CONST.STYLE_COPY_SUCCESS)
            }).catch((e) => {
                copybutton.setAttribute('value', 'failed!')
            })
        })

        copybutton.classList.add("col-11")

        return Utils.ce("div", "row", [copybutton])
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
