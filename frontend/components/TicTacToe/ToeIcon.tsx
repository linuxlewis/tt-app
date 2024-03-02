import { Box } from "@mui/material";
import { BoardSquare } from "../../types/match";
import { Close, RadioButtonUnchecked } from "@mui/icons-material";

const ToeIcon = ({ value }: { value: BoardSquare }) => {
  const styles = {
    width: "120px",
    height: "120px",
    fontSize: "120px",
  };
  if (value == 1) {
    return (
      <Box sx={styles}>
        <Close fontSize="inherit" />
      </Box>
    );
  } else {
    return (
      <Box sx={styles}>
        <RadioButtonUnchecked fontSize="inherit" />
      </Box>
    );
  }
};

export { ToeIcon };
