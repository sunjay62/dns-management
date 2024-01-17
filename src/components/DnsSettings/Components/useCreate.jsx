import React, { useState } from 'react';
import { Input, Select } from 'antd';
import Swal from 'sweetalert2';
import axios from 'axios';
import { BASE_URL } from '@/libs/api-libs';

const Create = ({ id, onCreateSuccess }) => {
  const [recordType, setRecordType] = useState('-- Select Type --');
  const [name, setName] = useState('');
  const [ttl, setTtl] = useState('');
  const [rdata, setRdata] = useState('');
  const [priority, setPriority] = useState('');
  const [weight, setWeight] = useState('');
  const [port, setPort] = useState('');

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
      formData.append('domain_id', parseInt(id, 10));
      formData.append('name', name);
      formData.append('type', recordType);

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

      const response = await axios.post(`${BASE_URL}/record`, formData, {
        headers: {
          'x-api-key': 'R_DfwauR47lbvCj5KzIpefuKHqfJvFajId4uVK-BgW4',
        },
      });

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Save Record Successfully',
        });
        onCreateSuccess();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to Record',
        });
      }
      setName('');
      setRecordType('-- Select Type --');
      setTtl('');
      setRdata('');
      setPriority('');
      setWeight('');
      setPort('');
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
            optionFilterProp="children"
            showSearch
            onChange={onChange}
            value={recordType}
            onSearch={onSearch}
            filterOption={filterOption}
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
      <div className="bottom flex items-center justify-end gap-2 mt-2">
        <button className="bg-color-success px-2 py-1 rounded-md text-color-primary hover:bg-color-successHover transition-all focus:outline-none" onClick={handleSaveRecord}>
          Save Record
        </button>
      </div>
    </div>
  );
};

export default Create;
