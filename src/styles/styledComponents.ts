import { styled, alpha } from "@mui/material/styles";
import { InputBase } from "@mui/material";

export const Search = styled( "div" )( ( { theme } ) => ( {
    position: "relative",
    borderRadius: "24px",
    backgroundColor: alpha( theme.palette.common.white, 0.15 ),
    "&:hover": {
        backgroundColor: alpha( theme.palette.common.white, 0.25 ),
    },
    marginRight: theme.spacing( 2 ),
    marginLeft: 0,
    width: "100%",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    backdropFilter: "blur(4px)",
    [theme.breakpoints.up( "sm" )]: {
        marginLeft: theme.spacing( 3 ),
        width: "auto",
    },
} ) );

export const SearchIconWrapper = styled( "div" )( ( { theme } ) => ( {
    padding: theme.spacing( 0, 2 ),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: alpha( theme.palette.common.white, 0.9 ),
} ) );

export const StyledInputBase = styled( InputBase )( ( { theme } ) => ( {
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
        padding: theme.spacing( 1.5, 1, 1.5, 0 ),
        paddingLeft: `calc(1em + ${ theme.spacing( 4 ) })`,
        transition: theme.transitions.create( "width" ),
        width: "100%",
        fontSize: "1rem",
        "&::placeholder": {
            color: alpha( theme.palette.common.white, 0.8 ),
            opacity: 1,
        },
    },
} ) ); 