import { InputName } from "@/widgets/InputName";
import { Player, PlayerPresenter } from "@/widgets/Player";
import { PlayingCard } from "@/widgets/PlayingCard";
import {
  Button,
  Container,
  Dialog,
  DialogContent,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import * as React from "react";
import { useAsync, useInterval } from "react-use";
import { Fetcher } from "swr";

const fetcher: Fetcher<Round, string> = async (url) => {
  return (await (await fetch(url)).json()) as Round;
};

export type Round = {
  estimate: number;
  players: Player[];
};

const Room: React.FC = () => {
  //   const [player, setPlayer] = useLocalStorage<Player | undefined>(
  //     "player",
  //     undefined
  //   );
  const router = useRouter();
  const roomId = router.query.id as string;
  const leaderName = "Greg";
  const [player, setPlayer] = React.useState<Player>({
    name: "Greg",
    avatar: "/avatars/bighorn-sheep.png",
  });
  const [estimate, setEstimate] = React.useState<number | undefined>();
  const [count, setCount] = React.useState(3);
  const [isActive, setIsActive] = React.useState(false);
  const [reveal, setReveal] = React.useState(false);
  const [round, setRound] = React.useState<Round | undefined>();

  useAsync(async () => {
    if (!player) {
      return;
    }
    fetch(`/api/room/${roomId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        player,
      }),
    });
  }, [player]);

  useAsync(async () => {
    if (!player || !estimate) {
      return;
    }
    fetch(`/api/room/${roomId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        player: {
          ...player,
          estimate,
        },
      }),
    });
  }, [estimate]);

  useInterval(async () => {
    const round = await (await fetch(`/api/room/${roomId}`)).json();
    setRound(round);
  }, 1000);

  React.useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;

    if (isActive && count > 0) {
      timerId = setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    } else if (count === 0) {
      setIsActive(false); // Reset to initial state when countdown finishes
      setReveal(true);
    }

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [count, isActive]);

  const startCountdown = () => {
    setIsActive(true);
  };

  if (!round) {
    return (
      <Container maxWidth="lg">
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          height="80vh"
        >
          <Typography>Loading...</Typography>
        </Stack>
      </Container>
    );
  }

  const { players } = round;

  return (
    <Container maxWidth="lg">
      <Stack direction="column" spacing={2}>
        {!player && (
          <InputName onComplete={(newPlayer) => setPlayer(newPlayer)} />
        )}
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          justifyContent="center"
          useFlexGap
          flexWrap="wrap"
          p={2}
          sx={{ width: "100%" }}
        >
          {players.map((p, index) => (
            <PlayerPresenter
              key={index}
              {...p}
              isLeader={leaderName === p.name}
              isMe={p.name === player?.name}
              reveal={!reveal}
            />
          ))}
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="center">
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

        <Dialog open={isActive}>
          <DialogContent sx={{ p: 4 }}>
            {count > 0 ? count : "Reveal!"}
          </DialogContent>
        </Dialog>

        {leaderName === player?.name && (
          <Stack direction="column" alignItems="center">
            <Button
              size="large"
              onClick={startCountdown}
              disabled={isActive}
              variant="contained"
            >
              Reveal
            </Button>
          </Stack>
        )}
      </Stack>
    </Container>
  );
};

export default Room;
