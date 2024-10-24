import { Button } from "@mdedys/ui-kit/button";
import { Divider } from "@mdedys/ui-kit/divider";
import { Icon } from "@mdedys/ui-kit/icons";
import { border, shadows, spacing } from "@mdedys/ui-kit/styles";
import { Textfield } from "@mdedys/ui-kit/textfield";
import { cssvar, vars } from "@mdedys/ui-kit/theme";
import { Typography } from "@mdedys/ui-kit/typography";
import { FormEvent, useState } from "react";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xl.rem};
  grid-column: 1 / -1;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md.px};
`;

const PercentageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Percentage = styled.div`
  flex: 0 1 20%;

  border: 1px solid ${cssvar(vars.colors.border.brandsolid)};
  border-right: none;
  text-align: center;

  &:nth-child(n + 6) {
    border-top: none;
  }

  &:nth-child(5n + 5) {
    border-right: 1px solid ${cssvar(vars.colors.border.brandsolid)};
  }
`;

const Label = styled.div`
  background-color: ${cssvar(vars.colors.background.brand.main)};
  border-bottom: 1px solid ${cssvar(vars.colors.border.brandsolid)};
  color: ${cssvar(vars.colors.text.primary.main)};

  padding: ${spacing.xs.rem};
`;

const Value = styled.div`
  padding: ${spacing.xs.rem};
`;

const Alert = styled.div`
  background-color: ${cssvar(vars.colors.background.primary.alt)};
  border: 1px solid ${cssvar(vars.colors.border.primary)};
  border-radius: ${border.xl};
  box-shadow: ${shadows.xs};

  padding: ${spacing.xl.px};
`;

const AlertContent = styled.div`
  display: flex;
  gap: ${spacing.xl.px};
`;

const AlertTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs.rem};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md.px};
`;

function calculateOneRepMax(reps: number, weight: number) {
  return weight / (37 / 36 - reps / 36);
}

function roundWeight(weight: number) {
  const rounded = Math.ceil(weight);

  const strRounded = rounded.toString();
  const lastDigit = parseInt(strRounded[strRounded.length - 1], 10);

  if (lastDigit % 5 === 0) {
    return rounded;
  }

  if ((lastDigit >= 3 && lastDigit < 5) || lastDigit >= 8) {
    return Math.ceil(weight / 5) * 5;
  }

  return Math.floor(weight / 5) * 5;
}

function getWeightPercentages(max: number) {
  return [50, 55, 60, 65, 70, 75, 80, 85, 90, 95].map(percentage => [
    percentage,
    roundWeight(max * (percentage / 100)),
  ]);
}

export default function OneRepMax() {
  const [reps, setReps] = useState("0");
  const [weight, setWeight] = useState("0");
  const [oneRepMax, setOneRepMax] = useState(0);

  function onClickCalculate(evt: FormEvent) {
    evt.preventDefault();
    const oneRep = calculateOneRepMax(parseInt(reps), parseInt(weight));
    const rounded = roundWeight(oneRep);
    setOneRepMax(rounded);
    return false;
  }

  const percentages = getWeightPercentages(oneRepMax);

  return (
    <Container>
      <Typography variant="text" size="md">
        Workout asks for a percentage of 1 rep max? Quickly approximate your 1
        rep max to get the most out of your workout.
      </Typography>

      <Form onSubmit={onClickCalculate}>
        <InputGroup>
          <Textfield
            type="number"
            placeholder="0"
            label="Rep Count"
            style={{ textAlign: "center" }}
            value={reps}
            onChange={evt => setReps(evt.target.value)}
          />
          <Textfield
            type="number"
            placeholder="0"
            label="Weight (lbs)"
            style={{ textAlign: "center" }}
            value={weight}
            onChange={evt => setWeight(evt.target.value)}
          />
        </InputGroup>
        <Button type="submit">Calculate</Button>
      </Form>

      {oneRepMax > 0 && (
        <>
          <Divider />

          <PercentageContainer>
            {percentages.map(p => (
              <Percentage>
                <Label>
                  <Typography variant="text" size="sm" weight="700">
                    {p[0]}
                  </Typography>
                </Label>
                <Value>
                  <Typography variant="text" size="sm">
                    {p[1]}
                  </Typography>
                </Value>
              </Percentage>
            ))}
          </PercentageContainer>

          <Alert>
            <AlertContent>
              <Icon
                name="info-circle"
                style={{
                  flex: "0 0 20px",
                  color: cssvar(vars.colors.foreground.warning.secondary),
                }}
              />
              <AlertTextContainer>
                <Typography variant="text" weight="700" size="sm">
                  1 Rep Max is an estimate
                </Typography>
                <Typography variant="text" size="sm">
                  Please use this as a guide as you build up weight.
                </Typography>
              </AlertTextContainer>
            </AlertContent>
          </Alert>
        </>
      )}
    </Container>
  );
}
