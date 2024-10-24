import { Button } from "@mdedys/ui-kit/button";
import { Divider } from "@mdedys/ui-kit/divider";
import { spacing } from "@mdedys/ui-kit/styles";
import { Textfield } from "@mdedys/ui-kit/textfield";
import { Typography } from "@mdedys/ui-kit/typography";
import { FormEvent, useState } from "react";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xl.rem};
  grid-column: 1 / -1;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md.px};
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md.px};
`;

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

type Plate = { weight: number; count: number };

const LB_PLATES = [45, 35, 25, 15, 10, 5, 2.5];

function getMaxPossibleFit(weight: number, plate: number) {
  const count = Math.floor(weight / plate);
  if (count % 2 === 0) {
    return count;
  }
  return count - 1;
}

function getPlates(weight: number, barWeight: number) {
  const rounded = roundWeight(weight);

  let leftover = rounded - barWeight;

  return LB_PLATES.map<Plate>(plate => {
    if (leftover < 0) {
      return { weight: plate, count: 0 };
    }

    const count = getMaxPossibleFit(leftover, plate);

    if (count % 2 === 0) {
      leftover = leftover - plate * count;
      return { weight: plate, count };
    }

    return { weight: plate, count: 0 };
  });
}

export default function BarbellWeights() {
  const [barbell, setBarbell] = useState("45");
  const [totalWeight, setTotalWeight] = useState("");
  const [plates, setPlates] = useState<Plate[]>([]);

  const onClickSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    setPlates(getPlates(parseInt(totalWeight), parseInt(barbell)));
    return false;
  };

  return (
    <Container>
      <Form onSubmit={onClickSubmit}>
        <InputGroup>
          <Textfield
            type="number"
            label="Barbell Weight (lbs)"
            value={barbell}
            style={{ textAlign: "center" }}
            onChange={evt => setBarbell(evt.target.value)}
          />
          <Textfield
            type="number"
            label="Total Weight (lbs)"
            value={totalWeight}
            style={{ textAlign: "center" }}
            onChange={evt => setTotalWeight(evt.target.value)}
          />
        </InputGroup>
        <Button type="submit">Get Weights</Button>
      </Form>

      <Divider />

      <Typography variant="text" size="lg" weight="700">
        Barbell Setup
      </Typography>

      {plates
        .filter(f => f.count > 0)
        .map(p => (
          <div>
            {p.weight} lbs x {p.count}
          </div>
        ))}
    </Container>
  );
}
