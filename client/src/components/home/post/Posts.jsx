import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import API from '../../../service/api';
import Post from "./Post";
import { useSearchParams, Link } from "react-router-dom";
const Posts = () => {

    const [posts, setPosts] = useState([]);
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getAllPosts({ category: category || "" });
            if (response.isSuccess) {
                setPosts(response.data);
            }
        }
        fetchData();
    }, [category])
    return (
        <Box sx={{ mt: 3 }}>
            <Grid container spacing={3}>
                {posts && posts.length > 0 ? (
                    posts.map((post) => (
                        <Grid item xs={12} sm={6} md={4} key={post._id}>
                            <Link to={`details/${post._id}`} style={{ textDecoration: 'none' }}>
                                <Post post={post} />
                            </Link>
                        </Grid>
                    ))
                ) : (
                    <Box sx={{ color: 'blue', margin: '30px 80px', fontSize: 18 }}>
                        No data available to display
                    </Box>
                )}
            </Grid>
        </Box>

    )
}
export default Posts;