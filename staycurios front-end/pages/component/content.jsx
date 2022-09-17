import { Layout } from "antd";
import React from "react";
const { Header, Footer, Sider, Content } = Layout;

const DetailProject = () => (
  <>
    <Layout>
      <Header></Header>
      <Content>Content</Content>
      <Layout>
        <Content>Content</Content>
        <Sider>Sider</Sider>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  </>
);

export default DetailProject;
