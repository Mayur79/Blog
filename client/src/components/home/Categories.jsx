import { Button, styled } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import { categories } from "../../constants/data";
import { useState } from "react";

const StyledButton = styled(Button)`
    margin: 20px;
    width: 100%;
    max-width: 200px;
    background: #6495ED;
    color: #ffffff;
`;

const StyledLinked = styled(Link)`
    text-decoration: none;
    color: inherit;    
`;

const StyledList = styled('ul')`
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: flex-end;
    margin-right:25px;
`;

const StyledListItem = styled('li')`
    margin-bottom: 10px;
    margin-left: 20px;
`;

const Container = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
`;

const Categories = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    return (
        <Container>
            <StyledLinked to={`/create?category=${category || " "}`}>
                <StyledButton variant="contained">Create Blog</StyledButton>
            </StyledLinked>

            <StyledList>
                <StyledListItem>
                    <StyledLinked to='/'>All Categories</StyledLinked>
                </StyledListItem>

                {categories.map(category => (
                    <StyledListItem key={category.id}>
                        <StyledLinked to={`/?category=${category.type}`}>
                            {category.type}
                        </StyledLinked>
                    </StyledListItem>
                ))}
            </StyledList>
        </Container>
    );
};

export default Categories;




// import { Button, Table, TableBody, TableCell, TableHead, TableRow, styled } from "@mui/material";
// import { Link, useSearchParams } from "react-router-dom";
// import { categories } from "../../constants/data";
// import { useState } from "react";

// const StyledTable = styled(Table)`
//     // border: 1px solid rgba(224, 224, 224, 1);
// `;

// const StyledButton = styled(Button)`
//     margin:20px;
//     width:85%;
//     background:#6495ED;
//     color:#ffffff;
// `
// const StyledLinked = styled(Link)`
//     text-decoration:none;
//     color:inherit;
// `
// const StyledTableCell = styled(TableCell)`
//   border-bottom: none;
// `;

// const Categories = () => {
//     const [searchParams] = useSearchParams();
//     const category = searchParams.get('category');
//     return (

//         <>
//             <StyledLinked to={`/create?category=${category || " "}`}>
//                 <StyledButton variant="contained">Create Blog</StyledButton>
//             </StyledLinked>
//             <StyledTable>
//                 <TableHead>
//                     <TableRow>
//                         <TableCell style={{ borderBottom: "none" }}>
//                             <StyledLinked to='/'>
//                                 All Categories
//                             </StyledLinked>
//                         </TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {
//                         categories.map(category => (
//                             <TableRow key={category.id}>
//                                 <StyledTableCell>
//                                     <StyledLinked to={`/?category=${category.type}`}>
//                                         {category.type}
//                                     </StyledLinked>
//                                 </StyledTableCell>
//                             </TableRow>
//                         ))
//                     }
//                 </TableBody>
//             </StyledTable>
//         </>
//     )
// }
// export default Categories;