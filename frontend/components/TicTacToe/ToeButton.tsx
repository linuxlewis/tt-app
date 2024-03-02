import { BoardSquare } from "../../types/match";
import { ToeIcon } from "./ToeIcon";
import { Button } from "@mui/material";

const ToeButton = ({
  value,
  isDisabled,
  onClick,
}: {
  value: BoardSquare;
  isDisabled: boolean;
  onClick: () => void;
}) => {
  if (value != null) {
    return <ToeIcon value={value} />;
  } else {
    return (
      <Button
        disabled={isDisabled}
        sx={{ backgroundColor: "#eeeeee", height: "120px", width: "120px" }}
        onClick={onClick}
      >
        {" "}
      </Button>
    );
  }
};

export { ToeButton };
