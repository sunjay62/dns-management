import React, { useState, useEffect } from 'react';
import { Table, Skeleton } from 'antd';
import { BASE_URL } from '@/libs/api-libs';
import axios from 'axios';
import styles from './listdomain.module.css';

const ListDomain = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
      width: '6%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Zone Name',
      dataIndex: 'zone_name',
      key: 'zone_name',
    },
    {
      title: 'Type',
      dataIndex: 'type_name',
      key: 'type_name',
      width: '10%',
      ellipsis: true,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: '10%',
      ellipsis: true,
    },
    {
      title: 'Configure Ready',
      dataIndex: 'conf_ready',
      width: '15%',
      key: 'conf_ready',
      render: (confReady) => (
        <span
          style={{
            background: confReady ? 'rgba(24, 167, 24, 0.767)' : 'rgba(230, 59, 59, 0.788)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
          }}
        >
          {confReady ? 'Yes' : 'No'}
        </span>
      ),
    },
    {
      title: 'File Ready',
      dataIndex: 'file_ready',
      width: '10%',
      key: 'file_ready',
      render: (fileReady) => (
        <span
          style={{
            background: fileReady ? 'rgba(24, 167, 24, 0.767)' : 'rgba(230, 59, 59, 0.788)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
          }}
        >
          {fileReady ? 'Yes' : 'No'}
        </span>
      ),
    },
  ];

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures that this runs only once on mount

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/domain`, {
        headers: {
          'x-api-key': 'R_DfwauR47lbvCj5KzIpefuKHqfJvFajId4uVK-BgW4',
        },
        withCredentials: true,
      });

      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.tableDomain}`}>
      <Table dataSource={data} columns={columns} loading={loading} rowKey="id" />
    </div>
  );
};

export default ListDomain;
