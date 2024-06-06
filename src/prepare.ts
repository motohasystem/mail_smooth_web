import { ClipboardManager } from "./clipboard_manager"
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

    static getLocalStorage(key: string, preset: string) {
        const saved = localStorage.getItem(key)
        if (saved == null) {
            return preset
        }
        return saved.toString()
    }

    // 画面を構築する
    build_forms(node_id: string) {
        const top = document.getElementById(node_id)
        top?.setAttribute("class", "me-5")

        // ペーストボタン(paste)
        const btn_paste = Utils.ce('input', 'btn btn-primary col-4 mt-3 mb-4', [], '', {
            type: 'button'
            , value: '📋paste'
            , id: CONST.ID_BUTTON_RUN
        })
        btn_paste.addEventListener('click', PrepareMailbody.paste)

        // 実行ボタン(smoothing)
        const btn_run = Utils.ce('input', 'btn btn-primary col-5 ms-2 mt-3 mb-4', [], '', {
            type: 'button'
            , value: CONST.VALUE_BTN_SMOOTHING
            , id: CONST.ID_BUTTON_RUN
        })
        btn_run.addEventListener('click', PrepareMailbody.run)

        // クリアボタン
        const btn_clear = Utils.ce('input', "btn btn-outline-danger col-2 ms-2 mt-3 mb-4", [], '', {
            type: 'button'
            , value: '👻clear'
            , id: CONST.ID_BTN_CLEAR
        })
        btn_clear.addEventListener('click', () => {
            const from = PrepareMailbody.get_from_field()
            from.value = ""
            PrepareMailbody.change_from()
        })

        // 文字数上限入力フォーム
        const limit_length = PrepareMailbody.getLocalStorage(CONST.ID_LIMIT_LENGTH, CONST.LIMIT_LENGTH.toString())
        const field_limit = Utils.ce("input", "col-5", [], "", {
            id: CONST.ID_LIMIT_LENGTH
            , value: limit_length
            , placeholder: CONST.VALUE_LIMIT_PLACEHOLDER
        })

        // FROMフィールド
        const default_from = PrepareMailbody.getLocalStorage(CONST.ID_TEXT_FROM, "")
        const label_from = Utils.ce('label', 'col-4 mb-2', [], "from")
        const textfield_from = PrepareMailbody.create_textarea(CONST.ID_TEXT_FROM, default_from, true)
        textfield_from.addEventListener('change', PrepareMailbody.change_from)


        // 見出し新規入力フィールド
        const field_newsubject = Utils.ce('input', 'form-control col-4', [], '', {
            id: CONST.ID_NEW_SUBJECT
            , value: "" // 値は常に空欄
            , placeholder: CONST.VALUE_NEW_SUBJECT_PLACEHOLDER
        })

        // 過去の見出し選択ドロップダウン
        const dropdown_subject_history = PrepareMailbody.create_subject_historym(CONST.VALUE_LABEL_HISOTRY, CONST.ID_SUBJECT_HISTORIES)

        // TOフィールド
        const label_to = Utils.ce('label', 'col-4 mb-2', [], "to speach")
        const textfield_to = PrepareMailbody.create_textarea(CONST.ID_TEXT_TO)
        textfield_to.addEventListener('change', PrepareMailbody.change_to)

        // クリップボードにコピーボタン
        const copy_to_cb = PrepareMailbody.create_copybutton(CONST.ID_BTN_COPY, CONST.VALUE_BTN_COPY)

        // btn_paste.classList.add("col-2")
        btn_run.classList.add("col-5")
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
                Utils.ce('div', 'col-5', [], "split about: ")
                , field_limit
            ])
            , Utils.ce('div', 'row', [
                field_newsubject
                , dropdown_subject_history
            ])
            , Utils.ce('div', 'row', [
                btn_paste
                , btn_run
                , btn_clear
            ])
            , Utils.ce("div", 'row', [
                label_to
                , Utils.ce('span', 'col-4', [], '', {
                    id: CONST.ID_LENGTH_TO
                })
            ])
            , textfield_to
            , Utils.ce('div', 'row mt-3', [
                Utils.ce('div', 'col', [], '', {   // パラグラフ別コピーボタン置き場
                    id: CONST.ID_BUTTONS
                })
            ])
            , copy_to_cb
        ])

        top?.append(formset)
    }

    // pasteボタンを押してクリップボードからデータを貼り付ける
    static paste() {
        const node_from = document.getElementById(CONST.ID_TEXT_FROM) as HTMLTextAreaElement
        console.log({ node_from })
        if (node_from == null) {
            throw new Error(`指定したノードID[${CONST.ID_TEXT_FROM}]が見つかりません。`)
        }
        navigator.clipboard.readText().then((text) => {
            // console.log(text);
            node_from.value = text
        });
    }

    // smoothing ボタンを押したら走る処理
    static run() {
        PrepareMailbody.clear_copybutton(CONST.ID_BTN_COPY)

        const from = PrepareMailbody.get_from_field()
        const to = PrepareMailbody.get_to_field()

        const node_limit = document.getElementById(CONST.ID_LIMIT_LENGTH) as HTMLInputElement
        localStorage.setItem(CONST.ID_LIMIT_LENGTH, node_limit.value)
        localStorage.setItem(CONST.ID_TEXT_FROM, from.value)

        const tinker = new MailbodyTinker(parseInt(node_limit.value))
        const converted = tinker.proc(from.value)

        // 分割済みのテキストを作成し、テキストを割り当て済みのボタンを配置する
        const buttons = PrepareMailbody.list_splitted_contents(converted)
        const btn_group = Utils.ce("div", 'btn-group', buttons)

        const node_buttons = document.getElementById(CONST.ID_BUTTONS)
        if (node_buttons) {
            Array.from(node_buttons.childNodes).forEach(btn => {
                btn.remove()
            })
            node_buttons?.appendChild(btn_group)
        }

        // 最初のパラグラフをtoフィールドにコピーする
        buttons[0].dispatchEvent(new Event('click'))

        // タイトル履歴を更新する
        PrepareMailbody.update_subject_histories()
    }

    // パラグラフごとに表示ボタンを作成する
    static list_splitted_contents(contents: string[]): HTMLElement[] {
        const to_field = PrepareMailbody.get_to_field()
        let paging = 0
        return contents.map((text) => {
            paging++
            const paragraph = Utils.ce("input", "btn  btn-secondary", [], "", {
                'type': 'button',
                'value': `page ${paging}`
            })

            const subject = PrepareMailbody.get_subject(paging)

            paragraph.addEventListener("click", (event) => {
                to_field.value = subject + '\n\n' + text
                PrepareMailbody.change_to()
                PrepareMailbody.clear_copybutton(CONST.ID_BTN_COPY)
            })

            return paragraph
        })

    }

    // パラグラフごとのタイトルを取得する。
    // ファイル名としても利用する
    static get_subject(paging: number = 0) {

        // YYYYMMDD 形式の日付文字列を構築する
        const datestring = (new Date()).toISOString().split('T')[0].replace(/-/g, '')
        const el_subject = document.getElementById(CONST.ID_NEW_SUBJECT) as HTMLInputElement
        const paging_zero_padding = paging.toString().padStart(2, '0')

        const filebodies = [
            datestring
            , el_subject?.value
            , paging_zero_padding
        ].filter((item) => {
            return item != ""
        })

        const subject = (el_subject == null) ? paging_zero_padding : filebodies.join('_')
        return subject
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
    static create_textarea(id: string, preset: string = "", clear_buttons: boolean = false): HTMLElement {
        const area = Utils.ce('textarea', 'form-control', [], preset, {
            id: id
            // , cols: '10'
            , rows: '5'
        })
        area.style.overflowX = "scroll"
        area.classList.add('col')
        area.classList.add('me-2')

        // インプットのテキストエリアをトップボトム移動ボタン
        const btn_input_top = PrepareMailbody.create_scroll_to_top(CONST.VALUE_BTN_TO_TOP, id)
        const btn_input_bottom = PrepareMailbody.create_scroll_to_bottom(CONST.VALUE_BTN_TO_BOTTOM, id)

        let buttons

        // clearボタンの有無を切り分ける
        if (clear_buttons) {
            const btn_erase_before = PrepareMailbody.create_remove_to_top(CONST.VALUE_BTN_ERASE_BEFORE, id)
            const btn_erase_after = PrepareMailbody.create_remove_to_bottom(CONST.VALUE_BTN_ERASE_AFTER, id)

            btn_erase_before.classList.add('mb-4')
            buttons = [
                btn_input_top
                , btn_erase_before
                , btn_erase_after
                , btn_input_bottom
            ]
        }
        else {
            btn_input_top.classList.add('mb-4')
            buttons = [
                btn_input_top
                , btn_input_bottom
            ]
        }

        btn_input_top.classList.add('row')
        btn_input_bottom.classList.add('row')
        return Utils.ce('div', 'row', [
            area
            , Utils.ce('div', 'col-2', buttons)
        ])
    }

    // 指定したテキストエリアを操作するボタンを構築する(rowを返す)
    static callback_textarea_button(label: string, target: string, callback: (el: HTMLTextAreaElement) => void, buttonStyle: string = CONST.STYLE_SCROLL) {
        const btn_scroll = Utils.ce('input', buttonStyle, [], '', {
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

    // テキストエリアのカーソルから上を削除するボタンを構築する(rowを返す)
    static create_remove_to_top(label: string, target_id: string): HTMLElement {
        const btn_remove = PrepareMailbody.callback_textarea_button(label, target_id, (el: HTMLTextAreaElement) => {
            PrepareMailbody.remove_to(target_id, false)
        }, CONST.STYLE_ERASE)

        return btn_remove
    }

    // テキストエリアのカーソルから下を削除するボタンを構築する(rowを返す)
    static create_remove_to_bottom(label: string, target_id: string): HTMLElement {
        const btn_remove = PrepareMailbody.callback_textarea_button(label, target_id, (el: HTMLTextAreaElement) => {
            PrepareMailbody.remove_to(target_id, true)
        }, CONST.STYLE_ERASE)

        return btn_remove
    }

    // removeTextAfterCursor: trueのときカーソル位置から後ろに向かって削除、falseのときカーソル位置から前に向かって削除する
    static remove_to(target_id: string, removeTextAfterCursor: boolean) {
        // テキストエリアを取得
        const textarea = document.getElementById(target_id) as HTMLTextAreaElement
        if (textarea == null) {
            throw new Error(`textarea: ${target_id} is not found.`)
        }

        // テキストエリアにフォーカスがなければ何もしない
        const active = document.activeElement
        if (active == null) {
            return
        }

        // カーソルの現在位置を取得
        const cursorPosition = textarea.selectionStart;
        if (cursorPosition == null) {
            return
        }

        if (removeTextAfterCursor) {
            // カーソル位置から後ろのテキストのみを保持
            textarea.value = textarea.value.substring(0, cursorPosition);
        }
        else {
            // カーソル位置から前のテキストのみを保持
            textarea.value = textarea.value.substring(cursorPosition);
        }
    }


    // クリップボードにコピーボタン(rowを返す)
    static create_copybutton(id: string, label: string): HTMLElement {
        const style_default = CONST.STYLE_COPY_DEFAULT
        const copybutton = Utils.ce('input', 'btn mt-3 mb-2', [], '', {
            id: id
            , type: "button"
            , value: label
        }) as HTMLInputElement
        copybutton.classList.add(style_default)

        copybutton.addEventListener("click", (event) => {
            const cbtext = PrepareMailbody.read_to_field()

            ClipboardManager.revokePermission()
            navigator.clipboard.writeText(cbtext).then((data) => {
                copybutton.setAttribute('value', 'copied!')
                copybutton.classList.remove(style_default)
                copybutton.classList.add(CONST.STYLE_COPY_SUCCESS)
            }).catch((e) => {
                copybutton.setAttribute('value', 'failed!')
            })
        })

        copybutton.classList.add("col-12")

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

    // セレクトボックス用のプレースホルダを先頭に挿入する
    static insert_selectbox_placeholder(dropdown: HTMLSelectElement) {
        const placeholder = Utils.ce("option", "", [], CONST.VALUE_SELECTBOX_PLACEHOLDER, {
            'value': ""
            , 'disabled': ""
            , 'selected': ""
        })

        dropdown.insertBefore(placeholder, dropdown.firstChild)
    }


    // タイトル履歴のドロップダウンを構築する
    static create_subject_historym(label: string, id: string): HTMLSelectElement {
        const dropdown = Utils.ce("select", "form-select col-4", [], "", {
            id: id
        }) as HTMLSelectElement
        // <option value="" disabled selected>選択してください</option>
        PrepareMailbody.insert_selectbox_placeholder(dropdown)


        const histories = PrepareMailbody.getLocalStorage(CONST.ID_SUBJECT_HISTORIES, "")

        if (histories != "") {
            const history = histories.split(",")
            history.forEach((item) => {
                const option = Utils.ce("option", "", [], item, {
                    'value': item
                })
                dropdown.appendChild(option)
            })
        }

        dropdown.addEventListener("change", (event) => {
            const selected = dropdown.value
            const newsubject = document.getElementById(CONST.ID_NEW_SUBJECT) as HTMLInputElement
            newsubject.value = selected
        })

        return dropdown
    }

    // タイトル履歴を更新する
    static update_subject_histories() {
        const dropdown = document.getElementById(CONST.ID_SUBJECT_HISTORIES) as HTMLSelectElement
        if (dropdown == null) {
            return
        }

        const newsubject = document.getElementById(CONST.ID_NEW_SUBJECT) as HTMLInputElement
        if (newsubject == null) {
            return
        }

        const current = newsubject.value
        const histories = PrepareMailbody.getLocalStorage(CONST.ID_SUBJECT_HISTORIES, "")
        const history = histories.split(",")

        // 重複を削除
        const new_history = history.filter((item) => {
            return item != current
        })

        new_history.unshift(current)
        const new_histories = new_history.join(",")
        localStorage.setItem(CONST.ID_SUBJECT_HISTORIES, new_histories)

        // 履歴を更新
        while (dropdown.firstChild) {
            dropdown.removeChild(dropdown.firstChild)
        }

        new_history.forEach((item) => {
            const option = Utils.ce("option", "", [], item, {
                'value': item
            })
            dropdown.appendChild(option)
        })

        // <option value="" disabled selected>選択してください</option>
        PrepareMailbody.insert_selectbox_placeholder(dropdown)

    }
}
