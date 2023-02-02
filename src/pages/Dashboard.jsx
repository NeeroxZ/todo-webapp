import styled from "styled-components";
import { Responsive, WidthProvider } from "react-grid-layout";
import 'font-awesome/css/font-awesome.min.css';
import "../styles/dashboard.css";
import {Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
const ResponsiveGridLayout = WidthProvider(Responsive);

const GridItemWrapper = styled.div`
  background: #f5f5f5;
`;

const GridItemContent = styled.div`
  padding: 8px;
`;

const Root = styled.div`
  padding: 16px;
`;

const layout = [
    { i: "asdf1", x:0, y:0, w:1, h:1 },
    { i: "asdf2", x:1, y:0, w:1, h:1 },
    { i: "asdf3", x:2, y:0, w:1, h:1 },
    { i: "asdf4", x:0, y:0, w:1, h:1 },
    { i: "asdf5", x:1, y:0, w:1, h:1 },
    { i: "asdf6", x:2, y:0, w:1, h:1 }
];




export const Dashboard = () => {
    return (
        <div className="dashBoardContainer">
            <Fab size="medium" color="primary" aria-label="add" className="addIcon">
                <AddIcon />
            </Fab>
            <ResponsiveGridLayout
            layouts={{lg: layout}}
            breakepoints={{ lg:1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 5, md: 4, sm: 3, xs: 2, xxs: 1}}
            rowHeight={300}
            width={1000}
            style={{position: "relative"}}
        >
            <GridItemWrapper key="asdf1">
                <GridItemContent>asdf1</GridItemContent>
            </GridItemWrapper>
            <GridItemWrapper key="asdf2">
                <GridItemContent>asdf2</GridItemContent>
            </GridItemWrapper>
            <GridItemWrapper key="asdf3">
                <GridItemContent>asdf3</GridItemContent>
            </GridItemWrapper>
            <GridItemWrapper key="asdf4">
                <GridItemContent>asdf4</GridItemContent>
            </GridItemWrapper>
            <GridItemWrapper key="asdf5">
                <GridItemContent>asdf5</GridItemContent>
            </GridItemWrapper>
            <GridItemWrapper key="asdf6">
                <GridItemContent>asdf6</GridItemContent>
            </GridItemWrapper>
        </ResponsiveGridLayout>

        </div>
    );
};