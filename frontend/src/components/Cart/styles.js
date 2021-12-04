import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    // backgroundColor: "red",
    color: (props) => props.color,
  },
});

export default useStyles;
