import React, { useState } from 'react';
import { Table, Tooltip } from 'antd';
import styles from './listdomain.module.scss';
import DeleteButton from '../Components/useDelete';
import { useData } from '../Components/useData';
import { SettingOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const deleteBtn = <span>Delete</span>;
const settingBtn = <span>Setting</span>;

const ListDomain = () => {
  const { data, isLoading, refetch } = useData();
  const [selectedCategory, setSelectedCategory] = useState('domain');
  const [searchInput, setSearchInput] = useState('');
  const loading = isLoading;
  const router = useRouter();

  const filteredData = data
    ? data.filter((item) => {
        const lowerCaseSearchInput = searchInput.toLowerCase();
        return (selectedCategory ? item.category === selectedCategory : true) && Object.values(item).some((value) => value && value.toString().toLowerCase().includes(lowerCaseSearchInput));
      })
    : [];

  const handleSettingClick = (id, name) => {
    router.push(`dns-management/dns-setting/${name}/${id}`);
  };

  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      width: '6%',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '15%',
    },
    {
      title: 'Type',
      dataIndex: 'type_name',
      key: 'type_name',
      width: '10%',
    },
    {
      title: 'DNS ID',
      dataIndex: 'id',
      key: 'id',
      width: '10%',
      ellipsis: true,
    },
    {
      title: 'Zone Name',
      dataIndex: 'zone_name',
      key: 'zone_name',
      width: '15%',
    },
    {
      title: 'Configure ',
      dataIndex: 'conf_ready',
      width: '10%',
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
      title: 'File ',
      dataIndex: 'file_ready',
      width: '7%',
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
    {
      title: 'Action',
      dataIndex: '',
      width: '10%',
      key: 'actionColumn',
      render: (record) => (
        <div className={styles.columnAction}>
          <Tooltip placement="bottom" title={settingBtn}>
            <div className={styles.generateButton}>
              <SettingOutlined onClick={() => handleSettingClick(record.id, record.name)} />
            </div>
          </Tooltip>
          <Tooltip placement="bottom" title={deleteBtn}>
            <div className={styles.deleteButton}>
              <DeleteButton id={record.id} onDeleteSuccess={refetch} />
            </div>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className={`${styles.tableDomain} flex justify-between flex-col`}>
      <div className="flex gap-3 mb-5 items-center justify-between">
        <div className="flex gap-3 ">
          <div className="flex gap-3 ">
            <button
              className={`bg-color-greytwo rounded-md text-color-secondary p-1 pl-2 pr-2 hover:bg-color-greythree transition-all shadow-md ${selectedCategory === 'domain' ? styles.activeButton : ''}`}
              onClick={() => setSelectedCategory('domain')}
            >
              Domain
            </button>
            <button
              className={`bg-color-greytwo rounded-md text-color-secondary p-1 pl-2 pr-2 hover:bg-color-greythree transition-all shadow-md ${selectedCategory === 'ipv4' ? styles.activeButton : ''}`}
              onClick={() => setSelectedCategory('ipv4')}
            >
              IP Version 4
            </button>
            <button
              className={`bg-color-greytwo rounded-md text-color-secondary p-1 pl-2 pr-2 hover:bg-color-greythree transition-all shadow-md ${selectedCategory === 'ipv6' ? styles.activeButton : ''}`}
              onClick={() => setSelectedCategory('ipv6')}
            >
              IP Version 6
            </button>
          </div>
        </div>
        <div>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="bg-color-greytwo text-color-secondary rounded-md p-1 pl-2 pr-8 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Search..."
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Table dataSource={filteredData} columns={columns} loading={loading} rowKey="id" />
      </div>
    </div>
  );
};

export default ListDomain;
