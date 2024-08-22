import { Container, Paper, Title } from "@mantine/core";
import Join from "../../components/pages/home/Join";

export default function PageHome() {
  return (
    <Container size={420} my={40}>
      <Title ta="center">
        Entre e converse!
      </Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Join />
      </Paper>
    </Container>
  );
}
