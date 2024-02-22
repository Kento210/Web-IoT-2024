FROM ruby:latest
# ベースにするイメージを指定

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs default-mysql-client vim
# RailsのインストールやMySQLへの接続に必要なパッケージをインストール

RUN mkdir /nowawana
# コンテナ内にmyappディレクトリを作成

WORKDIR /nowawana
# 作成したmyappディレクトリを作業用ディレクトリとして設定

COPY Gemfile /nowawana/Gemfile
COPY Gemfile.lock /nowawana/Gemfile.lock
# ローカルの Gemfile と Gemfile.lock をコンテナ内のmyapp配下にコピー

RUN bundle install
# コンテナ内にコピーした Gemfile の bundle install

COPY . /nowawana
# ローカルのmyapp配下のファイルをコンテナ内のmyapp配下にコピー
