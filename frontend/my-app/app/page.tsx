// app/page.tsx
"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './page.module.css'

interface Item {
  sequenceNumber: number;
  buttonPressed: string;
  timestamp: string; // timestampもAPIのレスポンスに含まれているため、インターフェースに追加
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

  // ボタンが押された順序を文字列として取得
  const pressedOrder = items
    .sort((a, b) => a.sequenceNumber - b.sequenceNumber)
    .map(item => item.buttonPressed)
    .join(' → ');

  return (
    <div>
      <h1>Button Pressed Events</h1>
      {/* 押されたボタンの順序を表示 */}
      <p>User Actions: {pressedOrder}</p>
    </div>
  );
};

export default Page;
