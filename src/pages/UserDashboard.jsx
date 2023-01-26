import GridLayout from "react-grid-layout";
import styled from "styled-components";
import { Responsive, WidthProvider } from "react-grid-layout";

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
    { i: "asdf2", x:0, y:0, w:1, h:1 },
    { i: "asdf3", x:0, y:0, w:1, h:1 },
    { i: "asdf4", x:0, y:0, w:1, h:1 },
    { i: "asdf5", x:0, y:0, w:1, h:1 },
    { i: "asdf6", x:0, y:0, w:1, h:1 }
];


export const Grid = () => {
    return (
        <Root>
            <ResponsiveGridLayout
                layouts={{lg: layout}}
                breakepoints={{ lg:1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 5, md: 4, sm: 3, xs: 2, xxs: 1}}
                rowHeight={300}
                width={1000}
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
                    <GridItemContenr>asdf6</GridItemContenr>
                </GridItemWrapper>
            </ResponsiveGridLayout>
        </Root>
    );
};