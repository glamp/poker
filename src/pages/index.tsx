import { avatars } from "@/widgets/InputName";
import { Button, Container, Stack, Typography } from "@mui/material";
import { sample } from "lodash";
import Link from "next/link";
import * as React from "react";

const adjectives = ["fuzzy", "furry", "fluffy", "fierce", "fancy", "fickle"];
const animals = avatars.map((avatar) => avatar.name);

export default function Home() {
  const [roomLink, setRoomLink] = React.useState<string | undefined>();
  React.useEffect(() => {
    const roomId = `${sample(adjectives)}-${sample(
      animals
    )}`.toLocaleLowerCase();
    setRoomLink(`room/${roomId}`);
    for (const avatar of avatars) {
      new Image().src = avatar.avatar;
    }
  }, []);

  return (
    <Container maxWidth="sm">
      <Stack direction="column" spacing={2} alignItems="flex-start" pt={8}>
        <Typography variant="h1">Welcome to Wild Cards</Typography>

        <Link href={roomLink ?? "/"}>
          <Button variant="contained" size="large">
            {`Start Estimating`}
          </Button>
        </Link>
      </Stack>
    </Container>
  );
}
