import { Grid } from "@mdedys/ui-kit/layout";
import { spacing } from "@mdedys/ui-kit/styles";
import { cssvar, ThemeProvider, vars } from "@mdedys/ui-kit/theme";
import { Typography } from "@mdedys/ui-kit/typography";
import { useState } from "react";
import { styled } from "styled-components";

import BarbellWeights from "./BarbellWeights";
import Header from "./Header";
import OneRepMax from "./OneRepMax";

const TabsContainer = styled.div`
  display: flex;
  grid-column: 1 / -1;

  border-bottom: 1px solid ${cssvar(vars.colors.border.secondary)};
`;

const Tab = styled.div<{ $active?: boolean }>`
  border-bottom: ${props =>
    props.$active
      ? `2px solid ${cssvar(vars.colors.foreground.brand.alt)}`
      : "none"};
  color: ${props =>
    props.$active
      ? cssvar(vars.colors.text.brand.secondary)
      : cssvar(vars.colors.text.quaternary.main)};
  cursor: pointer;
  flex: 50%;
  text-align: center;
`;

const TabText = styled(Typography).attrs({
  variant: "text",
  size: "sm",
  weight: "600",
})`
  margin-bottom: ${spacing.lg.rem};
`;

function App() {
  const [tab, setTab] = useState(0);

  return (
    <>
      <ThemeProvider
        theme="light"
        brand={{
          25: "#FFBCBC",
          50: "#FFA6A6",
          100: "#FF7A7A",
          200: "#FF6363",
          300: "#FF4D4D",
          400: "#FF2121",
          500: "#FF0B0B",
          600: "#F30000",
          700: "#C60000",
          800: "#AA0000",
          900: "#8E0000",
          950: "#720000",
        }}
      />
      <Grid>
        <Header />
        <TabsContainer>
          <Tab $active={tab === 0} onClick={() => setTab(0)}>
            <TabText>1 Rep Max</TabText>
          </Tab>
          <Tab $active={tab === 1} onClick={() => setTab(1)}>
            <TabText>Barbell Weights</TabText>
          </Tab>
        </TabsContainer>
        {tab === 0 ? <OneRepMax /> : <BarbellWeights />}
      </Grid>
    </>
  );
}

export default App;
