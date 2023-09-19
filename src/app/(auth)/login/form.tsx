'use client';

import { Alert, Button, Form, Input } from 'antd';
import React from 'react';
import NextLink from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

type FieldType = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const onFinish = async (values: FieldType) => {
    try {
      setLoading(true);

      const res = await signIn('credentials', {
        redirect: false,
        username: values.email,
        password: values.password,
        callbackUrl
      });

      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        throw Error(res.error);
      }
    } catch (error: any) {
      if (error) setError(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} autoComplete="off" layout="vertical">
      {error && (
        <Form.Item>
          <Alert message={error} type="error" showIcon />
        </Form.Item>
      )}

      <p className="text-2xl font-bold">Hello, Welcome Back</p>
      <p className="text-md mb-10 text-gray-500">Happy to see you again, login here</p>

      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email',
            type: 'email'
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

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} className="w-full mt-4" size="large">
          Login
        </Button>
      </Form.Item>

      <p className="text-md">
        Don&apos;t have account?{' '}
        <NextLink href="/register">
          <span className="text-blue-600 hover:cursor-pointer">Register Now!</span>
        </NextLink>
      </p>
    </Form>
  );
}
