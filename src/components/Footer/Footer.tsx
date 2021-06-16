import Box from "@material-ui/core/Box";
import { useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const Footer = () => {
  const theme = useTheme();
  return (
    <Box
      minHeight={60}
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      }}
    >
      <Typography>Blog - 2021</Typography>
    </Box>
  );
};

export default Footer;
