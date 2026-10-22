# kogahd-website

株式会社KOGA HOLDINGS コーポレートサイト（静的HTML）

- 構成: index / company / business / projects / news / recruit / contact / privacy
- フォーム: Google Apps Script のウェブアプリへ送信し、toru@kogahd.jp に通知メール。送信後は `thanks.html` へ遷移（送信先URLは `contact.html` の `data-endpoint`）
- 公開: GitHub Pages（`main` ブランチのルート）。独自ドメインは `CNAME` ファイルで指定（www.kogahd.jp）
- 更新: HTMLを直接編集して `main` にプッシュすると自動で公開（GitHub Pages）
