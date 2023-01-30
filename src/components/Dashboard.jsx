import styled from "styled-components";
import { Responsive, WidthProvider } from "react-grid-layout";
import {ToDoChart} from "../components/TodoChart";
import {ToDoToday} from "../components/TodoToday";

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
    { i: "tasksDone", x:0, y:0, w:1, h:1 },
    { i: "tasksToday", x:0, y:0, w:1, h:1 },
    { i: "tasksCart", x:0, y:0, w:1, h:1 },
    { i: "tasksOverdue", x:0, y:0, w:1, h:1 },
    { i: "asdf5", x:0, y:0, w:1, h:1 },
    { i: "asdf6", x:0, y:0, w:1, h:1 }
];

export const Grid = () => {
    return (

        <ResponsiveGridLayout
            layouts={{lg: layout}}
            breakepoints={{ lg:1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 5, md: 4, sm: 3, xs: 2, xxs: 1}}
            rowHeight={300}
            width={1000}
        >
            <GridItemWrapper key="tasksDone">
                <GridItemContent></GridItemContent>
            </GridItemWrapper>
            <GridItemWrapper key="todoToday">
                <GridItemContent><ToDoToday/></GridItemContent>
            </GridItemWrapper>
            <GridItemWrapper key="tasksCart">
                <GridItemContent><ToDoChart/></GridItemContent>
            </GridItemWrapper>
            <GridItemWrapper key="tasksOverdue">
                <GridItemContent>asdf4</GridItemContent>
            </GridItemWrapper>
            <GridItemWrapper key="asdf5">
                <GridItemContent>asdf5</GridItemContent>
            </GridItemWrapper>
            <GridItemWrapper key="asdf6">
                 <GridItemContent>asdf6</GridItemContent>
            </GridItemWrapper>
        </ResponsiveGridLayout>
    );
};