import React from "react";
import { Card, Skeleton, Row, Col } from "antd";

interface LoadingSkeletonProps {
  count?: number;
  rows?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  count = 4,
  rows = 2,
}) => {
  return (
    <Row gutter={[32, 32]}>
      {Array.from({ length: count }).map((_, i) => (
        <Col xs={24} sm={12} lg={8} xl={6} key={i}>
          <Card
            cover={
              <Skeleton.Button active style={{ height: 380, width: "100%" }} />
            }
            style={{ borderRadius: 16 }}
          >
            <Skeleton active paragraph={{ rows }} title={{ width: "80%" }} />
          </Card>
        </Col>
      ))}
    </Row>
  );
};
