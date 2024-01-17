import React, { useState, useEffect } from 'react';
import { Input, Select, Modal } from 'antd';
import Swal from 'sweetalert2';
import axios from 'axios';
import { BASE_URL } from '@/libs/api-libs';

const useUpdate = ({ record, visible, toggleEditModal, onUpdateSuccess }) => {
  const [recordType, setRecordType] = useState(record?.type || ''); // Initialize with record type
  const [name, setName] = useState(record?.name || '');
  const [ttl, setTtl] = useState(record?.ttl ? String(record.ttl) : '');
  const [rdata, setRdata] = useState(record?.rdata || '');
  const [priority, setPriority] = useState(record?.priority ? String(record.priority) : '');
  const [weight, setWeight] = useState(record?.weight ? String(record.weight) : '');
  const [port, setPort] = useState(record?.port ? String(record.port) : '');

  useEffect(() => {
    setRecordType(record?.type || '');
    setName(record?.name || '');
    setTtl(record?.ttl ? String(record.ttl) : '');
    setRdata(record?.rdata || '');
    setPriority(record?.priority ? String(record.priority) : '');
    setWeight(record?.weight ? String(record.weight) : '');
    setPort(record?.port ? String(record.port) : '');
  }, [record]);

  //   console.log(record);

  const onChange = (value) => {
    setRecordType(value);
  };

  const onSearch = (value) => {
    if (/^\d+$/.test(value) || value === '') {
      setTtl(value);
    }
  };

  const handleIntegerInputChange = (value, setValueFunction) => {
    if (/^\d+$/.test(value) || value === '') {
      setValueFunction(value);
    }
  };

  const handleSaveRecord = async () => {
    try {
      const formData = new FormData();
      formData.append('domain_id', parseInt(record.domain_id, 10));
      formData.append('id', parseInt(record.id, 10));
      formData.append('name', name);
      //   formData.append('type', recordType);

      if (ttl !== '') {
        formData.append('ttl', parseInt(ttl, 10));
      }

      if (rdata !== '') {
        formData.append('rdata', rdata);
      }

      if (priority !== '') {
        formData.append('priority', parseInt(priority, 10));
      }

      if (weight !== '') {
        formData.append('weight', parseInt(weight, 10));
      }

      if (port !== '') {
        formData.append('port', parseInt(port, 10));
      }

      //   console.log('Data being sent:', Object.fromEntries(formData.entries()));

      const response = await axios.put(`${BASE_URL}/record`, formData, {
        headers: {
          'x-api-key': 'R_DfwauR47lbvCj5KzIpefuKHqfJvFajId4uVK-BgW4',
        },
      });

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Update Record Successfully',
        });
        onUpdateSuccess();
        toggleEditModal(false);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to Update Record',
        });
      }
    } catch (error) {
      console.error('Error recording:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'An error occurred while recording',
      });
    }
  };

  const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <>
      <Modal
        title="Edit Record"
        open={visible}
        footer={null}
        width={1000}
        onCancel={() => {
          toggleEditModal(false);
        }}
      >
        <div className="flex flex-col gap-5 pt-3">
          <div className="top flex gap-3 items-center justify-between">
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-1xl text-gray-600">
                Name
              </label>
              <Input id="name" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1 mt-3 mb-3">
              <label htmlFor="type" className="text-1xl text-gray-600">
                Record Type
              </label>
              <Select
                id="type"
                className="w-48"
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                value={recordType}
                onChange={onChange}
                onSearch={onSearch}
                filterOption={filterOption}
                disabled={true}
                options={[
                  {
                    value: 'A',
                    label: 'A (Address)',
                  },
                  {
                    value: 'AAAA',
                    label: 'AAAA (Address)',
                  },
                  {
                    value: 'CNAME',
                    label: 'CNAME (Alias)',
                  },
                  {
                    value: 'MX',
                    label: 'MX (Address)',
                  },
                  {
                    value: 'TXT',
                    label: 'TXT (SPF)',
                  },
                  {
                    value: 'SRV',
                    label: 'SRV',
                  },
                  {
                    value: 'PTR',
                    label: 'PTR',
                  },
                ]}
              />
            </div>
            {recordType === 'SRV' ? (
              <>
                <div className="flex flex-col gap-1">
                  <label htmlFor="priority" className="text-1xl text-gray-600">
                    Priority
                  </label>
                  <Input id="priority" type="text" placeholder="Priority" value={priority} onChange={(e) => handleIntegerInputChange(e.target.value, setPriority)} />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="weight" className="text-1xl text-gray-600">
                    Weight
                  </label>
                  <Input id="weight" type="text" placeholder="Weight" value={weight} onChange={(e) => handleIntegerInputChange(e.target.value, setWeight)} />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="port" className="text-1xl text-gray-600">
                    Port
                  </label>
                  <Input id="port" type="text" placeholder="Port" value={port} onChange={(e) => handleIntegerInputChange(e.target.value, setPort)} />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="host" className="text-1xl text-gray-600">
                    Host
                  </label>
                  <Input id="host" type="text" placeholder="Host" value={rdata} onChange={(e) => setRdata(e.target.value)} />
                </div>
              </>
            ) : recordType === 'MX' ? (
              <>
                <div className="flex flex-col gap-1">
                  <label htmlFor="priority" className="text-1xl text-gray-600">
                    Priority
                  </label>
                  <Input id="priority" type="text" placeholder="Priority" value={priority} onChange={(e) => handleIntegerInputChange(e.target.value, setPriority)} />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="host" className="text-1xl text-gray-600">
                    Host
                  </label>
                  <Input id="host" type="text" placeholder="Host" value={rdata} onChange={(e) => setRdata(e.target.value)} />
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-1">
                <label htmlFor="address" className="text-1xl text-gray-600">
                  Address
                </label>
                <Input id="address" type="text" placeholder="Address" value={rdata} onChange={(e) => setRdata(e.target.value)} />
              </div>
            )}
            <div className="flex flex-col gap-1">
              <label htmlFor="ttl" className="text-1xl text-gray-600">
                TTL
              </label>
              <Input id="ttl" type="text" placeholder="TTL" value={ttl} onChange={(e) => onSearch(e.target.value)} />
            </div>
          </div>
          <div className="bottom flex items-center justify-center gap-2 mt-2">
            <button className="bg-color-success px-2 py-1 rounded-md text-color-primary hover:bg-color-successHover transition-all focus:outline-none" onClick={handleSaveRecord}>
              Save Record
            </button>
            <button className="bg-color-danger px-2 py-1 rounded-md text-color-primary hover:bg-color-dangerHover transition-all focus:outline-none" onClick={() => toggleEditModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default useUpdate;
