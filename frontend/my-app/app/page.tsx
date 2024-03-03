// app/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';

// APIレスポンスの型定義
type ApiResponse = [string, string][];

// 加工後のデータの型定義
type StoreData = {
  time: string;
  store: string;
};

// 店舗IDと店舗名のマッピング
const storeIds: { [key: string]: string } = {
  'f3798cf9': '店舗A',
  '1310d4f720': '店舗B',
  '737cd8f720': '店舗C',
};

const PassingPoints = () => {
  const [data, setData] = useState<StoreData[]>([]);
  const [points, setPoints] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=2xvDe1Sq4jbHOEaBmfmps8cUCqs7qb6ewJ29HQxqfp92zHhO8-noVQDfCLurjp98dDqrQD7Ukd_P0Hbv7DpWp2C72XPJpUeum5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnP34e736HBGtKXE-8t_StaZ3_ds0s0T-fkpF3U3k8C6cNkhk8l3DsTETdSerGXKmasqjVFlr51yg1sZLyhO_nP76Zu-kJx4lNA&lib=MCqynvoswXh9j_keZKitz8MZtq1kvHJ46');
        const apiData: ApiResponse = await response.json();
        const processedData: StoreData[] = apiData.map(([time, id]) => ({
          time,
          store: storeIds[id] || '未知の店舗',
        }));
        setData(processedData);
        setPoints(processedData.length * 10);
      } catch (error) {
        console.error('APIからのデータ取得に失敗しました:', error);
      }
    };

    // 3秒ごとにデータを更新する
    const interval = setInterval(() => {
      fetchData();
    }, 3000);

    // コンポーネントがアンマウントされる時にインターバルをクリアする
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <h1>通過した店舗とポイント</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>店舗</th>
            <th>時間</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ store, time }, index) => (
            <tr key={index}>
              <td>{store}</td>
              <td>{new Date(time).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>獲得ポイント: {points} ポイント</p>
    </div>
  );
};

export default PassingPoints;

