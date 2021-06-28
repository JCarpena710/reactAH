import React from 'react';

class changepassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
        <div>

        <div class="content-area user-profiel" style={{backgroundcolor: '#FCFCFC'}}>&nbsp;
            <div class="container">   
                <div class="row">
                    <div class="col-sm-10 col-sm-offset-1 profiel-container">

                        <form action="" method="">

                            <div class="profiel-header">
                                <h3>
                                    <b>UPDATE</b> YOUR PASSWORD <br/>
                                    <small>All change will send to your e-mail.</small>
                                </h3>
                                <hr/>
                            </div>

                            <div class="clear">

                                <div class="col-sm-10 col-sm-offset-1">
                                    <div class="form-group">
                                        <label>Password <small>(required)</small></label>
                                        <input name="Password" type="password" class="form-control" />
                                    </div>
                                    <div class="form-group">
                                        <label>Confirm password : <small>(required)</small></label>
                                        <input type="password" class="form-control" />
                                    </div> 
                                </div>
                                <div class="col-sm-10 col-sm-offset-1">
                                    <input type='button' class='btn btn-finish btn-primary pull-right' name='update' value='Update' />
                                </div>
                                
                            </div>             
                    </form>

                </div>
            </div>

        </div>
        </div>



        </div>
          );
    }
}
 
export default changepassword;