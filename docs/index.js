class $b0cfe56d0e3fcfc4$export$c77dbd302edde58d {
    static revokePermission() {
        // @ts-ignore
        navigator.permissions.query({
            name: "clipboard-write"
        }).then(function(result) {
            $b0cfe56d0e3fcfc4$export$c77dbd302edde58d.report(result.state);
        });
    }
    static report(state) {
        console.log("Permission: " + state);
    }
}


/**
 * MailSmooth 定数定義
 * Editorial Dark Design System対応
 */ const $b85aa28c289cb8ee$export$fadd21211b40c08a = {
    // ===== Element IDs =====
    ID_BUTTON_RUN: "id_button_run",
    ID_TEXT_FROM: "id_text_from",
    ID_TEXT_TO: "id_text_to",
    ID_LENGTH_FROM: "id_length_from",
    ID_LENGTH_TO: "id_length_to",
    ID_BUTTONS: "id_buttons_block",
    ID_LIMIT_LENGTH: "id_limit_length",
    ID_BTN_COPY: "id_button_copy",
    ID_BTN_CLEAR: "id_button_clear",
    ID_BTN_INPUT_TOP: "id_button_input_top",
    ID_BTN_INPUT_BOTTOM: "id_button_input_bottom",
    ID_BTN_OUTPUT_TOP: "id_button_output_top",
    ID_BTN_OUTPUT_BOTTOM: "id_button_output_bottom",
    ID_NEW_SUBJECT: "id_new_subject",
    ID_SUBJECT_HISTORIES: "id_subject_histories",
    ID_PATTERN_SECTION: "id_pattern_section",
    ID_HEADER_PATTERNS: "id_header_patterns",
    ID_FOOTER_PATTERNS: "id_footer_patterns",
    ID_HEADER_INPUT: "id_header_input",
    ID_FOOTER_INPUT: "id_footer_input",
    ID_BTN_ADD_HEADER: "id_btn_add_header",
    ID_BTN_ADD_FOOTER: "id_btn_add_footer",
    ID_BTN_TOGGLE_PATTERNS: "id_btn_toggle_patterns",
    VALUE_BTN_SMOOTHING: "\u5909\u63DB",
    VALUE_BTN_PASTE: "\u30DA\u30FC\u30B9\u30C8",
    VALUE_BTN_COPY: "\u30B3\u30D4\u30FC",
    VALUE_BTN_TO_TOP: "\u23EE\uFE0F",
    VALUE_BTN_TO_BOTTOM: "\u23ED\uFE0F",
    VALUE_BTN_ERASE_BEFORE: "\uD83D\uDC7B\u23EA",
    VALUE_BTN_ERASE_AFTER: "\u23E9\uD83D\uDC7B",
    VALUE_LABEL_HISOTRY: "\uD83D\uDCDA",
    VALUE_NEW_SUBJECT_PLACEHOLDER: "\u898B\u51FA\u3057\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044",
    VALUE_SELECTBOX_PLACEHOLDER: "\u5C65\u6B74\u304B\u3089\u9078\u629E",
    VALUE_LIMIT_PLACEHOLDER: "\u4F8B: 5000",
    VALUE_BTN_TOGGLE_PATTERNS: "\u2699\uFE0F \u30D8\u30C3\u30C0\u30FC/\u30D5\u30C3\u30BF\u30FC\u8A2D\u5B9A",
    VALUE_BTN_ADD_HEADER: "\u2795 \u30D8\u30C3\u30C0\u30FC\u8FFD\u52A0",
    VALUE_BTN_ADD_FOOTER: "\u2795 \u30D5\u30C3\u30BF\u30FC\u8FFD\u52A0",
    VALUE_HEADER_PLACEHOLDER: "\u30D8\u30C3\u30C0\u30FC\u30D1\u30BF\u30FC\u30F3\u3092\u5165\u529B\uFF08\u3053\u306E\u6587\u5B57\u5217\u4EE5\u524D\u3092\u524A\u9664\uFF09",
    VALUE_FOOTER_PLACEHOLDER: "\u30D5\u30C3\u30BF\u30FC\u30D1\u30BF\u30FC\u30F3\u3092\u5165\u529B\uFF08\u3053\u306E\u6587\u5B57\u5217\u4EE5\u964D\u3092\u524A\u9664\uFF09",
    RE_SHRINK: "([\u2500\u2501=\u2501\u250F])\\1+",
    RE_SEPARATOR_PATTERNS: [
        "\u3000\uFF0A\u3000\uFF0A\u3000\uFF0A"
    ],
    RE_URL: "https?://[\\w!?/+-=_~;.,*&@#$%()'[\\]]+",
    LIMIT_LENGTH: 5000
};



class $eb84536589c0c566$export$24453831075e776c {
    constructor(max_part_length = 10000){
        this.title = "";
        this.raw_body = "";
        this.bodies = [];
        this.max_part_length = max_part_length;
    }
    proc(body) {
        if (body.length == 0) throw new Error("\u30E1\u30FC\u30EB\u672C\u6587\u304C\u672A\u5165\u529B\u3067\u3059\u3002");
        this.raw_body = body;
        // body = this.regex_convert(body)
        body = (0, $01eb911984ab8c65$export$d06cfff677aa04b2).convert(body);
        this.bodies = this.split_body(body, this.max_part_length);
        return this.bodies;
    }
    // 正規表現を使って文字列の置換処理を行う
    // regex_convert(content: string | null): string {
    //     console.log('MailBodyTinker.regex_convert()')
    //     if (content == null) {
    //         return ""
    //     }
    //     // セパレーター文字列のシュリンク
    //     let converted: string
    //     const reg_shrink = new RegExp(CONST.RE_SHRINK, 'g')
    //     converted = content.replace(reg_shrink, "$1")
    //     const reg_url = new RegExp(CONST.RE_URL, 'g')
    //     // URLの置換
    //     converted = converted.replace(reg_url, '(URL)')
    //     console.log(converted.length)
    //     return converted
    // }
    // 指定文字数以内で文字列を区切った文字列配列を返す
    split_body(body, max) {
        // 指定文字列未満のとき、そのまま帰す
        if (body.length < max) return [
            body
        ];
        const splitted = body.split(/\n\n/);
        const result = splitted.reduce((prev, paragraph)=>{
            paragraph += "\n\n";
            const count = prev[prev.length - 1].length;
            if (count > 0 && count + paragraph.length > max) // 新しくパラグラフを追加する
            prev.push(paragraph);
            else // 末端のパラグラフに連結する
            prev[prev.length - 1] = prev[prev.length - 1].concat(paragraph);
            return prev;
        }, [
            ""
        ]);
        return result;
    }
}


class $159c72d0604c430a$export$d2ca453b913dcdea {
    // 空文字列ではないことをチェックする
    static is_not_empty_string(test_str) {
        return !$159c72d0604c430a$export$d2ca453b913dcdea.is_empty_string(test_str);
    }
    // 空文字列であることをチェックする
    static is_empty_string(test_str) {
        if (test_str == null || test_str == undefined) return true;
        if (test_str.length > 0) return false;
        return true;
    }
    static{
        // 設定値またはデフォルト値を取得
        this.get_from = (dic, conf_key, defaults)=>{
            if (dic.hasOwnProperty(conf_key)) return dic[conf_key];
            return defaults;
        };
    }
    static{
        // ノードを構築して返す
        /**
     * HTML要素を作成し、指定された属性を設定して返します。
     * @param tagName 作成する要素のタグ名
     * @param className 要素に設定するクラス名（デフォルトは空文字列）
     * @param childElements 追加する子要素の配列（デフォルトは空の配列）
     * @param textContent 要素のテキストコンテンツ（デフォルトは空文字列）
     * @param attrs 要素に設定する属性のオブジェクト（デフォルトはundefined）
     * @return 作成されたHTML要素
     */ this.createElement = (tagName, className = "", childElements = [], textContent = "", attrs)=>{
            const el = document.createElement(tagName);
            el.className = className;
            el.textContent = textContent;
            if (childElements.length > 0) childElements.forEach((child)=>{
                el.appendChild(child);
            });
            // 属性値をセット
            if (attrs) Object.entries(attrs).forEach(([key, value])=>{
                el.setAttribute(key, value);
            });
            return el;
        };
    }
    static{
        // shotcut for createElement
        /**
     * createElement関数のショートカット
     * @param t 作成する要素のタグ名
     * @param c 要素に設定するクラス名（デフォルトは空文字列）
     * @param ce 追加する子要素の配列（デフォルトは空の配列）
     * @param tc 要素のテキストコンテンツ（デフォルトは空文字列）
     * @param at 要素に設定する属性のオブジェクト（デフォルトはundefined）
     * @return 作成されたHTML要素
     */ this.ce = (t, c = "", ce = [], tc = "", at)=>{
            return this.createElement(t, c, ce, tc, at);
        };
    }
    /**
     * kintoneのメニューアイコン風にスタイルを付与する
     * @param el 装飾対象のノード
     */ static decorate_menu_icon(el) {
        el.style.height = "48px";
        el.style.backgroundColor = "#f7f9fa";
        el.style.fontSize = "28px";
        el.style.border = "1px solid #e3e7e8";
        el.style.display = "inline";
        el.style.marginLeft = "2px";
        el.style.marginRight = "2px";
        el.style.verticalAlign = "middle";
        return el;
    }
    static{
        /**
     * テキストだけを持ったDIV要素を構築して返す
     * @param msg innerText
     * @returns 
     */ this.simpleDiv = (msg)=>{
            return $159c72d0604c430a$export$d2ca453b913dcdea.createElement("div", "", [], msg);
        };
    }
    static{
        // 配列のうち、重複したものがあればTrueを返す
        this.is_overlapped = (list)=>{
            const overlapped = $159c72d0604c430a$export$d2ca453b913dcdea.overlapped(list);
            if (overlapped.length > 0) return true;
            return false;
        };
    }
    static{
        // 配列のうち、重複したものをUniqして返す
        this.overlapped = (list)=>{
            const overlapped = list.filter((x, _i, self)=>{
                return self.indexOf(x) !== self.lastIndexOf(x);
            });
            return Array.from(new Set(overlapped));
        };
    }
    // 現在開いているkintoneドメインのうち指定した番号のアプリのURLを構築して返す
    static get_application_url(appid) {
        return `${location.protocol}//${location.host}/k/${appid}`;
    }
    // kintone clientのエラーを受け取ってメッセージを抽出し、文字列配列の形で返す
    static retrieve_errors(error, max_msgs = -1) {
        const errors = error?.error?.errors;
        if (errors == undefined) return undefined;
        // メッセージの構築
        let whole_errors = [];
        Object.keys(errors).forEach((field)=>{
            const msgs = errors[field].messages;
            const comments = msgs.map((msg)=>{
                return `[${field}] ${msg}`;
            });
            whole_errors = whole_errors.concat(comments);
        });
        // ソート
        whole_errors.sort();
        // エラーレコードの件数が多い場合に省略
        if (max_msgs >= 0 && max_msgs < whole_errors.length) {
            const remain_msgs = whole_errors.length - max_msgs;
            whole_errors = whole_errors.splice(0, max_msgs);
            whole_errors.push(`\u{4EE5}\u{4E0B}${remain_msgs}\u{4EF6}\u{306E}\u{30A8}\u{30E9}\u{30FC}\u{30E1}\u{30C3}\u{30BB}\u{30FC}\u{30B8}\u{3092}\u{7701}\u{7565}\u{3057}\u{307E}\u{3057}\u{305F}\u{3002}`);
        }
        return whole_errors;
    }
}


// ヘッダーとフッターのパターンを管理するクラス
class $f20388b6d53e66a8$export$ef2db797533c664c {
    static{
        this.STORAGE_KEY_HEADER = "mail_smooth_header_patterns";
    }
    static{
        this.STORAGE_KEY_FOOTER = "mail_smooth_footer_patterns";
    }
    // ヘッダーパターンを取得
    static getHeaderPatterns() {
        return this.getPatterns(this.STORAGE_KEY_HEADER);
    }
    // フッターパターンを取得
    static getFooterPatterns() {
        return this.getPatterns(this.STORAGE_KEY_FOOTER);
    }
    // パターンを取得
    static getPatterns(key) {
        const stored = localStorage.getItem(key);
        if (!stored) return [];
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error("Failed to parse patterns:", e);
            return [];
        }
    }
    // ヘッダーパターンを保存
    static saveHeaderPatterns(patterns) {
        this.savePatterns(this.STORAGE_KEY_HEADER, patterns);
    }
    // フッターパターンを保存
    static saveFooterPatterns(patterns) {
        this.savePatterns(this.STORAGE_KEY_FOOTER, patterns);
    }
    // パターンを保存
    static savePatterns(key, patterns) {
        localStorage.setItem(key, JSON.stringify(patterns));
    }
    // ヘッダーパターンを追加
    static addHeaderPattern(text) {
        const patterns = this.getHeaderPatterns();
        patterns.push({
            id: this.generateId(),
            text: text,
            enabled: true
        });
        this.saveHeaderPatterns(patterns);
    }
    // フッターパターンを追加
    static addFooterPattern(text) {
        const patterns = this.getFooterPatterns();
        patterns.push({
            id: this.generateId(),
            text: text,
            enabled: true
        });
        this.saveFooterPatterns(patterns);
    }
    // ヘッダーパターンを削除
    static removeHeaderPattern(id) {
        const patterns = this.getHeaderPatterns().filter((p)=>p.id !== id);
        this.saveHeaderPatterns(patterns);
    }
    // フッターパターンを削除
    static removeFooterPattern(id) {
        const patterns = this.getFooterPatterns().filter((p)=>p.id !== id);
        this.saveFooterPatterns(patterns);
    }
    // ヘッダーパターンの有効/無効を切り替え
    static toggleHeaderPattern(id) {
        const patterns = this.getHeaderPatterns();
        const pattern = patterns.find((p)=>p.id === id);
        if (pattern) {
            pattern.enabled = !pattern.enabled;
            this.saveHeaderPatterns(patterns);
        }
    }
    // フッターパターンの有効/無効を切り替え
    static toggleFooterPattern(id) {
        const patterns = this.getFooterPatterns();
        const pattern = patterns.find((p)=>p.id === id);
        if (pattern) {
            pattern.enabled = !pattern.enabled;
            this.saveFooterPatterns(patterns);
        }
    }
    // ユニークなIDを生成
    static generateId() {
        return `pattern_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    }
    // テキストからヘッダーを削除
    static removeHeader(text) {
        const patterns = this.getHeaderPatterns().filter((p)=>p.enabled);
        let result = text;
        for (const pattern of patterns){
            // パターンを行単位で検索し、最初に見つかった位置以降を返す
            const lines = result.split("\n");
            const patternLines = pattern.text.split("\n");
            // パターンに一致する行を探す
            for(let i = 0; i < lines.length; i++){
                let match = true;
                for(let j = 0; j < patternLines.length && i + j < lines.length; j++)if (!lines[i + j].includes(patternLines[j].trim())) {
                    match = false;
                    break;
                }
                if (match) {
                    // マッチした行以降のテキストを返す
                    result = lines.slice(i + patternLines.length).join("\n");
                    break;
                }
            }
        }
        return result;
    }
    // テキストからフッターを削除
    static removeFooter(text) {
        const patterns = this.getFooterPatterns().filter((p)=>p.enabled);
        let result = text;
        for (const pattern of patterns){
            // パターンを行単位で検索し、最初に見つかった位置以前を返す
            const lines = result.split("\n");
            const patternLines = pattern.text.split("\n");
            // パターンに一致する行を探す
            for(let i = 0; i < lines.length; i++){
                let match = true;
                for(let j = 0; j < patternLines.length && i + j < lines.length; j++)if (!lines[i + j].includes(patternLines[j].trim())) {
                    match = false;
                    break;
                }
                if (match) {
                    // マッチした行以前のテキストを返す
                    result = lines.slice(0, i).join("\n");
                    break;
                }
            }
        }
        return result;
    }
}


class $01eb911984ab8c65$export$d06cfff677aa04b2 {
    // inputのテキストフィールドから、outputのテキストフィールドに変換結果をコピーする
    constructor(id){
        this.top_id = id;
    }
    build() {
        this.build_forms(this.top_id);
    }
    static getLocalStorage(key, preset) {
        const saved = localStorage.getItem(key);
        if (saved == null) return preset;
        return saved.toString();
    }
    // 画面を構築する（Editorial Dark Design）
    build_forms(node_id) {
        const top = document.getElementById(node_id);
        if (!top) return;
        // =======================
        // LEFT PANEL - Input
        // =======================
        const leftPanel = (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("div", "editor-panel", [
            // Panel Header
            (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("div", "panel-header", [
                (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("h2", "panel-title", [
                    (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("span", "icon", [], "\uD83D\uDCE5")
                ], " \u5165\u529B"),
                (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("span", "panel-meta", [], "0", {
                    id: (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_LENGTH_FROM
                })
            ]),
            // Panel Body
            (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("div", "panel-body", [
                // Textarea
                this.createInputTextarea(),
                // Options Row
                (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("div", "form-row mt-md", [
                    // Subject Input
                    (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("div", "form-group", [
                        (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("label", "form-label", [], "\u898B\u51FA\u3057"),
                        (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("input", "ms-input", [], "", {
                            id: (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_NEW_SUBJECT,
                            type: "text",
                            placeholder: (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).VALUE_NEW_SUBJECT_PLACEHOLDER
                        })
                    ]),
                    // History Dropdown
                    (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("div", "form-group", [
                        (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("label", "form-label", [], "\u5C65\u6B74"),
                        $01eb911984ab8c65$export$d06cfff677aa04b2.create_subject_historym((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).VALUE_LABEL_HISOTRY, (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_SUBJECT_HISTORIES)
                    ])
                ]),
                // Split Length
                (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("div", "form-group", [
                    (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("label", "form-label", [], "\u5206\u5272\u6587\u5B57\u6570"),
                    (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("input", "ms-input", [], "", {
                        id: (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_LIMIT_LENGTH,
                        type: "number",
                        value: $01eb911984ab8c65$export$d06cfff677aa04b2.getLocalStorage((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_LIMIT_LENGTH, (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).LIMIT_LENGTH.toString()),
                        placeholder: (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).VALUE_LIMIT_PLACEHOLDER
                    })
                ])
            ])
        ]);
        // =======================
        // CENTER - Action Buttons
        // =======================
        const centerActions = (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("div", "center-actions", [
            this.createActionButton("\uD83D\uDCCB", "\u30DA\u30FC\u30B9\u30C8", "btn-secondary", $01eb911984ab8c65$export$d06cfff677aa04b2.paste),
            (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("div", "action-divider"),
            this.createActionButton("\u2728", "\u5909\u63DB", "btn-primary action-btn-main", $01eb911984ab8c65$export$d06cfff677aa04b2.run),
            (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("div", "action-divider"),
            this.createActionButton("\uD83D\uDDD1\uFE0F", "\u30AF\u30EA\u30A2", "btn-danger", ()=>{
                const from = $01eb911984ab8c65$export$d06cfff677aa04b2.get_from_field();
                from.value = "";
                $01eb911984ab8c65$export$d06cfff677aa04b2.change_from();
            })
        ]);
        // =======================
        // RIGHT PANEL - Output
        // =======================
        const rightPanel = (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("div", "editor-panel", [
            // Panel Header
            (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("div", "panel-header", [
                (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("h2", "panel-title", [
                    (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("span", "icon", [], "\uD83D\uDCE4")
                ], " \u51FA\u529B"),
                (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("span", "panel-meta", [], "0", {
                    id: (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_LENGTH_TO
                })
            ]),
            // Panel Body
            (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("div", "panel-body", [
                // Page Buttons
                (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("div", "page-buttons", [], "", {
                    id: (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_BUTTONS
                }),
                // Output Textarea
                this.createOutputTextarea(),
                // Copy Button
                $01eb911984ab8c65$export$d06cfff677aa04b2.create_copybutton((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_BTN_COPY, (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).VALUE_BTN_COPY)
            ])
        ]);
        // =======================
        // MAIN LAYOUT
        // =======================
        const mainLayout = (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("div", "editor-layout", [
            leftPanel,
            centerActions,
            rightPanel
        ]);
        // =======================
        // SETTINGS SECTION
        // =======================
        const settingsSection = $01eb911984ab8c65$export$d06cfff677aa04b2.create_pattern_section();
        // Append to top
        top.appendChild(mainLayout);
        top.appendChild(settingsSection);
        // DOMに追加された後にパターンリストを初期化
        $01eb911984ab8c65$export$d06cfff677aa04b2.refresh_pattern_list((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_HEADER_PATTERNS, "header");
        $01eb911984ab8c65$export$d06cfff677aa04b2.refresh_pattern_list((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_FOOTER_PATTERNS, "footer");
        // Add change listeners
        const fromField = document.getElementById((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_TEXT_FROM);
        if (fromField) fromField.addEventListener("input", $01eb911984ab8c65$export$d06cfff677aa04b2.change_from);
        const toField = document.getElementById((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_TEXT_TO);
        if (toField) toField.addEventListener("input", $01eb911984ab8c65$export$d06cfff677aa04b2.change_to);
    }
    // 入力用テキストエリアを作成
    createInputTextarea() {
        const default_from = $01eb911984ab8c65$export$d06cfff677aa04b2.getLocalStorage((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_TEXT_FROM, "");
        const textarea = (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("textarea", "ms-textarea", [], default_from, {
            id: (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_TEXT_FROM,
            rows: "12",
            placeholder: "\u30E1\u30FC\u30EB\u30DE\u30AC\u30B8\u30F3\u306E\u30C6\u30AD\u30B9\u30C8\u3092\u3053\u3053\u306B\u8CBC\u308A\u4ED8\u3051\u3066\u304F\u3060\u3055\u3044..."
        });
        const controls = (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("div", "textarea-controls", [
            this.createSmallButton("\u23EE\uFE0F", ()=>{
                const el = document.getElementById((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_TEXT_FROM);
                if (el) el.scrollTop = 0;
            }),
            this.createSmallButton("\uD83D\uDC7B\u23EA", ()=>$01eb911984ab8c65$export$d06cfff677aa04b2.remove_to((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_TEXT_FROM, false)),
            this.createSmallButton("\u23E9\uD83D\uDC7B", ()=>$01eb911984ab8c65$export$d06cfff677aa04b2.remove_to((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_TEXT_FROM, true)),
            this.createSmallButton("\u23ED\uFE0F", ()=>{
                const el = document.getElementById((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_TEXT_FROM);
                if (el) el.scrollTop = el.scrollHeight;
            })
        ]);
        return (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("div", "textarea-wrapper", [
            textarea,
            controls
        ]);
    }
    // 出力用テキストエリアを作成
    createOutputTextarea() {
        const textarea = (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("textarea", "ms-textarea", [], "", {
            id: (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_TEXT_TO,
            rows: "12",
            placeholder: "\u5909\u63DB\u7D50\u679C\u304C\u3053\u3053\u306B\u8868\u793A\u3055\u308C\u307E\u3059...",
            readonly: "true"
        });
        const controls = (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("div", "textarea-controls", [
            this.createSmallButton("\u23EE\uFE0F", ()=>{
                const el = document.getElementById((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_TEXT_TO);
                if (el) el.scrollTop = 0;
            }),
            this.createSmallButton("\u23ED\uFE0F", ()=>{
                const el = document.getElementById((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_TEXT_TO);
                if (el) el.scrollTop = el.scrollHeight;
            })
        ]);
        return (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("div", "textarea-wrapper", [
            textarea,
            controls
        ]);
    }
    // アクションボタンを作成
    createActionButton(icon, title, className, onClick) {
        const btn = (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("button", `btn action-btn ${className}`, [], icon, {
            title: title
        });
        btn.addEventListener("click", onClick);
        return btn;
    }
    // 小さいコントロールボタンを作成
    createSmallButton(label, onClick) {
        const btn = (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("button", "btn btn-ghost btn-icon", [], label);
        btn.addEventListener("click", onClick);
        return btn;
    }
    // pasteボタンを押してクリップボードからデータを貼り付ける
    static paste() {
        const node_from = document.getElementById((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_TEXT_FROM);
        console.log({
            node_from: node_from
        });
        if (node_from == null) throw new Error(`\u{6307}\u{5B9A}\u{3057}\u{305F}\u{30CE}\u{30FC}\u{30C9}ID[${(0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_TEXT_FROM}]\u{304C}\u{898B}\u{3064}\u{304B}\u{308A}\u{307E}\u{305B}\u{3093}\u{3002}`);
        navigator.clipboard.readText().then((text)=>{
            node_from.value = text;
            $01eb911984ab8c65$export$d06cfff677aa04b2.change_from() // 文字数カウントを更新
            ;
        });
    }
    // smoothing ボタンを押したら走る処理
    static run() {
        $01eb911984ab8c65$export$d06cfff677aa04b2.clear_copybutton((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_BTN_COPY);
        const from = $01eb911984ab8c65$export$d06cfff677aa04b2.get_from_field();
        const to = $01eb911984ab8c65$export$d06cfff677aa04b2.get_to_field();
        const node_limit = document.getElementById((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_LIMIT_LENGTH);
        localStorage.setItem((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_LIMIT_LENGTH, node_limit.value);
        localStorage.setItem((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_TEXT_FROM, from.value);
        const tinker = new (0, $eb84536589c0c566$export$24453831075e776c)(parseInt(node_limit.value));
        const converted = tinker.proc(from.value);
        // 分割済みのテキストを作成し、テキストを割り当て済みのボタンを配置する
        const buttons = $01eb911984ab8c65$export$d06cfff677aa04b2.list_splitted_contents(converted);
        const btn_group = (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("div", "btn-group", buttons);
        const node_buttons = document.getElementById((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_BUTTONS);
        if (node_buttons) {
            Array.from(node_buttons.childNodes).forEach((btn)=>{
                btn.remove();
            });
            node_buttons?.appendChild(btn_group);
        }
        // 最初のパラグラフをtoフィールドにコピーする
        buttons[0].dispatchEvent(new Event("click"));
        // タイトル履歴を更新する
        $01eb911984ab8c65$export$d06cfff677aa04b2.update_subject_histories();
    }
    // パラグラフごとに表示ボタンを作成する
    static list_splitted_contents(contents) {
        const to_field = $01eb911984ab8c65$export$d06cfff677aa04b2.get_to_field();
        let paging = 0;
        return contents.map((text)=>{
            paging++;
            const pageNum = paging;
            const paragraph = (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("button", "page-btn", [], `${paging}`);
            const subject = $01eb911984ab8c65$export$d06cfff677aa04b2.get_subject(pageNum);
            paragraph.addEventListener("click", (event)=>{
                // Remove active from all
                const allBtns = document.querySelectorAll(".page-btn");
                allBtns.forEach((btn)=>btn.classList.remove("active"));
                // Add active to clicked
                paragraph.classList.add("active");
                to_field.value = subject + "\n\n" + text;
                $01eb911984ab8c65$export$d06cfff677aa04b2.change_to();
                $01eb911984ab8c65$export$d06cfff677aa04b2.clear_copybutton((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_BTN_COPY);
            });
            return paragraph;
        });
    }
    // パラグラフごとのタイトルを取得する。
    // ファイル名としても利用する
    static get_subject(paging = 0) {
        // YYYY年MM月DD日 形式の日付文字列を構築する
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString();
        const day = now.getDate().toString();
        const datestring = `${year}\u{5E74}${month}\u{6708}${day}\u{65E5}`;
        const el_subject = document.getElementById((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_NEW_SUBJECT);
        const paging_format = `(${paging})`;
        const filebodies = [
            datestring,
            el_subject?.value,
            paging_format
        ].filter((item)=>{
            return item != "";
        });
        const subject = el_subject == null ? paging_format : filebodies.join(" ");
        return subject;
    }
    static convert(content) {
        // console.log('PrepareMailbody.convert()')
        if (content == null) return "";
        let converted = content;
        // ヘッダーの削除
        converted = (0, $f20388b6d53e66a8$export$ef2db797533c664c).removeHeader(converted);
        // フッターの削除
        converted = (0, $f20388b6d53e66a8$export$ef2db797533c664c).removeFooter(converted);
        // セパレーター文字列のシュリンク
        const reg_shrink = new RegExp((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).RE_SHRINK, "g");
        converted = converted.replace(reg_shrink, "$1");
        const reg_url = new RegExp((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).RE_URL, "g");
        // URLの置換
        converted = converted.replace(reg_url, "(URL)");
        console.log(converted.length);
        // 区切り線のパターンを置換
        const patterns = (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).RE_SEPARATOR_PATTERNS;
        patterns.forEach((pattern)=>{
            const reg = new RegExp(pattern, "g");
            converted = converted.replace(reg, "\u3000");
        });
        // Markdown強調記法(**太字**)の除去
        const reg_bold = /\*\*(.+?)\*\*/g;
        converted = converted.replace(reg_bold, "$1");
        return converted;
    }
    // fromフィールドの編集イベント
    static change_from() {
        console.log("change from");
        const from = $01eb911984ab8c65$export$d06cfff677aa04b2.get_from_field();
        const length = from.value.length;
        const node_info = document.getElementById((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_LENGTH_FROM);
        if (node_info) node_info.textContent = length.toString();
    }
    // toフィールドの編集イベント
    static change_to() {
        console.log("PrepareMailbody.change_to()");
        const to = $01eb911984ab8c65$export$d06cfff677aa04b2.get_to_field();
        const length = to.value.length;
        const node_info = document.getElementById((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_LENGTH_TO);
        if (node_info) node_info.textContent = length.toString();
    }
    // FROMフィールドを取得する
    static get_from_field() {
        const from = document.getElementById((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_TEXT_FROM);
        if (from === null) throw new Error("from\u30CE\u30FC\u30C9\u304C\u53D6\u5F97\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002");
        return from;
    }
    // TOフィールドを取得する
    static get_to_field() {
        const to = document.getElementById((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_TEXT_TO);
        if (to === null) throw new Error("to\u30CE\u30FC\u30C9\u304C\u53D6\u5F97\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002");
        return to;
    }
    static read_to_field() {
        const to = $01eb911984ab8c65$export$d06cfff677aa04b2.get_to_field();
        return to.value;
    }
    // テキストエリアを構築(rowを返す)
    static create_textarea(id, preset = "", clear_buttons = false) {
        const area = (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("textarea", "form-control", [], preset, {
            id: id,
            rows: "5"
        });
        area.style.overflowX = "scroll";
        area.classList.add("col");
        area.classList.add("me-2");
        // インプットのテキストエリアをトップボトム移動ボタン
        const btn_input_top = $01eb911984ab8c65$export$d06cfff677aa04b2.create_scroll_to_top((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).VALUE_BTN_TO_TOP, id);
        const btn_input_bottom = $01eb911984ab8c65$export$d06cfff677aa04b2.create_scroll_to_bottom((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).VALUE_BTN_TO_BOTTOM, id);
        let buttons;
        // clearボタンの有無を切り分ける
        if (clear_buttons) {
            const btn_erase_before = $01eb911984ab8c65$export$d06cfff677aa04b2.create_remove_to_top((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).VALUE_BTN_ERASE_BEFORE, id);
            const btn_erase_after = $01eb911984ab8c65$export$d06cfff677aa04b2.create_remove_to_bottom((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).VALUE_BTN_ERASE_AFTER, id);
            btn_erase_before.classList.add("mb-4");
            buttons = [
                btn_input_top,
                btn_erase_before,
                btn_erase_after,
                btn_input_bottom
            ];
        } else {
            btn_input_top.classList.add("mb-4");
            buttons = [
                btn_input_top,
                btn_input_bottom
            ];
        }
        btn_input_top.classList.add("row");
        btn_input_bottom.classList.add("row");
        return (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("div", "row", [
            area,
            (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("div", "col-2", buttons)
        ]);
    }
    // 指定したテキストエリアを操作するボタンを構築する(rowを返す)
    static callback_textarea_button(label, target, callback, buttonStyle = (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).STYLE_SCROLL) {
        const btn_scroll = (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("input", buttonStyle, [], "", {
            type: "button",
            value: label
        });
        // btn_scroll.classList.add(CONST.STYLE_SCROLL)
        btn_scroll.addEventListener("click", (event)=>{
            const el = document.getElementById(target);
            if (el) {
                console.log(el);
                callback(el);
            }
        });
        btn_scroll.classList.add("col");
        return (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("div", "row", [
            btn_scroll
        ]);
    }
    // 指定したテキストエリアをトップにスクロールするボタンを構築する(rowを返す)
    static create_scroll_to_top(label, target_id) {
        const btn_scroll = $01eb911984ab8c65$export$d06cfff677aa04b2.callback_textarea_button(label, target_id, (el)=>{
            el.scrollTop = 0;
        });
        return btn_scroll;
    }
    // 指定したテキストエリアをボトムにスクロールするボタンを構築する
    static create_scroll_to_bottom(label, target_id) {
        const btn_scroll = $01eb911984ab8c65$export$d06cfff677aa04b2.callback_textarea_button(label, target_id, (el)=>{
            el.scrollTop = el.scrollHeight;
        });
        return btn_scroll;
    }
    // テキストエリアのカーソルから上を削除するボタンを構築する(rowを返す)
    static create_remove_to_top(label, target_id) {
        const btn_remove = $01eb911984ab8c65$export$d06cfff677aa04b2.callback_textarea_button(label, target_id, (el)=>{
            $01eb911984ab8c65$export$d06cfff677aa04b2.remove_to(target_id, false);
        }, (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).STYLE_ERASE);
        return btn_remove;
    }
    // テキストエリアのカーソルから下を削除するボタンを構築する(rowを返す)
    static create_remove_to_bottom(label, target_id) {
        const btn_remove = $01eb911984ab8c65$export$d06cfff677aa04b2.callback_textarea_button(label, target_id, (el)=>{
            $01eb911984ab8c65$export$d06cfff677aa04b2.remove_to(target_id, true);
        }, (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).STYLE_ERASE);
        return btn_remove;
    }
    // removeTextAfterCursor: trueのときカーソル位置から後ろに向かって削除、falseのときカーソル位置から前に向かって削除する
    static remove_to(target_id, removeTextAfterCursor) {
        // テキストエリアを取得
        const textarea = document.getElementById(target_id);
        if (textarea == null) throw new Error(`textarea: ${target_id} is not found.`);
        // テキストエリアにフォーカスがなければ何もしない
        const active = document.activeElement;
        if (active == null) return;
        // カーソルの現在位置を取得
        const cursorPosition = textarea.selectionStart;
        if (cursorPosition == null) return;
        if (removeTextAfterCursor) // カーソル位置から後ろのテキストのみを保持
        textarea.value = textarea.value.substring(0, cursorPosition);
        else // カーソル位置から前のテキストのみを保持
        textarea.value = textarea.value.substring(cursorPosition);
    }
    // クリップボードにコピーボタン
    static create_copybutton(id, label) {
        const copybutton = (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("button", "btn btn-primary copy-btn", [], `\u{1F4CB} ${label}`, {
            id: id
        });
        copybutton.addEventListener("click", (event)=>{
            const cbtext = $01eb911984ab8c65$export$d06cfff677aa04b2.read_to_field();
            (0, $b0cfe56d0e3fcfc4$export$c77dbd302edde58d).revokePermission();
            navigator.clipboard.writeText(cbtext).then((data)=>{
                copybutton.textContent = "\u2713 \u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F";
                copybutton.classList.add("copied");
            }).catch((e)=>{
                copybutton.textContent = "\u2717 \u5931\u6557\u3057\u307E\u3057\u305F";
            });
        });
        return copybutton;
    }
    // コピーボタンを元に戻す
    static clear_copybutton(id) {
        const copybutton = document.getElementById((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_BTN_COPY);
        if (copybutton) {
            copybutton.classList.remove("copied");
            copybutton.textContent = `\u{1F4CB} ${(0, $b85aa28c289cb8ee$export$fadd21211b40c08a).VALUE_BTN_COPY}`;
        }
    }
    // セレクトボックス用のプレースホルダを先頭に挿入する
    static insert_selectbox_placeholder(dropdown) {
        const placeholder = (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("option", "", [], (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).VALUE_SELECTBOX_PLACEHOLDER, {
            "value": "",
            "disabled": "",
            "selected": ""
        });
        dropdown.insertBefore(placeholder, dropdown.firstChild);
    }
    // タイトル履歴のドロップダウンを構築する
    static create_subject_historym(label, id) {
        const dropdown = (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("select", "ms-select", [], "", {
            id: id
        });
        // <option value="" disabled selected>選択してください</option>
        $01eb911984ab8c65$export$d06cfff677aa04b2.insert_selectbox_placeholder(dropdown);
        const histories = $01eb911984ab8c65$export$d06cfff677aa04b2.getLocalStorage((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_SUBJECT_HISTORIES, "");
        if (histories != "") {
            const history = histories.split(",");
            history.forEach((item)=>{
                const option = (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("option", "", [], item, {
                    "value": item
                });
                dropdown.appendChild(option);
            });
        }
        dropdown.addEventListener("change", (event)=>{
            const selected = dropdown.value;
            const newsubject = document.getElementById((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_NEW_SUBJECT);
            newsubject.value = selected;
        });
        return dropdown;
    }
    // タイトル履歴を更新する
    static update_subject_histories() {
        const dropdown = document.getElementById((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_SUBJECT_HISTORIES);
        if (dropdown == null) return;
        const newsubject = document.getElementById((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_NEW_SUBJECT);
        if (newsubject == null) return;
        const current = newsubject.value;
        const histories = $01eb911984ab8c65$export$d06cfff677aa04b2.getLocalStorage((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_SUBJECT_HISTORIES, "");
        const history = histories.split(",");
        // 重複を削除
        const new_history = history.filter((item)=>{
            return item != current;
        });
        new_history.unshift(current);
        const new_histories = new_history.join(",");
        localStorage.setItem((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_SUBJECT_HISTORIES, new_histories);
        // 履歴を更新
        while(dropdown.firstChild)dropdown.removeChild(dropdown.firstChild);
        new_history.forEach((item)=>{
            const option = (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("option", "", [], item, {
                "value": item
            });
            dropdown.appendChild(option);
        });
        // <option value="" disabled selected>選択してください</option>
        $01eb911984ab8c65$export$d06cfff677aa04b2.insert_selectbox_placeholder(dropdown);
    }
    // パターン設定セクションを構築する
    static create_pattern_section() {
        // 表示切り替えボタン
        const btn_toggle = (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("button", "settings-toggle", [
            (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("span", "", [], (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).VALUE_BTN_TOGGLE_PATTERNS),
            (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("span", "chevron", [], "\u25BC")
        ], "", {
            id: (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_BTN_TOGGLE_PATTERNS
        });
        // パターン設定セクション（初期状態は非表示）
        const pattern_content = (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("div", "settings-content", []);
        // ヘッダーパターンセクション
        const header_section = $01eb911984ab8c65$export$d06cfff677aa04b2.create_pattern_input_section("\u30D8\u30C3\u30C0\u30FC\u30D1\u30BF\u30FC\u30F3", (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_HEADER_INPUT, (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).VALUE_HEADER_PLACEHOLDER, (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_BTN_ADD_HEADER, (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).VALUE_BTN_ADD_HEADER, (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_HEADER_PATTERNS, "header");
        // フッターパターンセクション
        const footer_section = $01eb911984ab8c65$export$d06cfff677aa04b2.create_pattern_input_section("\u30D5\u30C3\u30BF\u30FC\u30D1\u30BF\u30FC\u30F3", (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_FOOTER_INPUT, (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).VALUE_FOOTER_PLACEHOLDER, (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_BTN_ADD_FOOTER, (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).VALUE_BTN_ADD_FOOTER, (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_FOOTER_PATTERNS, "footer");
        pattern_content.appendChild(header_section);
        pattern_content.appendChild(footer_section);
        // 切り替えボタンのイベント
        btn_toggle.addEventListener("click", ()=>{
            btn_toggle.classList.toggle("open");
            pattern_content.classList.toggle("open");
        });
        return (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("div", "settings-section", [
            btn_toggle,
            pattern_content
        ]);
    }
    // パターン入力セクションを構築する
    static create_pattern_input_section(label, inputId, placeholder, btnId, btnLabel, listId, type) {
        // ラベル
        const section_label = (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("h3", "pattern-section-title", [], label);
        // 入力フィールド
        const input_field = (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("textarea", "ms-textarea", [], "", {
            id: inputId,
            rows: "2",
            placeholder: placeholder
        });
        input_field.style.minHeight = "80px";
        // 追加ボタン
        const btn_add = (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("button", "btn btn-secondary mt-md", [], btnLabel, {
            id: btnId
        });
        btn_add.addEventListener("click", ()=>{
            const input = document.getElementById(inputId);
            if (input && input.value.trim()) {
                if (type === "header") (0, $f20388b6d53e66a8$export$ef2db797533c664c).addHeaderPattern(input.value.trim());
                else (0, $f20388b6d53e66a8$export$ef2db797533c664c).addFooterPattern(input.value.trim());
                input.value = "";
                $01eb911984ab8c65$export$d06cfff677aa04b2.refresh_pattern_list(listId, type);
            }
        });
        // パターンリスト
        const pattern_list = (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("div", "pattern-list", [], "", {
            id: listId
        });
        return (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("div", "pattern-section", [
            section_label,
            input_field,
            btn_add,
            pattern_list
        ]);
    }
    // パターンリストを更新する
    static refresh_pattern_list(listId, type) {
        const list = document.getElementById(listId);
        if (!list) return;
        // リストをクリア
        while(list.firstChild)list.removeChild(list.firstChild);
        // パターンを取得
        const patterns = type === "header" ? (0, $f20388b6d53e66a8$export$ef2db797533c664c).getHeaderPatterns() : (0, $f20388b6d53e66a8$export$ef2db797533c664c).getFooterPatterns();
        // パターンアイテムを追加
        patterns.forEach((pattern)=>{
            const item = $01eb911984ab8c65$export$d06cfff677aa04b2.create_pattern_item(pattern, type);
            list.appendChild(item);
        });
    }
    // パターンアイテムを構築する
    static create_pattern_item(pattern, type) {
        // テキスト表示（複数行の場合は最初の行のみ表示）
        const displayText = pattern.text.split("\n")[0];
        const text_span = (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("span", `pattern-item-text${!pattern.enabled ? " disabled" : ""}`, [], displayText);
        // 有効/無効切り替えボタン
        const btn_toggle = (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("button", `btn btn-icon ${pattern.enabled ? "btn-secondary" : "btn-ghost"}`, [], pattern.enabled ? "\u2713" : "\u2717");
        btn_toggle.addEventListener("click", ()=>{
            if (type === "header") (0, $f20388b6d53e66a8$export$ef2db797533c664c).toggleHeaderPattern(pattern.id);
            else (0, $f20388b6d53e66a8$export$ef2db797533c664c).toggleFooterPattern(pattern.id);
            $01eb911984ab8c65$export$d06cfff677aa04b2.refresh_pattern_list(type === "header" ? (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_HEADER_PATTERNS : (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_FOOTER_PATTERNS, type);
        });
        // 削除ボタン（無効化されたパターンのみ削除可能）
        const btn_delete = (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("button", "btn btn-icon btn-danger", [], "\uD83D\uDDD1\uFE0F");
        // 有効なパターンの場合は削除ボタンを無効化
        if (pattern.enabled) {
            btn_delete.disabled = true;
            btn_delete.style.opacity = "0.3";
            btn_delete.style.cursor = "not-allowed";
        }
        btn_delete.addEventListener("click", ()=>{
            // 無効化されたパターンのみ削除
            if (!pattern.enabled) {
                if (type === "header") (0, $f20388b6d53e66a8$export$ef2db797533c664c).removeHeaderPattern(pattern.id);
                else (0, $f20388b6d53e66a8$export$ef2db797533c664c).removeFooterPattern(pattern.id);
                $01eb911984ab8c65$export$d06cfff677aa04b2.refresh_pattern_list(type === "header" ? (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_HEADER_PATTERNS : (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_FOOTER_PATTERNS, type);
            }
        });
        // アイテムを構築
        const item = (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("div", "pattern-item", [
            text_span,
            (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("div", "pattern-item-actions", [
                btn_toggle,
                btn_delete
            ])
        ]);
        return item;
    }
}



/**
 * メルマガ音声化の前処理
 */ (function() {
    "use strict";
    console.log("run script.");
    const converter = new (0, $01eb911984ab8c65$export$d06cfff677aa04b2)("app");
    converter.build();
    // 共有データのチェックとフィールドへの反映
    window.addEventListener("DOMContentLoaded", ()=>{
        const params = new URLSearchParams(window.location.search);
        const sharedText = params.get("shared_text");
        if (sharedText) {
            const fromField = (0, $01eb911984ab8c65$export$d06cfff677aa04b2).get_from_field();
            if (fromField) {
                fromField.value = sharedText;
                (0, $01eb911984ab8c65$export$d06cfff677aa04b2).change_from();
                // URLパラメータをクリア
                window.history.replaceState({}, document.title, window.location.pathname);
                console.log("Shared text loaded into from field");
            }
        }
    });
})();


