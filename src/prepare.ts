import { ClipboardManager } from "./clipboard_manager"
import { CONST } from "./constants"
import { MailbodyTinker } from "./mailbody_tinker"
import { Utils } from "./utils"
import { PatternManager, Pattern } from "./pattern_manager"

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

    // 画面を構築する（Editorial Dark Design）
    build_forms(node_id: string) {
        const top = document.getElementById(node_id)
        if (!top) return

        // =======================
        // Action Buttons Block (top level)
        // =======================
        const copyOutputBtn = this.createActionButton('📄', 'コピー', 'btn-secondary', () => {
            const to = PrepareMailbody.get_to_field()
            navigator.clipboard.writeText(to.value).then(() => {
                // コピー成功のフィードバック
                copyOutputBtn.textContent = '✓'
                copyOutputBtn.classList.add('copied')
                setTimeout(() => {
                    copyOutputBtn.textContent = '📄'
                    copyOutputBtn.classList.remove('copied')
                }, 1500)
            })
        })

        const actionBlock = Utils.ce('div', 'action-block', [
            this.createActionButton('📋', 'ペースト', 'btn-secondary', PrepareMailbody.paste),
            Utils.ce('span', 'action-arrow', [], '→'),
            this.createActionButton('✨', '変換', 'btn-primary action-btn-main', PrepareMailbody.run),
            Utils.ce('span', 'action-arrow', [], '→'),
            copyOutputBtn
        ])

        // =======================
        // LEFT PANEL - Input
        // =======================
        const leftPanel = Utils.ce('div', 'editor-panel', [
            // Panel Header
            Utils.ce('div', 'panel-header', [
                Utils.ce('h2', 'panel-title', [
                    Utils.ce('span', 'icon', [], '📥')
                ], ' 入力'),
                Utils.ce('span', 'panel-meta', [], '0', { id: CONST.ID_LENGTH_FROM })
            ]),
            // Panel Body
            Utils.ce('div', 'panel-body', [
                // Options Row (見出し、履歴)
                Utils.ce('div', 'form-row', [
                    // Subject Input
                    Utils.ce('div', 'form-group', [
                        Utils.ce('label', 'form-label', [], '見出し'),
                        Utils.ce('input', 'ms-input', [], '', {
                            id: CONST.ID_NEW_SUBJECT,
                            type: 'text',
                            placeholder: CONST.VALUE_NEW_SUBJECT_PLACEHOLDER
                        })
                    ]),
                    // History Dropdown
                    Utils.ce('div', 'form-group', [
                        Utils.ce('label', 'form-label', [], '履歴'),
                        PrepareMailbody.create_subject_historym(CONST.VALUE_LABEL_HISOTRY, CONST.ID_SUBJECT_HISTORIES)
                    ])
                ]),
                // Textarea
                this.createInputTextarea(),
                // Split Length
                Utils.ce('div', 'form-group mt-md', [
                    Utils.ce('label', 'form-label', [], '分割文字数'),
                    Utils.ce('input', 'ms-input', [], '', {
                        id: CONST.ID_LIMIT_LENGTH,
                        type: 'number',
                        value: PrepareMailbody.getLocalStorage(CONST.ID_LIMIT_LENGTH, CONST.LIMIT_LENGTH.toString()),
                        placeholder: CONST.VALUE_LIMIT_PLACEHOLDER
                    })
                ])
            ])
        ])


        // =======================
        // RIGHT PANEL - Output
        // =======================
        const rightPanel = Utils.ce('div', 'editor-panel', [
            // Panel Header
            Utils.ce('div', 'panel-header', [
                Utils.ce('h2', 'panel-title', [
                    Utils.ce('span', 'icon', [], '📤')
                ], ' 出力'),
                Utils.ce('span', 'panel-meta', [], '0', { id: CONST.ID_LENGTH_TO })
            ]),
            // Panel Body
            Utils.ce('div', 'panel-body', [
                // Page Buttons
                Utils.ce('div', 'page-buttons', [], '', { id: CONST.ID_BUTTONS }),
                // Output Textarea
                this.createOutputTextarea(),
                // Copy Button
                PrepareMailbody.create_copybutton(CONST.ID_BTN_COPY, CONST.VALUE_BTN_COPY)
            ])
        ])

        // =======================
        // MAIN LAYOUT
        // =======================
        const mainLayout = Utils.ce('div', 'editor-layout', [
            leftPanel,
            rightPanel
        ])

        // =======================
        // SETTINGS SECTION
        // =======================
        const settingsSection = PrepareMailbody.create_pattern_section()

        // Append to top
        top.appendChild(actionBlock)
        top.appendChild(mainLayout)
        top.appendChild(settingsSection)

        // DOMに追加された後にパターンリストを初期化
        PrepareMailbody.refresh_pattern_list(CONST.ID_HEADER_PATTERNS, 'header')
        PrepareMailbody.refresh_pattern_list(CONST.ID_FOOTER_PATTERNS, 'footer')

        // Add change listeners
        const fromField = document.getElementById(CONST.ID_TEXT_FROM) as HTMLTextAreaElement
        if (fromField) {
            fromField.addEventListener('input', PrepareMailbody.change_from)
        }
        const toField = document.getElementById(CONST.ID_TEXT_TO) as HTMLTextAreaElement
        if (toField) {
            toField.addEventListener('input', PrepareMailbody.change_to)
        }
    }

    // 入力用テキストエリアを作成
    createInputTextarea(): HTMLElement {
        const default_from = PrepareMailbody.getLocalStorage(CONST.ID_TEXT_FROM, "")

        const textarea = Utils.ce('textarea', 'ms-textarea', [], default_from, {
            id: CONST.ID_TEXT_FROM,
            rows: '12',
            placeholder: 'メールマガジンのテキストをここに貼り付けてください...'
        })

        const controls = Utils.ce('div', 'textarea-controls', [
            this.createSmallButton('⏮️', () => {
                const el = document.getElementById(CONST.ID_TEXT_FROM) as HTMLTextAreaElement
                if (el) el.scrollTop = 0
            }),
            this.createSmallButton('👻⏪', () => PrepareMailbody.remove_to(CONST.ID_TEXT_FROM, false)),
            this.createSmallButton('⏩👻', () => PrepareMailbody.remove_to(CONST.ID_TEXT_FROM, true)),
            this.createSmallButton('⏭️', () => {
                const el = document.getElementById(CONST.ID_TEXT_FROM) as HTMLTextAreaElement
                if (el) el.scrollTop = el.scrollHeight
            })
        ])

        return Utils.ce('div', 'textarea-wrapper', [textarea, controls])
    }

    // 出力用テキストエリアを作成
    createOutputTextarea(): HTMLElement {
        const textarea = Utils.ce('textarea', 'ms-textarea', [], '', {
            id: CONST.ID_TEXT_TO,
            rows: '12',
            placeholder: '変換結果がここに表示されます...',
            readonly: 'true'
        })

        const controls = Utils.ce('div', 'textarea-controls', [
            this.createSmallButton('⏮️', () => {
                const el = document.getElementById(CONST.ID_TEXT_TO) as HTMLTextAreaElement
                if (el) el.scrollTop = 0
            }),
            this.createSmallButton('⏭️', () => {
                const el = document.getElementById(CONST.ID_TEXT_TO) as HTMLTextAreaElement
                if (el) el.scrollTop = el.scrollHeight
            })
        ])

        return Utils.ce('div', 'textarea-wrapper', [textarea, controls])
    }

    // アクションボタンを作成
    createActionButton(icon: string, title: string, className: string, onClick: () => void): HTMLElement {
        const btn = Utils.ce('button', `btn action-btn ${className}`, [], icon, {
            title: title
        })
        btn.addEventListener('click', onClick)
        return btn
    }

    // 小さいコントロールボタンを作成
    createSmallButton(label: string, onClick: () => void): HTMLElement {
        const btn = Utils.ce('button', 'btn btn-ghost btn-icon', [], label)
        btn.addEventListener('click', onClick)
        return btn
    }

    // pasteボタンを押してクリップボードからデータを貼り付ける
    static paste() {
        const node_from = document.getElementById(CONST.ID_TEXT_FROM) as HTMLTextAreaElement
        console.log({ node_from })
        if (node_from == null) {
            throw new Error(`指定したノードID[${CONST.ID_TEXT_FROM}]が見つかりません。`)
        }
        navigator.clipboard.readText().then((text) => {
            node_from.value = text
            PrepareMailbody.change_from()  // 文字数カウントを更新
        });

        // 入力パネルを先に表示
        const layout = document.querySelector('.editor-layout')
        if (layout) {
            layout.classList.remove('output-first')
        }
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

        // パネルを入れ替えて出力を先に表示
        const layout = document.querySelector('.editor-layout')
        if (layout) {
            layout.classList.add('output-first')
        }
    }

    // パラグラフごとに表示ボタンを作成する
    static list_splitted_contents(contents: string[]): HTMLElement[] {
        const to_field = PrepareMailbody.get_to_field()
        const totalPages = contents.length
        let paging = 0
        return contents.map((text) => {
            paging++
            const pageNum = paging
            const paragraph = Utils.ce("button", "page-btn", [], `${paging}`)

            const subject = PrepareMailbody.get_subject(pageNum, totalPages)

            paragraph.addEventListener("click", (event) => {
                // Remove active from all
                const allBtns = document.querySelectorAll('.page-btn')
                allBtns.forEach(btn => btn.classList.remove('active'))
                // Add active to clicked
                paragraph.classList.add('active')

                to_field.value = subject + '\n\n' + text
                PrepareMailbody.change_to()
                PrepareMailbody.clear_copybutton(CONST.ID_BTN_COPY)
            })

            return paragraph
        })

    }

    // パラグラフごとのタイトルを取得する。
    // ファイル名としても利用する
    static get_subject(paging: number = 0, totalPages: number = 1) {

        // YYYY年MM月DD日 形式の日付文字列を構築する
        const now = new Date()
        const year = now.getFullYear()
        const month = (now.getMonth() + 1).toString()
        const day = now.getDate().toString()
        const datestring = `${year}年${month}月${day}日`

        const el_subject = document.getElementById(CONST.ID_NEW_SUBJECT) as HTMLInputElement

        // 分割数が2以上の場合のみ番号を付与
        const filebodies = [
            datestring
            , el_subject?.value
        ]

        if (totalPages > 1) {
            filebodies.push(`(${paging})`)
        }

        const filtered = filebodies.filter((item) => {
            return item != ""
        })

        const subject = (el_subject == null) ? `(${paging})` : filtered.join(' ')
        return subject
    }

    static convert(content: string | null) {
        // console.log('PrepareMailbody.convert()')

        if (content == null) {
            return ""
        }

        let converted: string = content

        // ヘッダーの削除
        converted = PatternManager.removeHeader(converted)

        // フッターの削除
        converted = PatternManager.removeFooter(converted)

        // セパレーター文字列のシュリンク
        const reg_shrink = new RegExp(CONST.RE_SHRINK, 'g')
        converted = converted.replace(reg_shrink, "$1")
        const reg_url = new RegExp(CONST.RE_URL, 'g')

        // URLの置換
        converted = converted.replace(reg_url, '(URL)')
        console.log(converted.length)

        // 区切り線のパターンを置換
        const patterns = CONST.RE_SEPARATOR_PATTERNS
        patterns.forEach((pattern) => {
            const reg = new RegExp(pattern, 'g')
            converted = converted.replace(reg, '　')
        })

        // Markdown強調記法(**太字**)の除去
        const reg_bold = /\*\*(.+?)\*\*/g
        converted = converted.replace(reg_bold, '$1')

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
        console.log('PrepareMailbody.change_to()')
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


    // クリップボードにコピーボタン
    static create_copybutton(id: string, label: string): HTMLElement {
        const copybutton = Utils.ce('button', 'btn btn-primary copy-btn', [], `📋 ${label}`, {
            id: id
        })

        copybutton.addEventListener("click", (event) => {
            const cbtext = PrepareMailbody.read_to_field()

            ClipboardManager.revokePermission()
            navigator.clipboard.writeText(cbtext).then((data) => {
                copybutton.textContent = '✓ コピーしました'
                copybutton.classList.add('copied')
            }).catch((e) => {
                copybutton.textContent = '✗ 失敗しました'
            })
        })

        return copybutton
    }

    // コピーボタンを元に戻す
    static clear_copybutton(id: string) {
        const copybutton = document.getElementById(CONST.ID_BTN_COPY)
        if (copybutton) {
            copybutton.classList.remove('copied')
            copybutton.textContent = `📋 ${CONST.VALUE_BTN_COPY}`
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
        const dropdown = Utils.ce("select", "ms-select", [], "", {
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

    // パターン設定セクションを構築する
    static create_pattern_section(): HTMLElement {
        // 表示切り替えボタン
        const btn_toggle = Utils.ce('button', 'settings-toggle', [
            Utils.ce('span', '', [], CONST.VALUE_BTN_TOGGLE_PATTERNS),
            Utils.ce('span', 'chevron', [], '▼')
        ], '', {
            id: CONST.ID_BTN_TOGGLE_PATTERNS
        })

        // パターン設定セクション（初期状態は非表示）
        const pattern_content = Utils.ce('div', 'settings-content', [])

        // ヘッダーパターンセクション
        const header_section = PrepareMailbody.create_pattern_input_section(
            'ヘッダーパターン',
            CONST.ID_HEADER_INPUT,
            CONST.VALUE_HEADER_PLACEHOLDER,
            CONST.ID_BTN_ADD_HEADER,
            CONST.VALUE_BTN_ADD_HEADER,
            CONST.ID_HEADER_PATTERNS,
            'header'
        )

        // フッターパターンセクション
        const footer_section = PrepareMailbody.create_pattern_input_section(
            'フッターパターン',
            CONST.ID_FOOTER_INPUT,
            CONST.VALUE_FOOTER_PLACEHOLDER,
            CONST.ID_BTN_ADD_FOOTER,
            CONST.VALUE_BTN_ADD_FOOTER,
            CONST.ID_FOOTER_PATTERNS,
            'footer'
        )

        pattern_content.appendChild(header_section)
        pattern_content.appendChild(footer_section)

        // 切り替えボタンのイベント
        btn_toggle.addEventListener('click', () => {
            btn_toggle.classList.toggle('open')
            pattern_content.classList.toggle('open')
        })

        return Utils.ce('div', 'settings-section', [
            btn_toggle,
            pattern_content
        ])
    }

    // パターン入力セクションを構築する
    static create_pattern_input_section(
        label: string,
        inputId: string,
        placeholder: string,
        btnId: string,
        btnLabel: string,
        listId: string,
        type: 'header' | 'footer'
    ): HTMLElement {
        // ラベル
        const section_label = Utils.ce('h3', 'pattern-section-title', [], label)

        // 入力フィールド
        const input_field = Utils.ce('textarea', 'ms-textarea', [], '', {
            id: inputId,
            rows: '2',
            placeholder: placeholder
        })
        input_field.style.minHeight = '80px'

        // 追加ボタン
        const btn_add = Utils.ce('button', 'btn btn-secondary mt-md', [], btnLabel, {
            id: btnId
        })

        btn_add.addEventListener('click', () => {
            const input = document.getElementById(inputId) as HTMLTextAreaElement
            if (input && input.value.trim()) {
                if (type === 'header') {
                    PatternManager.addHeaderPattern(input.value.trim())
                } else {
                    PatternManager.addFooterPattern(input.value.trim())
                }
                input.value = ''
                PrepareMailbody.refresh_pattern_list(listId, type)
            }
        })

        // パターンリスト
        const pattern_list = Utils.ce('div', 'pattern-list', [], '', {
            id: listId
        })

        return Utils.ce('div', 'pattern-section', [
            section_label,
            input_field,
            btn_add,
            pattern_list
        ])
    }

    // パターンリストを更新する
    static refresh_pattern_list(listId: string, type: 'header' | 'footer') {
        const list = document.getElementById(listId)
        if (!list) return

        // リストをクリア
        while (list.firstChild) {
            list.removeChild(list.firstChild)
        }

        // パターンを取得
        const patterns = type === 'header'
            ? PatternManager.getHeaderPatterns()
            : PatternManager.getFooterPatterns()

        // パターンアイテムを追加
        patterns.forEach(pattern => {
            const item = PrepareMailbody.create_pattern_item(pattern, type)
            list.appendChild(item)
        })
    }

    // パターンアイテムを構築する
    static create_pattern_item(pattern: Pattern, type: 'header' | 'footer'): HTMLElement {
        // テキスト表示（複数行の場合は最初の行のみ表示）
        const displayText = pattern.text.split('\n')[0]
        const text_span = Utils.ce('span', `pattern-item-text${!pattern.enabled ? ' disabled' : ''}`, [], displayText)

        // 有効/無効切り替えボタン
        const btn_toggle = Utils.ce('button', `btn btn-icon ${pattern.enabled ? 'btn-secondary' : 'btn-ghost'}`, [], pattern.enabled ? '✓' : '✗')

        btn_toggle.addEventListener('click', () => {
            if (type === 'header') {
                PatternManager.toggleHeaderPattern(pattern.id)
            } else {
                PatternManager.toggleFooterPattern(pattern.id)
            }
            PrepareMailbody.refresh_pattern_list(
                type === 'header' ? CONST.ID_HEADER_PATTERNS : CONST.ID_FOOTER_PATTERNS,
                type
            )
        })

        // 削除ボタン（無効化されたパターンのみ削除可能）
        const btn_delete = Utils.ce('button', 'btn btn-icon btn-danger', [], '🗑️') as HTMLButtonElement

        // 有効なパターンの場合は削除ボタンを無効化
        if (pattern.enabled) {
            btn_delete.disabled = true
            btn_delete.style.opacity = '0.3'
            btn_delete.style.cursor = 'not-allowed'
        }

        btn_delete.addEventListener('click', () => {
            // 無効化されたパターンのみ削除
            if (!pattern.enabled) {
                if (type === 'header') {
                    PatternManager.removeHeaderPattern(pattern.id)
                } else {
                    PatternManager.removeFooterPattern(pattern.id)
                }
                PrepareMailbody.refresh_pattern_list(
                    type === 'header' ? CONST.ID_HEADER_PATTERNS : CONST.ID_FOOTER_PATTERNS,
                    type
                )
            }
        })

        // アイテムを構築
        const item = Utils.ce('div', 'pattern-item', [
            text_span,
            Utils.ce('div', 'pattern-item-actions', [btn_toggle, btn_delete])
        ])

        return item
    }
}
