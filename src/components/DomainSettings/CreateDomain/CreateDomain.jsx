import React, { useState } from 'react';
import { Form, Input, Radio, Select } from 'antd';
import styles from './createdomain.module.scss';
import Swal from 'sweetalert2';
import axios from 'axios';
import { BASE_URL } from '@/libs/api-libs';

const Form1 = () => {
  const [name, setName] = useState('');
  const [typeDomain] = useState(1);
  const [isValidDomain, setIsValidDomain] = useState(true);

  const handleCreateDomain = async () => {
    try {
      if (!isValidDomain) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Domain Format',
        });
        return;
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('type', typeDomain);

      const response = await axios.post(`${BASE_URL}/domain`, formData, {
        headers: {
          'x-api-key': 'R_DfwauR47lbvCj5KzIpefuKHqfJvFajId4uVK-BgW4',
        },
      });

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Create Successfully',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to Create',
        });
      }
      setName('');
    } catch (error) {
      console.error('Error generating domain:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'An error occurred while creating',
      });
    }
  };

  const validateDomain = (value) => {
    // Regular expression for a simple domain validation (you can adjust it based on your requirements)
    const domainRegex = /^(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;
    setIsValidDomain(domainRegex.test(value));
    setName(value);
  };

  return (
    <Form
      className={`${styles.formContainer}`}
      labelCol={{
        span: 6,
      }}
      layout="horizontal"
    >
      <Form.Item className={`${styles.itemContainer}`} validateStatus={isValidDomain ? '' : 'error'} help={!isValidDomain && 'Invalid Domain Format'}>
        <p>Domain Name</p>
        <div className={`${styles.inputContainer}`}>
          <Input placeholder="Input Your Domain" onChange={(e) => validateDomain(e.target.value)} value={name} />
          <p>Example: Google.com</p>
        </div>
      </Form.Item>
      <Form.Item className={`${styles.itemContainer}`}>
        <p>Type</p>
        <div className={`${styles.inputContainer}`}>
          <Input disabled={true} placeholder="Domain" />
        </div>
      </Form.Item>
      <Form.Item className={`${styles.itemContainer}`}>
        <button onClick={handleCreateDomain} className="flex gap-2 items-center pt-1 pb-1 pr-3 pl-3 bg-color-hovertwo text-color-primary hover:bg-color-accent rounded-md transition-all h-8 ">
          <span>Create</span>
        </button>
      </Form.Item>
    </Form>
  );
};

const { Option } = Select;

const Form2 = () => {
  const [ipVersion, setIpVersion] = useState('-- Select IPv4 or IPv6 --');
  const [ipv4Address, setIpv4Address] = useState('');
  const [ipv6Address, setIpv6Address] = useState('');
  const [typeReverse, setTypeReverse] = useState(2);
  const [typeReverseIpv6, setTypeReverseIpv6] = useState(2);
  const [typeReverseIpv4, setTypeReverseIpv4] = useState(1);

  const handleCreateReverse = async () => {
    try {
      let isValid = false;

      if (ipVersion === 'ipv4') {
        isValid = validateIPv4(ipv4Address);
      } else if (ipVersion === 'ipv6') {
        isValid = validateIPv6(ipv6Address);
      }

      if (!isValid) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid IP Address Format',
        });
        return;
      }

      const formData = new FormData();
      formData.append('name', ipVersion === 'ipv4' ? ipv4Address : ipv6Address);
      formData.append('type', typeReverse);
      formData.append('type_reverse', ipVersion === 'ipv4' ? typeReverseIpv4 : typeReverseIpv6);

      // console.log('FormData:', formData);

      const response = await axios.post(`${BASE_URL}/domain`, formData, {
        headers: {
          'x-api-key': 'R_DfwauR47lbvCj5KzIpefuKHqfJvFajId4uVK-BgW4',
        },
      });

      // console.log('Response:', response);

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Create Successfully',
        });
        setIpVersion('-- Select IPv4 or IPv6 --');
        setIpv4Address('');
        setIpv6Address('');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to Create',
        });
      }
    } catch (error) {
      console.error('Error generating domain:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'An error occurred while creating',
      });
    }
  };

  const validateIPv4 = (value) => {
    // Regular expression for IPv4 validation
    const ipv4Regex = /^(\d{1,3}\.){2}\d{1,3}(\/\d{1,2})?$/;
    return ipv4Regex.test(value);
  };

  const validateIPv6 = (value) => {
    // Regular expression for IPv6 validation
    const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}$/;
    return ipv6Regex.test(value);
  };

  const handleIpVersionChange = (value) => {
    setIpVersion(value);
  };

  return (
    <Form
      className={`${styles.formContainer}`}
      labelCol={{
        span: 6,
      }}
      layout="horizontal"
    >
      <Form.Item className={`${styles.itemContainer}`}>
        <p>Reverse Name</p>
        <div className={`${styles.inputContainer}`}>
          <Select className={`${styles.select}`} onChange={handleIpVersionChange} value={ipVersion}>
            <Option value="ipv4">IPv4</Option>
            <Option value="ipv6">IPv6</Option>
          </Select>
        </div>
      </Form.Item>

      {ipVersion !== '-- Select IPv4 or IPv6 --' && (
        <>
          {ipVersion === 'ipv4' ? (
            <Form.Item className={`${styles.itemContainer}`} validateStatus={validateIPv4(ipv4Address) ? '' : 'error'} help={!validateIPv4(ipv4Address) && 'Invalid IPv4 Reverse Format'}>
              <p>IPv4 Address</p>
              <div className={`${styles.inputContainer}`}>
                <Input placeholder="Enter IPv4 Address" onChange={(e) => setIpv4Address(e.target.value)} value={ipv4Address} />
                <p>Example: 101.255.0.0/24 = 0.255.101</p>
              </div>
            </Form.Item>
          ) : (
            <Form.Item className={`${styles.itemContainer}`} validateStatus={validateIPv6(ipv6Address) ? '' : 'error'} help={!validateIPv6(ipv6Address) && 'Invalid IPv6 Reverse Format'}>
              <p>IPv6 Address</p>
              <div className={`${styles.inputContainer}`}>
                <Input placeholder="Enter IPv6 Address" onChange={(e) => setIpv6Address(e.target.value)} value={ipv6Address} />
                <p>Example: 2001:0db8:85a3:0000:0000:8a2e:0370:7334</p>
              </div>
            </Form.Item>
          )}
        </>
      )}

      <Form.Item className={`${styles.itemContainer}`}>
        <p>Type</p>
        <div className={`${styles.inputContainer}`}>
          <Input disabled={true} placeholder="Reverse" onChange={(e) => setTypeReverse(e.target.value)} />
        </div>
      </Form.Item>

      <>
        {ipVersion === 'ipv4' ? (
          <Form.Item className={`${styles.itemContainer}`}>
            <p>Type Reverse</p>
            <div className={`${styles.inputContainer}`}>
              <Input disabled={true} placeholder="IPv4 Address" onChange={(e) => setTypeReverseIpv4(e.target.value)} />
            </div>
          </Form.Item>
        ) : (
          <Form.Item className={`${styles.itemContainer}`}>
            <p>Type Reverse</p>
            <div className={`${styles.inputContainer}`}>
              <Input disabled={true} placeholder="IPv6 Address" onChange={(e) => setTypeReverseIpv6(e.target.value)} />
            </div>
          </Form.Item>
        )}
      </>

      <Form.Item className={`${styles.itemContainer}`}>
        <button onClick={handleCreateReverse} className="flex gap-2 items-center pt-1 pb-1 pr-3 pl-3 bg-color-hovertwo text-color-primary hover:bg-color-accent rounded-md transition-all h-8 ">
          <span>Create</span>
        </button>
      </Form.Item>
    </Form>
  );
};

const CreateDomain = () => {
  const [selectedForm, setSelectedForm] = useState('form1');

  const handleRadioChange = (e) => {
    setSelectedForm(e.target.value);
  };

  return (
    <div className="mt-5">
      <Radio.Group onChange={handleRadioChange} value={selectedForm}>
        <Radio.Button value="form1">Domain</Radio.Button>
        <Radio.Button value="form2">Reverse</Radio.Button>
      </Radio.Group>

      {selectedForm === 'form1' ? <Form1 /> : <Form2 />}
    </div>
  );
};

export default CreateDomain;
