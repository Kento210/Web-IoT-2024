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
        // データをタイムスタンプ順にソート
        const sortedItems = response.data.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        setItems(sortedItems);
      } catch (error) {
        console.error('APIからのデータ取得に失敗:', error);
      }
    };

    fetchData();
  }, []);

  // ルートとポイントを取得
  const routesWithPoints = items.map((item, index) => ({
    name: storeIdToName(item.buttonPressed),
    timestamp: formatTimestamp(item.timestamp),
    points: (index + 1) * 10 // ポイントを計算
  }));

  // ルートとポイントを文字列で結合
  const routeDescriptions = routesWithPoints.map((route, index) => 
    `${index + 1}. ${route.name} (${route.timestamp}) - ${route.points}ポイント`
  ).join('\n');

  return (
    <div>
      <h1>Button Pressed Events</h1>
      {/* 押されたボタンの順序（店舗名）、タイムスタンプ、ポイントを表示 */}
      <pre>User Actions:\n{routeDescriptions}</pre>
    </div>
  );
};

export default Page;
