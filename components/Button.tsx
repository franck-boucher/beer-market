import { styled } from "../stitches.config";

const Button = styled("button", {
  backgroundColor: "white",
  border: "1px solid #ccc",
  borderRadius: "0.25rem",
  padding: "0.5rem 1rem",
  fontSize: "1rem",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#eee",
  },
  width: "100%",
});

export default Button;
