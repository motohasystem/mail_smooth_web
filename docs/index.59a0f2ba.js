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


const $b85aa28c289cb8ee$export$fadd21211b40c08a = {
    ID_BUTTON_RUN: "id_button_run",
    ID_TEXT_FROM: "id_text_from",
    ID_TEXT_TO: "id_text_to",
    ID_LENGTH_FROM: "id_length_from" // fromの文字数表示ノード
    ,
    ID_LENGTH_TO: "id_length_to" // toの文字数表示ノード
    ,
    ID_BUTTONS: "id_buttons_block" // パラグラフコピーボタンを列挙するノード
    ,
    ID_LIMIT_LENGTH: "id_limit_length" // 分割文字数の入力フィールド
    ,
    ID_BTN_COPY: "id_button_copy" // コピーボタン
    ,
    ID_BTN_CLEAR: "id_button_clear" // fromをクリアするボタン
    ,
    ID_BTN_INPUT_TOP: "id_button_input_top" // コピーボタン
    ,
    ID_BTN_INPUT_BOTTOM: "id_button_input_bottom" // コピーボタン
    ,
    ID_BTN_OUTPUT_TOP: "id_button_output_top" // コピーボタン
    ,
    ID_BTN_OUTPUT_BOTTOM: "id_button_output_bottom" // コピーボタン
    ,
    ID_NEW_SUBJECT: "id_new_subject" // 新規タイトルの入力フィールド
    ,
    ID_SUBJECT_HISTORIES: "id_subject_histories" // タイトル履歴の表示ノード
    ,
    STYLE_COPY_DEFAULT: "btn-info" // コピーボタンのデフォルトスタイル
    ,
    STYLE_COPY_SUCCESS: "btn-outline-success",
    STYLE_SCROLL: "btn btn-outline-primary" // スクロールボタン
    ,
    STYLE_ERASE: "btn btn-outline-danger" // カーソル前/後ろ消去ボタン
    ,
    VALUE_BTN_SMOOTHING: "\uD83E\uDDFCsmoothing",
    VALUE_BTN_PASTE: "\uD83D\uDCCBpaste",
    VALUE_BTN_COPY: "\uD83D\uDCCBcopy",
    VALUE_BTN_TO_TOP: "\u23EE\uFE0F",
    VALUE_BTN_TO_BOTTOM: "\u23ED\uFE0F",
    VALUE_BTN_ERASE_BEFORE: "\uD83D\uDC7B\u23EA",
    VALUE_BTN_ERASE_AFTER: "\u23E9\uD83D\uDC7B",
    VALUE_LABEL_HISOTRY: "\uD83D\uDCDA",
    VALUE_NEW_SUBJECT_PLACEHOLDER: "\u898B\u51FA\u3057\u3092\u5165\u529B\u3059\u308B",
    VALUE_SELECTBOX_PLACEHOLDER: "\u5C65\u6B74\u304B\u3089\u3082\u9078\u3079\u307E\u3059",
    VALUE_LIMIT_PLACEHOLDER: "\u5206\u5272\u6587\u5B57\u6570\u3092\u5165\u529B",
    RE_SHRINK: "([\u2500\u2501=\u2501\u250F])\\1+",
    RE_SEPARATOR_PATTERNS: [
        "\u3000\uFF0A\u3000\uFF0A\u3000\uFF0A" // 結城浩の「コミュニケーションの心がけ」で使われる
    ],
    RE_URL: "https?://[\\w!?/+-=_~;.,*&@#$%()'[\\]]+",
    LIMIT_LENGTH: 5000 // 分割する目安となる文字数の上限
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
    // 画面を構築する
    build_forms(node_id) {
        const top = document.getElementById(node_id);
        top?.setAttribute("class", "me-5");
        // ペーストボタン(paste)
        const btn_paste = (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("input", "btn btn-primary col-4 mt-3 mb-4", [], "", {
            type: "button",
            value: (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).VALUE_BTN_PASTE,
            id: (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_BUTTON_RUN
        });
        btn_paste.addEventListener("click", $01eb911984ab8c65$export$d06cfff677aa04b2.paste);
        // 実行ボタン(smoothing)
        const btn_run = (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("input", "btn btn-primary col-5 ms-2 mt-3 mb-4", [], "", {
            type: "button",
            value: (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).VALUE_BTN_SMOOTHING,
            id: (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_BUTTON_RUN
        });
        btn_run.addEventListener("click", $01eb911984ab8c65$export$d06cfff677aa04b2.run);
        // クリアボタン
        const btn_clear = (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("input", "btn btn-outline-danger col-2 ms-2 mt-3 mb-4", [], "", {
            type: "button",
            value: "\uD83D\uDC7Bclear",
            id: (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_BTN_CLEAR
        });
        btn_clear.addEventListener("click", ()=>{
            const from = $01eb911984ab8c65$export$d06cfff677aa04b2.get_from_field();
            from.value = "";
            $01eb911984ab8c65$export$d06cfff677aa04b2.change_from();
        });
        // 文字数上限入力フォーム
        const limit_length = $01eb911984ab8c65$export$d06cfff677aa04b2.getLocalStorage((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_LIMIT_LENGTH, (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).LIMIT_LENGTH.toString());
        const field_limit = (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("input", "col-5", [], "", {
            id: (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_LIMIT_LENGTH,
            value: limit_length,
            placeholder: (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).VALUE_LIMIT_PLACEHOLDER
        });
        // FROMフィールド
        const default_from = $01eb911984ab8c65$export$d06cfff677aa04b2.getLocalStorage((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_TEXT_FROM, "");
        const label_from = (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("label", "col-4 mb-2", [], "from");
        const textfield_from = $01eb911984ab8c65$export$d06cfff677aa04b2.create_textarea((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_TEXT_FROM, default_from, true);
        textfield_from.addEventListener("change", $01eb911984ab8c65$export$d06cfff677aa04b2.change_from);
        // 見出し新規入力フィールド
        const field_newsubject = (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("input", "form-control col-4", [], "", {
            id: (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_NEW_SUBJECT,
            value: "" // 値は常に空欄
            ,
            placeholder: (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).VALUE_NEW_SUBJECT_PLACEHOLDER
        });
        // 過去の見出し選択ドロップダウン
        const dropdown_subject_history = $01eb911984ab8c65$export$d06cfff677aa04b2.create_subject_historym((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).VALUE_LABEL_HISOTRY, (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_SUBJECT_HISTORIES);
        // TOフィールド
        const label_to = (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("label", "col-4 mb-2", [], "to speach");
        const textfield_to = $01eb911984ab8c65$export$d06cfff677aa04b2.create_textarea((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_TEXT_TO);
        textfield_to.addEventListener("change", $01eb911984ab8c65$export$d06cfff677aa04b2.change_to);
        // クリップボードにコピーボタン
        const copy_to_cb = $01eb911984ab8c65$export$d06cfff677aa04b2.create_copybutton((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_BTN_COPY, (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).VALUE_BTN_COPY);
        // btn_paste.classList.add("col-2")
        btn_run.classList.add("col-5");
        copy_to_cb.classList.add("row");
        // 全体を構築
        const formset = (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("div", "container", [
            (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("div", "row", [
                label_from,
                (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("span", "col-4", [], "", {
                    id: (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_LENGTH_FROM
                })
            ]),
            textfield_from,
            (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("div", "row mt-3", [
                (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("div", "col-5", [], "split about: "),
                field_limit
            ]),
            (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("div", "row", [
                field_newsubject,
                dropdown_subject_history
            ]),
            (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("div", "row", [
                btn_paste,
                btn_run,
                btn_clear
            ]),
            (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("div", "row", [
                label_to,
                (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("span", "col-4", [], "", {
                    id: (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_LENGTH_TO
                })
            ]),
            textfield_to,
            (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("div", "row mt-3", [
                (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("div", "col", [], "", {
                    id: (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_BUTTONS
                })
            ]),
            copy_to_cb
        ]);
        top?.append(formset);
    }
    // pasteボタンを押してクリップボードからデータを貼り付ける
    static paste() {
        const node_from = document.getElementById((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_TEXT_FROM);
        console.log({
            node_from: node_from
        });
        if (node_from == null) throw new Error(`\u{6307}\u{5B9A}\u{3057}\u{305F}\u{30CE}\u{30FC}\u{30C9}ID[${(0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_TEXT_FROM}]\u{304C}\u{898B}\u{3064}\u{304B}\u{308A}\u{307E}\u{305B}\u{3093}\u{3002}`);
        navigator.clipboard.readText().then((text)=>{
            // console.log(text);
            node_from.value = text;
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
            const paragraph = (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("input", "btn  btn-secondary", [], "", {
                "type": "button",
                "value": `page ${paging}`
            });
            const subject = $01eb911984ab8c65$export$d06cfff677aa04b2.get_subject(paging);
            paragraph.addEventListener("click", (event)=>{
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
        // YYYYMMDD 形式の日付文字列を構築する
        const datestring = new Date().toISOString().split("T")[0].replace(/-/g, "");
        const el_subject = document.getElementById((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_NEW_SUBJECT);
        const paging_zero_padding = paging.toString().padStart(2, "0");
        const filebodies = [
            datestring,
            el_subject?.value,
            paging_zero_padding
        ].filter((item)=>{
            return item != "";
        });
        const subject = el_subject == null ? paging_zero_padding : filebodies.join("_");
        return subject;
    }
    static convert(content) {
        // console.log('PrepareMailbody.convert()')
        if (content == null) return "";
        // セパレーター文字列のシュリンク
        let converted;
        const reg_shrink = new RegExp((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).RE_SHRINK, "g");
        converted = content.replace(reg_shrink, "$1");
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
    // クリップボードにコピーボタン(rowを返す)
    static create_copybutton(id, label) {
        const style_default = (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).STYLE_COPY_DEFAULT;
        const copybutton = (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("input", "btn mt-3 mb-2", [], "", {
            id: id,
            type: "button",
            value: label
        });
        copybutton.classList.add(style_default);
        copybutton.addEventListener("click", (event)=>{
            const cbtext = $01eb911984ab8c65$export$d06cfff677aa04b2.read_to_field();
            (0, $b0cfe56d0e3fcfc4$export$c77dbd302edde58d).revokePermission();
            navigator.clipboard.writeText(cbtext).then((data)=>{
                copybutton.setAttribute("value", "copied!");
                copybutton.classList.remove(style_default);
                copybutton.classList.add((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).STYLE_COPY_SUCCESS);
            }).catch((e)=>{
                copybutton.setAttribute("value", "failed!");
            });
        });
        copybutton.classList.add("col-12");
        return (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("div", "row", [
            copybutton
        ]);
    }
    // コピーボタンを元に戻す
    static clear_copybutton(id) {
        const style_default = (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).STYLE_COPY_DEFAULT;
        const copybutton = document.getElementById((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).ID_BTN_COPY);
        if (copybutton) {
            copybutton.classList.remove((0, $b85aa28c289cb8ee$export$fadd21211b40c08a).STYLE_COPY_SUCCESS);
            copybutton.classList.add(style_default);
            copybutton.setAttribute("value", (0, $b85aa28c289cb8ee$export$fadd21211b40c08a).VALUE_BTN_COPY);
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
        const dropdown = (0, $159c72d0604c430a$export$d2ca453b913dcdea).ce("select", "form-select col-4", [], "", {
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
}



// import "bootstrap"
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


