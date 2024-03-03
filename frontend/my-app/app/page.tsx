// app/page.tsx
"use client";

import React, { useEffect, useState } from 'react';

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
      } catch (error) {
        console.error('APIからのデータ取得に失敗しました:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>通過した店舗とポイント</h1>
      <p>
        通過：
        {data.map(({ store, time }, index) => (
          <React.Fragment key={index}>
            {store} ({new Date(time).toLocaleString()})
            {index < data.length - 1 ? ' → ' : ''}
          </React.Fragment>
        ))}
      </p>
    </div>
  );
};

export default PassingPoints;

