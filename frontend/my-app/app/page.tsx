// app/page.tsx
"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './page.module.css'

interface Item {
  sequenceNumber: number;
  buttonPressed: string;
  timestamp: string;
}

const storeIdToName = (id: string): string => {
  switch(id) {
    case 'f3798cf9': return '店舗A';
    case '1310d4f720': return '店舗B';
    case '737cd8f720': return '店舗C';
    default: return '未知の店舗';
  }
}

const formatTimestamp = (timestamp: string): string => {
  // ISO 8601形式のタイムスタンプをより読みやすい形式に変換
  return new Date(timestamp).toLocaleString();
}

const Page: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Item[]>('https://rgnc6j4qutn43f5hk3vzu4rmdm0xcfxo.lambda-url.ap-northeast-1.on.aws/');
        setItems(response.data);
      } catch (error) {
        console.error('APIからのデータ取得に失敗:', error);
      }
    };

    fetchData();
  }, []);

  // ボタンが押された順序とタイムスタンプを店舗名として取得
  const pressedOrder = items
    .sort((a, b) => a.sequenceNumber - b.sequenceNumber)
    .map(item => `${storeIdToName(item.buttonPressed)} (${formatTimestamp(item.timestamp)})`)
    .join(' → ');

  return (
    <div>
      <h1>Button Pressed Events</h1>
      {/* 押されたボタンの順序（店舗名）とタイムスタンプを表示 */}
      <p>User Actions: {pressedOrder}</p>
    </div>
  );
};

export default Page;
