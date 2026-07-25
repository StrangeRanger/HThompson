import Typography from "@mui/material/Typography";
import type { TypographyProps } from "@mui/material/Typography";

export function Header1({ children, sx, ...props }: TypographyProps<"h1">) {
  return (
    <Typography
      {...props}
      component="h1"
      variant="h3"
      sx={[
        { mb: 3, textWrap: "balance" },
        ...(sx ? (Array.isArray(sx) ? sx : [sx]) : []),
      ]}
    >
      {children}
    </Typography>
  );
}

export function Header2({ children, sx, ...props }: TypographyProps<"h2">) {
  return (
    <Typography
      {...props}
      component="h2"
      variant="h4"
      sx={[{ mt: 6, mb: 2 }, ...(sx ? (Array.isArray(sx) ? sx : [sx]) : [])]}
    >
      {children}
    </Typography>
  );
}

export function Header3({ children, sx, ...props }: TypographyProps<"h3">) {
  return (
    <Typography
      {...props}
      component="h3"
      variant="h5"
      sx={[{ mt: 4, mb: 2 }, ...(sx ? (Array.isArray(sx) ? sx : [sx]) : [])]}
    >
      {children}
    </Typography>
  );
}

export function Paragraph({ children, sx, ...props }: TypographyProps<"p">) {
  return (
    <Typography
      {...props}
      component="p"
      variant="body1"
      sx={[{ mb: 2 }, ...(sx ? (Array.isArray(sx) ? sx : [sx]) : [])]}
    >
      {children}
    </Typography>
  );
}
