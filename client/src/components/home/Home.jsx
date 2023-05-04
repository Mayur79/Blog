// import Banner from "../banner/Banner";
// import Categories from "./Categories";
// import Posts from "./post/Posts.jsx";

// const Home = () => {
//     return (
//         <div style={{ display: "flex", flexDirection: "column" }}>
//             <Banner />
//             <Categories />
//             <div style={{ display: "flex" }}>
//                 <Posts />
//             </div>
//         </div>
//     );
// };

// export default Home;





import { Grid } from "@mui/material";
import Banner from "../banner/Banner";
import Categories from "./Categories";
import Posts from "./post/Posts.jsx";
const Home = () => {
    return (
        <>
            <Banner />
            <Categories />
            <Grid container>
                {/* <Grid item lg={2} sm={2} xs={12} >
                </Grid> */}
                <Grid container item xs={12} sm={10} lg={10} style={{ marginLeft: 20 }}>
                    <Posts />
                </Grid>
            </Grid>
        </>
    )
}
export default Home;