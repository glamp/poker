import { Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import * as React from "react";

export default function Home() {
  const [roomLink, setRoomLink] = React.useState<string | undefined>();
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const roomId = "purple-panda";
      setRoomLink(`room/${roomId}`);
    }
  }, []);

  return (
    <Container maxWidth="sm">
      <Stack direction="column" spacing={2} alignItems="flex-start">
        <Typography variant="h1">Welcome to Planning Pokerist</Typography>

        <Link href={roomLink ?? "/"}>
          <Button variant="contained" size="large">
            Create a new room
          </Button>
        </Link>
      </Stack>
    </Container>
  );
}
