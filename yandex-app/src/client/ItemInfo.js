import React from 'react';

var ItemInfo = React.createClass({
    render: function() {
        let {item} = this.props;
        return (
            <div className="item-info">
                <header>
                    <img src={item.image} alt={item.name} className={item.imgClass}/>
                    <h3 className="item-name">{item.name}</h3>
                </header>
                <section>
                    <p className="item-size">Размер: {item.size}</p>
                </section>
            </div>
        );
    }
});

export default ItemInfo;
