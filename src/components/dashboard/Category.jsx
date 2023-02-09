
export const Category = () => {
    return (

        <div className="dash-box">

            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" data-interval="false">
                <h3 className="title">Category</h3>

                <a href="#" className="align-left add-category">
                    <i className="fas fa-plus"></i>
                    Add category
                </a>
                <div className="carousel-inner">
                    <div id="daily" className="carousel-item active">
                        <ul>
                            <li className="liste">
                                <div className="icon-wrapper"><i className="fas fa-utensils"></i></div>
                                <div>Food</div>
                                <div className="align-right cash-font-md outflow-font" data-target="25"></div>
                            </li>
                            <li className="liste">
                                <div className="icon-wrapper" ><i className="fas fa-car-alt"></i></div>
                                <div>Transport</div>
                                <div className="align-right cash-font-md outflow-font" data-target="25"></div>
                            </li>
                            <li className="liste">
                                <div className="icon-wrapper" ><i className="fas fa-tshirt"></i></div>
                                <div>Clothes</div>
                                <div className="align-right cash-font-md outflow-font" data-target="25"></div>
                            </li>
                            <li className="liste">
                                <div className="icon-wrapper" ><i className="fas fa-glass-cheers"></i></div>
                                <div className="expense-name">Leisure</div>
                                <div className="align-right cash-font-md outflow-font" data-target="35"></div>
                            </li>
                            <li className="liste">
                                <div className="icon-wrapper" ><i className="fas fa-shopping-cart"></i></div>
                                <div>Groceries</div>
                                <div className="align-right cash-font-md outflow-font" data-target="50"></div>
                            </li>
                            <li className="liste">
                                <div className="icon-wrapper" ><i className="fas fa-briefcase"></i></div>
                                <div>Business</div>
                                <div className="align-right cash-font-md inflow-font" data-target="34"></div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    );
};