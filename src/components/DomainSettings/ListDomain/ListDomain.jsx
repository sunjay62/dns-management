import React from 'react';
import { Table, Tooltip } from 'antd';
import styles from './listdomain.module.scss';
import DeleteButton from '../Components/useDelete';
import GenerateButton from '../Components/useGenerate';
import { useData } from '../Components/useData';

const deleteBtn = <span>Delete</span>;
const generateBtn = <span>Generate</span>;

const ListDomain = () => {
  const { data, isLoading, refetch } = useData();
  const loading = isLoading;

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
      width: '13%',
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
    {
      title: 'Zone Name',
      dataIndex: 'zone_name',
      key: 'zone_name',
    },
    {
      title: 'Action',
      dataIndex: '',
      width: '13%',
      key: 'actionColumn',
      render: (record) => (
        <div className={styles.columnAction}>
          <Tooltip placement="bottom" title={generateBtn}>
            <div className={styles.generateButton}>
              <GenerateButton id={record.id} onGenerateSuccess={refetch} />
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
    <div className={`${styles.tableDomain} flex justify-between`}>
      <div className="flex flex-col gap-2">
        <Table dataSource={data} columns={columns} loading={loading} rowKey="id" />
      </div>
    </div>
  );
};

export default ListDomain;
