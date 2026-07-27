import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import NextLink from "next/link";
import type LinkCardData from "@/app/components/link-card-data";

interface CardItemProps {
  item: LinkCardData;
  titleSpacing: number;
}

export default function CardItem({ item, titleSpacing }: CardItemProps) {
  const Icon = item.icon;
  const actionAreaSx = {
    display: "block",
    textAlign: "left",
    color: "inherit",
    p: 0,
  };
  const cardContent = (
    <CardContent>
      <Typography variant="h6" sx={{ mb: titleSpacing }}>
        {Icon ? (
          <Icon fontSize="small" sx={{ mr: 1, verticalAlign: "text-bottom" }} />
        ) : null}
        {item.title}
      </Typography>
      <Typography variant="body2">{item.body}</Typography>
    </CardContent>
  );

  return (
    <Grid key={item.id} size={{ xs: 12, sm: 6, lg: 4 }}>
      <Card
        sx={{
          color: item.color ?? "text.primary",
          borderColor: item.color ?? "divider",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          "&:hover, &:focus-within": {
            transform: "translateY(-4px)",
            boxShadow: 6,
          },
        }}
      >
        {item.isExternal ? (
          <CardActionArea
            component="a"
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            sx={actionAreaSx}
          >
            {cardContent}
          </CardActionArea>
        ) : (
          <NextLink
            href={item.href}
            style={{
              display: "block",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <CardActionArea component="div" sx={actionAreaSx}>
              {cardContent}
            </CardActionArea>
          </NextLink>
        )}
      </Card>
    </Grid>
  );
}
