'use client';

import React from 'react';

import { Alert, Button, Form, Input } from 'antd';
import NextLink from 'next/link';
import { axiosErrorHandler } from '@/utils/errorHandling';
import axios from 'axios';

type FieldType = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export default function RegisterForm() {
  const [form] = Form.useForm();

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [isRegisterSuccess, setIsRegisterSuccess] = React.useState(false);

  const onFinish = async (values: FieldType) => {
    try {
      setError('');
      setLoading(true);
      setIsRegisterSuccess(false);

      await axios.post('/api/auth/register', values);

      setIsRegisterSuccess(true);
      form.resetFields();
    } catch (error) {
      setError(axiosErrorHandler(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      form={form}
    >
      {error && (
        <Form.Item>
          <Alert message={error} type="error" showIcon />
        </Form.Item>
      )}

      {isRegisterSuccess && (
        <Form.Item>
          <Alert message="Register success, please login" type="success" showIcon />
        </Form.Item>
      )}

      <p className="text-2xl font-bold">Welcome</p>
      <p className="text-md mb-10 text-gray-500">First, let&apos;s create your account</p>

      <Form.Item<FieldType>
        label="Fullname"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your fullname'
          }
        ]}
      >
        <Input placeholder="Input your fullname" size="large" />
      </Form.Item>

      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email'
          }
        ]}
      >
        <Input placeholder="Input your email" size="large" />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            min: 8,
            max: 50,
            message: 'Please input your password'
          }
        ]}
      >
        <Input placeholder="Input your password" size="large" type="password" />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password Confirmation"
        name="passwordConfirmation"
        rules={[
          {
            required: true,
            min: 8,
            max: 50,
            message: 'Please confirm your password'
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('The new password that you entered do not match!'));
            }
          })
        ]}
      >
        <Input placeholder="Input your password" size="large" type="password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} className="w-full mt-4" size="large">
          Register
        </Button>
      </Form.Item>

      <p className="text-md">
        Already have account?{' '}
        <NextLink href="/login">
          <span className="text-blue-600 hover:cursor-pointer">Login Now!</span>
        </NextLink>
      </p>
    </Form>
  );
}
