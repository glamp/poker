import { Box, Card, Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

const FlipCard = styled(Card)({
  width: "50px",
  height: "75px",
  transformStyle: "preserve-3d",
  transition: "transform 0.5s",
});

type Props = {
  text?: string;
  selectable?: boolean;
  selected?: boolean;
  onClick?: () => void;
  isFlipped: boolean;
};

export const PlayingCard: React.FC<Props> = ({
  text = "100",
  selectable = false,
  selected = false,
  isFlipped = true,
  onClick,
}) => {
  return (
    <div
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      <FlipCard
        style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {isFlipped ? (
          <Box
            width="100%"
            height="100%"
            sx={{
              backgroundImage: `url(/card-back.png)`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
        ) : (
          <Stack
            direction="column"
            width="100%"
            height="100%"
            justifyContent="center"
            alignItems="center"
            sx={{
              borderWidth: selected ? 4 : 0,
              borderColor: "primary.main",
              borderStyle: "solid",
              "&:hover": {
                cursor: selectable ? "pointer" : "default",
              },
            }}
          >
            <Typography variant="inherit" fontWeight="bold">
              {text}
            </Typography>
          </Stack>
        )}
      </FlipCard>
    </div>
  );
};
