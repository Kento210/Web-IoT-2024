# FROM：使用するイメージ、バージョン
FROM ruby:3.1

# Rails 7ではWebpackerが標準では組み込まれなくなったので、yarnやnodejsのインストールが不要

# ruby3.1のイメージがBundler version 2.3.7で失敗するので、gemのバージョンを追記
ARG RUBYGEMS_VERSION=3.3.20

RUN mkdir /nozawana

WORKDIR /nozawana

COPY Gemfile /nozawana/Gemfile

COPY Gemfile.lock /nozawana/Gemfile.lock

# RubyGemsをアップデート
RUN gem update --system ${RUBYGEMS_VERSION} && \
    bundle install

COPY . /app

# コンテナ起動時に実行させるスクリプトを追加
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3001

# Rails サーバ起動
CMD ["rails", "server", "-b", "0.0.0.0"]
