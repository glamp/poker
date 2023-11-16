import { uniqBy } from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";
import { Round } from "../../room/[id]";

const round: Round = {
  estimate: 0,
  players: [
    {
      name: "Bob",
      avatar: "/avatars/bighorn-sheep.png",
    },
    {
      name: "Tony",
      avatar: "/avatars/pig.png",
    },
    {
      name: "Charles",
      avatar: "/avatars/elephant.png",
    },
    {
      name: "Charlotte",
      avatar: "/avatars/redpanda.png",
    },
  ],
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Round>
) {
  if (req.method === "GET") {
    res.status(200).json(round);
  } else {
    round.players = uniqBy([...round.players, req.body.player], "name");

    res.status(200).end().json(round);
  }
}
