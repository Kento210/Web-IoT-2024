# 最新のrubyイメージを取得
FROM ruby:3.2.2

# 環境変数
ENV APP_HOME /app
ENV TZ Asia/Tokyo
ENV PORT 3001
ENV HOST 0.0.0.0

# WORKDIR：作業ディレクトリ
WORKDIR ${APP_HOME}

# ローカルのGemfileをコンテナ内の/app/Gemfileに
COPY Gemfile ${APP_HOME}/Gemfile
COPY Gemfile.lock ${APP_HOME}/Gemfile.lock

# Rails7ではWebpackerが標準では組み込まれなくなったので、yarnやnodejsのインストールが不要
RUN apt-get update
RUN apt-get install -y \
        git

# Gemをアップデート
RUN bundle install

COPY . ${APP_HOME}

# コンテナ起動時に実行させるスクリプト
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE ${PORT}

# コンテナ実行時にRails サーバ起動
CMD ["bundle", "exec", "rails", "server", "-b", ${HOST}]
