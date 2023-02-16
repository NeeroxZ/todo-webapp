import { Responsive, WidthProvider } from "react-grid-layout";


const ResponsiveGridLayout = WidthProvider(Responsive);

const layout = [
    { i: "blue-eyes-dragon", x: 0, y: 0, w: 1, h: 1 },
    { i: "dark-magician", x: 1, y: 0, w: 1, h: 1 },
    { i: "kuriboh", x: 2, y: 0, w: 1, h: 1 },
    { i: "spell-caster", x: 3, y: 0, w: 1, h: 1 },
    { i: "summoned-skull", x: 4, y: 0, w: 1, h: 1 }
];

const getLayouts = () => {
    const savedLayouts = localStorage.getItem("grid-layout");

    return savedLayouts ? JSON.parse(savedLayouts) : { lg: layout };
};
// styled-components definition removed for brevity...
export const Test = () => {
    const handleLayoutChange = (layout, layouts) => {
        localStorage.setItem("grid-layout", JSON.stringify(layouts));
    };

    return (
            <ResponsiveGridLayout
                layouts={getLayouts()}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 5, md: 4, sm: 3, xs: 2, xxs: 1 }}
                rowHeight={300}
                width={1000}
                onLayoutChange={handleLayoutChange}
            >
                <div key="blue-eyes-dragon">
                    <p>Blue Eyes Dragon</p>
                </div>
                <div key="dark-magician">
                    <p>Dark Magician</p>
                </div>
                <div key="kuriboh">
                    <p>Kuriboh</p>
                </div>
                <div key="spell-caster">
                    <p>Spell Caster</p>
                </div>
                <div key="summoned-skull">
                    <p>Summoned Skull</p>
                </div>
            </ResponsiveGridLayout>
    );
};
