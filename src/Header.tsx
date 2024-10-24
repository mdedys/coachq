import { spacing } from "@mdedys/ui-kit/styles";
import { styled } from "styled-components";

import Logo from "./Logo";

const Container = styled.div`
  grid-column: 1 / -1;

  padding: ${spacing.xl.rem} 0;
`;

export default function Header() {
  return (
    <Container>
      <Logo height="40" width="180" />
    </Container>
  );
}
