import React from "react";
import { Form, Input, Typography, Button, Alert } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import {
  useNavigation,
  useActionData,
  Link,
  useSubmit,
} from "react-router-dom";

const { Title, Text } = Typography;

import { registerSchema } from "../../schemas/auth.schema";
import { z } from "zod";

type RegisterInput = z.infer<typeof registerSchema>;

export const RegisterPage: React.FC = () => {
  const submit = useSubmit();
  const navigation = useNavigation();
  const actionData = useActionData() as { error?: string } | undefined;
  const isSubmitting = navigation.state === "submitting";

  const onFinish = (values: RegisterInput) => {
    submit(values, { method: "post" });
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        position: "relative",
        background: "#0f0c29",
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Dynamic Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to left, #24243e, #302b63, #0f0c29)",
          zIndex: 0,
        }}
      />

      {/* Decorative Orbs */}
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(248,68,100,0.15) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(40px)",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(45,55,255,0.1) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(60px)",
          zIndex: 1,
        }}
      />

      {/* Glass Card */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          background: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "24px",
          padding: "48px 60px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          width: "100%",
          maxWidth: "520px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Title
            level={1}
            style={{
              color: "#fff",
              fontSize: 32,
              fontWeight: 700,
              marginBottom: 8,
              letterSpacing: "-0.5px",
            }}
          >
            Join the Fun
          </Title>
          <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 16 }}>
            Create your account to start booking.
          </Text>
        </div>

        {actionData?.error && (
          <Alert
            message={actionData.error}
            type="error"
            showIcon
            style={{
              marginBottom: 24,
              borderRadius: 12,
              background: "rgba(255, 77, 79, 0.1)",
              borderColor: "rgba(255, 77, 79, 0.2)",
              color: "#ff4d4f",
            }}
          />
        )}

        <Form
          onFinish={onFinish}
          layout="vertical"
          size="large"
          requiredMark={false}
        >
          <Form.Item
            name="name"
            label={
              <span style={{ color: "rgba(255,255,255,0.8)" }}>Full Name</span>
            }
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input
              prefix={
                <UserOutlined style={{ color: "rgba(255,255,255,0.5)" }} />
              }
              placeholder="John Doe"
              style={{
                height: 50,
                borderRadius: 12,
                background: "rgba(0,0,0,0.2)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "white",
                fontSize: 16,
              }}
            />
          </Form.Item>

          <Form.Item
            name="email"
            label={
              <span style={{ color: "rgba(255,255,255,0.8)" }}>
                Email Address
              </span>
            }
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={
                <MailOutlined style={{ color: "rgba(255,255,255,0.5)" }} />
              }
              placeholder="name@example.com"
              style={{
                height: 50,
                borderRadius: 12,
                background: "rgba(0,0,0,0.2)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "white",
                fontSize: 16,
              }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={
              <span style={{ color: "rgba(255,255,255,0.8)" }}>Password</span>
            }
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={
                <LockOutlined style={{ color: "rgba(255,255,255,0.5)" }} />
              }
              placeholder="••••••••"
              style={{
                height: 50,
                borderRadius: 12,
                background: "rgba(0,0,0,0.2)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "white",
                fontSize: 16,
              }}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label={
              <span style={{ color: "rgba(255,255,255,0.8)" }}>
                Confirm Password
              </span>
            }
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!",
                    ),
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={
                <LockOutlined style={{ color: "rgba(255,255,255,0.5)" }} />
              }
              placeholder="••••••••"
              style={{
                height: 50,
                borderRadius: 12,
                background: "rgba(0,0,0,0.2)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "white",
                fontSize: 16,
              }}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 24, marginTop: 32 }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={isSubmitting}
              style={{
                height: 52,
                fontSize: 16,
                fontWeight: 600,
                borderRadius: 12,
                background: "linear-gradient(135deg, #F84464 0%, #FF7875 100%)",
                border: "none",
                boxShadow: "0 8px 20px rgba(248, 68, 100, 0.3)",
              }}
            >
              Sign Up
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center" }}>
            <Text style={{ color: "rgba(255,255,255,0.5)" }}>
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: "#fff",
                  fontWeight: 600,
                  textDecoration: "underline",
                }}
              >
                Sign In
              </Link>
            </Text>
          </div>
        </Form>
      </div>
    </div>
  );
};
