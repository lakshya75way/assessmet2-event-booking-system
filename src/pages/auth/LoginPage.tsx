import React from "react";
import { Form, Input, Typography, Button, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {
  useNavigation,
  useActionData,
  Link,
  useSubmit,
} from "react-router-dom";
import { loginSchema } from "../../schemas/auth.schema";
import { z } from "zod";

const { Title, Text } = Typography;

type LoginInput = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const submit = useSubmit();
  const actionData = useActionData() as { error?: string } | undefined;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const onFinish = (values: LoginInput) => {
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
          background: "linear-gradient(to right, #24243e, #302b63, #0f0c29)",
          zIndex: 0,
        }}
      />

      {/* Decorative Orbs */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(248,68,100,0.2) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(40px)",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          right: "-10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(45,55,255,0.15) 0%, rgba(0,0,0,0) 70%)",
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
          padding: "60px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          width: "100%",
          maxWidth: "480px",
          animation: "fadeIn 0.6s ease-out",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 40 }}>
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
            Welcome Back
          </Title>
          <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 16 }}>
            Enter your credentials to access your account.
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
            name="email"
            label={
              <span style={{ color: "rgba(255,255,255,0.8)" }}>
                Email Address
              </span>
            }
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input
              prefix={
                <UserOutlined style={{ color: "rgba(255,255,255,0.5)" }} />
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <span style={{ color: "rgba(255,255,255,0.8)" }}>Password</span>
                <Link
                  to="/forgot-password"
                  style={{
                    color: "#F84464",
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  Forgot Password?
                </Link>
              </div>
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
              Sign In
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center" }}>
            <Text style={{ color: "rgba(255,255,255,0.5)" }}>
              Don't have an account?{" "}
              <Link
                to="/register"
                style={{
                  color: "#fff",
                  fontWeight: 600,
                  textDecoration: "underline",
                }}
              >
                Create Account
              </Link>
            </Text>
          </div>
        </Form>

        <div
          style={{
            marginTop: 40,
            paddingTop: 20,
            borderTop: "1px solid rgba(255,255,255,0.1)",
            textAlign: "center",
          }}
        >
          <Text style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>
            Demo: user@example.com / password123
          </Text>
        </div>
      </div>
    </div>
  );
};
