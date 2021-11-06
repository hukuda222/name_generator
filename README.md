# name_generator
マイナンバーから人名を生成します。

## 実行方法
下記のコマンドを実行すると、http://localhost:3000 でページが見られるようになります。

```
docker-compose up --build
```


## 利用素材
常用漢字一覧は https://github.com/rime-aca/character_set から入手しました。
よく使われる漢字2文字による単語一覧は https://huggingface.co/cl-tohoku/bert-base-japanese/tree/main のvocab.txtから入手しました。