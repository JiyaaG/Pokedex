import { Card, CardContent, Typography, Avatar, Stack } from "@mui/material";

type Props = {
  id: number;
  name: string;
  types: string[];
  sprite: string;
};

export default function PokemonRow({ id, name, types, sprite }: Props) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar src={sprite} alt={name} sx={{ width: 56, height: 56 }} />
          <div>
            <Typography variant="h6">
              #{id} - {name}
            </Typography>
            <Typography color="text.secondary">{types.join(", ")}</Typography>
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
}
