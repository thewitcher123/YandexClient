import React from 'react';

var GridItem = React.createClass({
    render: function () {
        const {item, itemStyle} = this.props;
        return (
            <div className="grid-item"

                 style={itemStyle}
                 value={item}
                 onClick={() => {this.props.onClick(item)}}
                 /*key={item.id}*/
            >
                <div className="grid-icon">
                    <img src={item.image} className={item.imgClass}/>
                    <span className="grid-item-name">{item.shortName}</span>
                </div>
            </div>
        );
    }
});

GridItem.propTypes = {
    item: React.PropTypes.object.isRequired,
    itemStyle: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired
};

export default GridItem