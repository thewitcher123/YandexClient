import React from 'react';

var Greetings = React.createClass({
    onStartClick: function () {
        this.props.history.push('/disk/');
    },
    render: function () {
        return (
            <div className="disk-greetings">
                <div className="jumbotron">
                    <div className="main-text">
                        Всегда под рукой
                    </div>
                </div>
                <div className="col-md-2 col-md-offset-5">
                    <div className="start-disk-button">
                        <button type="button" className="btn btn-primary btn-lg"
                                onClick={this.onStartClick}
                        >
                            Перейти к Яндекс Диску
                        </button>
                    </div>
                </div>
            </div>
        );
    }
});


export default Greetings;