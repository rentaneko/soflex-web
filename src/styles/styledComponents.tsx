import { alpha, styled } from "@mui/material/styles";
import { InputBase } from "@mui/material";

// Styled search component with hover effect and responsive width
export const Search = styled( "div" )( ( { theme } ) => ( {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha( theme.palette.common.white, 0.15 ),
    "&:hover": {
        backgroundColor: alpha( theme.palette.common.white, 0.25 ),
    },
    marginRight: theme.spacing( 2 ),
    marginLeft: 0,
    width: "70%",
    [theme.breakpoints.up( "sm" )]: {
        marginLeft: theme.spacing( 3 ),
        width: "auto",
    },
} ) );

// Wrapper for search icon with absolute positioning
export const SearchIconWrapper = styled( "div" )( ( { theme } ) => ( {
    padding: theme.spacing( 0, 2 ),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
} ) );

// Custom styled input base for search field
export const StyledInputBase = styled( InputBase )( ( { theme } ) => ( {
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing( 1, 1, 1, 0 ),
        paddingLeft: `calc(1em + ${ theme.spacing( 4 ) })`,
        transition: theme.transitions.create( "width" ),
        width: "100%",
        [theme.breakpoints.up( "md" )]: {
            width: "20ch",
        },
    },
} ) ); 