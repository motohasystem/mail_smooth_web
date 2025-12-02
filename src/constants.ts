/**
 * MailSmooth 定数定義
 * Editorial Dark Design System対応
 */
export const CONST = {
    // ===== Element IDs =====
    ID_BUTTON_RUN: 'id_button_run'
    , ID_TEXT_FROM: 'id_text_from'
    , ID_TEXT_TO: 'id_text_to'
    , ID_LENGTH_FROM: 'id_length_from'
    , ID_LENGTH_TO: 'id_length_to'
    , ID_BUTTONS: 'id_buttons_block'
    , ID_LIMIT_LENGTH: 'id_limit_length'
    , ID_BTN_COPY: 'id_button_copy'
    , ID_BTN_CLEAR: 'id_button_clear'
    , ID_BTN_INPUT_TOP: 'id_button_input_top'
    , ID_BTN_INPUT_BOTTOM: 'id_button_input_bottom'
    , ID_BTN_OUTPUT_TOP: 'id_button_output_top'
    , ID_BTN_OUTPUT_BOTTOM: 'id_button_output_bottom'
    , ID_NEW_SUBJECT: 'id_new_subject'
    , ID_SUBJECT_HISTORIES: 'id_subject_histories'
    , ID_PATTERN_SECTION: 'id_pattern_section'
    , ID_HEADER_PATTERNS: 'id_header_patterns'
    , ID_FOOTER_PATTERNS: 'id_footer_patterns'
    , ID_HEADER_INPUT: 'id_header_input'
    , ID_FOOTER_INPUT: 'id_footer_input'
    , ID_BTN_ADD_HEADER: 'id_btn_add_header'
    , ID_BTN_ADD_FOOTER: 'id_btn_add_footer'
    , ID_BTN_TOGGLE_PATTERNS: 'id_btn_toggle_patterns'

    // ===== UI Labels =====
    , VALUE_BTN_SMOOTHING: '変換'
    , VALUE_BTN_PASTE: 'ペースト'
    , VALUE_BTN_COPY: 'コピー'
    , VALUE_BTN_TO_TOP: '⏮️'
    , VALUE_BTN_TO_BOTTOM: '⏭️'
    , VALUE_BTN_ERASE_BEFORE: '👻⏪'
    , VALUE_BTN_ERASE_AFTER: '⏩👻'
    , VALUE_LABEL_HISOTRY: '📚'
    , VALUE_NEW_SUBJECT_PLACEHOLDER: '見出しを入力してください'
    , VALUE_SELECTBOX_PLACEHOLDER: '履歴から選択'
    , VALUE_LIMIT_PLACEHOLDER: '例: 5000'
    , VALUE_BTN_TOGGLE_PATTERNS: '⚙️ ヘッダー/フッター設定'
    , VALUE_BTN_ADD_HEADER: '➕ ヘッダー追加'
    , VALUE_BTN_ADD_FOOTER: '➕ フッター追加'
    , VALUE_HEADER_PLACEHOLDER: 'ヘッダーパターンを入力（この文字列以前を削除）'
    , VALUE_FOOTER_PLACEHOLDER: 'フッターパターンを入力（この文字列以降を削除）'

    // ===== Regex Patterns =====
    , RE_SHRINK: '([─━=━┏])\\1+'
    , RE_SEPARATOR_PATTERNS: [
        '　＊　＊　＊'
    ]
    , RE_URL: 'https?://[\\w!?/+\-=_~;.,*&@#$%()\'[\\]]+'

    // ===== Default Values =====
    , LIMIT_LENGTH: 5000
}
