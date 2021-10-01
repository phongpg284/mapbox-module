import { Layout } from "antd";
const { Header, Content, Footer } = Layout;

const LayoutWrapper = (props: any) => {
  return (
    <Layout>
      <Header>{props?.header}</Header>
      <Content>{props.children}</Content>
      <Footer>{props?.footer}</Footer>
    </Layout>
  );
};

export default LayoutWrapper;
