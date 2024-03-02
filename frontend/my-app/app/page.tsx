// app/page.tsx
"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Item {
  sequenceNumber: number;
  buttonPressed: string;
}

const Page: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Item[]>('https://your-api-endpoint');
        setItems(response.data);
      } catch (error) {
        console.error('APIからのデータ取得に失敗:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Button Pressed Events</h1>
      <ul>
        {items.sort((a, b) => a.sequenceNumber - b.sequenceNumber).map((item) => (
          <li key={item.sequenceNumber}>Button Pressed: {item.buttonPressed}</li>
        ))}
      </ul>
    </div>
  );
};

export default Page;