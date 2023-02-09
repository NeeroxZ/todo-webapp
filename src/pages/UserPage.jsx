
export const UserPage = () => {
    return(
        <div className="containerUser">
            <div>
                <div className="userDiv">
                    <div
                        className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-12 col-xs-12 edit_information">
                            <h3 className="text-center">Edit Personal Information</h3>
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div className="form-group">
                                        <label className="profile_details_text">Username:</label>
                                        <input type="text" name="first_name" className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div className="form-group">
                                        <label className="profile_details_text">Last Name: </label>
                                        <input type="text" name="last_name" className="form-control"  ></input>
                                    </div>
                                </div>
                            </div>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div className="form-group">
                                    <label className="profile_details_text">E-Mail:</label>
                                    <input type="email" name="email" className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <div className="form-group">
                                    <label className="profile_details_text">Date Of Birth:</label>
                                    <input type="date" name="birthday" className="form-control"  ></input>
                                </div>
                            </div>
                        </div>
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="form-group">
                                        <label className="profile_details_text">Gender:</label>
                                        <select name="gender" className="form-control"  >
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="form-group">
                                        <label className="profile_details_text">Monthly Income:</label>
                                        <input type="text" name="monthly_income" className="form-control"
                                               required></input>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="form-group">
                                        <input type="submit" className="btn btn-success"></input>
                                        <input type="submit" className="btn btn-danger" value="Delete Account"></input>

                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
