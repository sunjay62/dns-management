import React, { useState } from 'react';
import { useData } from './Components/useData';
import styles from './dnssetting.module.scss';
import { Table, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import DeleteButton from './Components/useDelete';
import Create from './Components/useCreate';
import Edit from './Components/useUpdate';

const deleteBtn = <span>Delete</span>;
const editBtn = <span>Edit</span>;

const DnsSetting = ({ id }) => {
  const { data, isLoading, refetch } = useData(id);
  const [isModalEditVisible, setIsModalEditVisible] = useState(false);
  const [recordData, setRecordData] = useState([]);

  const loading = isLoading;

  const toggleEditModal = () => {
    setIsModalEditVisible(!isModalEditVisible);
  };

  const handleCancelEdit = () => {
    setIsModalEditVisible(false);
  };

  const handleEdit = (record) => {
    toggleEditModal();
    setRecordData(record);
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
      width: '10%',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: '10%',
    },
    {
      title: 'Address',
      dataIndex: 'rdata',
      key: 'rdata',
      width: '15%',
    },
    {
      title: 'TTL',
      dataIndex: 'ttl',
      key: 'ttl',
      width: '8%',
    },
    {
      title: 'Action',
      dataIndex: '',
      width: '3%',
      key: 'actionColumn',
      render: (record) => (
        <div className={styles.columnAction}>
          <Tooltip placement="bottom" title={editBtn}>
            <div className={styles.generateButton} onClick={() => handleEdit(record)}>
              <EditOutlined />
            </div>
          </Tooltip>
          <Tooltip placement="bottom" title={deleteBtn}>
            <div className={styles.deleteButton}>
              <DeleteButton id={record.id} domainId={record.domain_id} onDeleteSuccess={refetch} />
            </div>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className={`${styles.dnsContainer}`}>
      {/* <div className={`${styles.top}`}>
        <h1 className="text-color-secondary">Managing {domainName}</h1>
      </div> */}
      <div className={`${styles.middle}`}>
        <div className="flex flex-col gap-2">
          <h2>List Recrord</h2>
          <Table dataSource={data} columns={columns} loading={loading} rowKey="id" pagination={false} />
        </div>
      </div>
      <div className={`${styles.bottom}`}>
        <h2>New Recrord</h2>
        <div>
          <Create id={id} onCreateSuccess={refetch} />
        </div>
      </div>
      <Edit record={recordData} visible={isModalEditVisible} onCancel={handleCancelEdit} toggleEditModal={toggleEditModal} handleEdit={handleEdit} onUpdateSuccess={refetch} />
    </div>
  );
};

export default DnsSetting;
