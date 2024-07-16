
export const CONST = {
    ID_BUTTON_RUN: 'id_button_run'
    , ID_TEXT_FROM: 'id_text_from'
    , ID_TEXT_TO: 'id_text_to'
    , ID_LENGTH_FROM: 'id_length_from'  // fromの文字数表示ノード
    , ID_LENGTH_TO: 'id_length_to'      // toの文字数表示ノード
    , ID_BUTTONS: 'id_buttons_block'    // パラグラフコピーボタンを列挙するノード
    , ID_LIMIT_LENGTH: 'id_limit_length'    // 分割文字数の入力フィールド
    , ID_BTN_COPY: 'id_button_copy'    // コピーボタン
    , ID_BTN_CLEAR: 'id_button_clear'    // fromをクリアするボタン
    , ID_BTN_INPUT_TOP: 'id_button_input_top'    // コピーボタン
    , ID_BTN_INPUT_BOTTOM: 'id_button_input_bottom'    // コピーボタン
    , ID_BTN_OUTPUT_TOP: 'id_button_output_top'    // コピーボタン
    , ID_BTN_OUTPUT_BOTTOM: 'id_button_output_bottom'    // コピーボタン
    , ID_NEW_SUBJECT: 'id_new_subject'    // 新規タイトルの入力フィールド
    , ID_SUBJECT_HISTORIES: 'id_subject_histories'    // タイトル履歴の表示ノード

    , STYLE_COPY_DEFAULT: 'btn-info'    // コピーボタンのデフォルトスタイル
    , STYLE_COPY_SUCCESS: 'btn-outline-success'
    , STYLE_SCROLL: 'btn btn-outline-primary'   // スクロールボタン
    , STYLE_ERASE: 'btn btn-outline-danger'   // カーソル前/後ろ消去ボタン
    , VALUE_BTN_SMOOTHING: '🧼smoothing'
    , VALUE_BTN_PASTE: "📋paste"
    , VALUE_BTN_COPY: "📋copy"
    , VALUE_BTN_TO_TOP: "⏮️"
    , VALUE_BTN_TO_BOTTOM: "⏭️"
    , VALUE_BTN_ERASE_BEFORE: "👻⏪"
    , VALUE_BTN_ERASE_AFTER: "⏩👻"
    , VALUE_LABEL_HISOTRY: "📚"
    , VALUE_NEW_SUBJECT_PLACEHOLDER: "見出しを入力する"
    , VALUE_SELECTBOX_PLACEHOLDER: "履歴からも選べます"
    , VALUE_LIMIT_PLACEHOLDER: "分割文字数を入力"

    , RE_SHRINK: '([─━=━┏])\\1+'
    , RE_SEPARATOR_PATTERNS: [  // 区切り線のパターン
        '　＊　＊　＊'  // 結城浩の「コミュニケーションの心がけ」で使われる
    ]
    , RE_URL: 'https?://[\\w!?/+\-=_~;.,*&@#$%()\'[\\]]+'

    , LIMIT_LENGTH: 5000       // 分割する目安となる文字数の上限
}
