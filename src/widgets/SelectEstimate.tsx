import { PlayingCard } from "./PlayingCard";
import { Stack } from "@mui/material";

export const SelectEstimate: React.FC<{
  estimate: number | undefined;
  setEstimate: (estimate: number) => void;
}> = ({ estimate, setEstimate }) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="center"
      useFlexGap
      flexWrap="wrap"
      sx={{
        p: { xs: 2, sm: 0 },
      }}
    >
      <PlayingCard
        onClick={() => setEstimate(10)}
        selected={estimate === 10}
        selectable
        isFlipped={false}
        text={"10"}
      />
      <PlayingCard
        onClick={() => setEstimate(20)}
        selected={estimate === 20}
        selectable
        isFlipped={false}
        text={"20"}
      />
      <PlayingCard
        onClick={() => setEstimate(40)}
        selected={estimate === 40}
        selectable
        isFlipped={false}
        text={"40"}
      />
      <PlayingCard
        onClick={() => setEstimate(60)}
        selected={estimate === 60}
        selectable
        isFlipped={false}
        text={"60"}
      />
      <PlayingCard
        onClick={() => setEstimate(80)}
        selected={estimate === 80}
        selectable
        isFlipped={false}
        text={"80"}
      />
      <PlayingCard
        onClick={() => setEstimate(120)}
        selected={estimate === 120}
        selectable
        isFlipped={false}
        text={"120"}
      />
      <PlayingCard
        onClick={() => setEstimate(180)}
        selected={estimate === 180}
        selectable
        isFlipped={false}
        text={"180"}
      />
      <PlayingCard
        onClick={() => setEstimate(240)}
        selected={estimate === 240}
        selectable
        isFlipped={false}
        text={"240"}
      />
      <PlayingCard
        onClick={() => setEstimate(480)}
        selected={estimate === 480}
        selectable
        isFlipped={false}
        text={"480"}
      />
    </Stack>
  );
};

export default SelectEstimate;
