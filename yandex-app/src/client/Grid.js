import React from 'react';
import GridItem from './GridItem';
import ItemInfo from './ItemInfo';
import dirImg from './img/folder.svg';
import fileImg from './img/file.svg';

var Grid = React.createClass({
    getInitialState: function () {
        return {
            selectedItem: null,
            errors: [],
            gridData: []
        }
    },
    loadGridInfo: function () {
        if (this.state.selectedItem) {
            return <ItemInfo item={this.state.selectedItem}/>;
        }
    },

    prepareGridData: function (items) {
        let currentPath = this.props.history.location.pathname;
        let currentFolder = "disk:/";
        let pathArr = currentPath.split("/disk/");
        if (pathArr.length > 1) {
            pathArr.splice(0, 1);
            currentFolder += pathArr.join();
        }
        let catalogs = [];
        let gridData = [];
        // получить все одинокие файлы и список главных каталогов
        items.filter((el)=> {
            let url = el.path.substring(currentFolder.length);
            let path = url.split('/');
            if (path.length > 1 && catalogs.indexOf(path[0]) === -1) {
                catalogs.push(path[0]);
                gridData.push(this.createDirItem(path[0]));
            }
            else if (el.type === "dir" && catalogs.indexOf(el.name) === -1) {
                catalogs.push(el.name);
                gridData.push(this.createDirItem(el.name));
            }
            else if (path.length <= 1) {
                gridData.push(this.createFileItem(el));
            }
        });
        return this.sortGridDataItems(gridData);
    },
    onItemClick: function (item) {
        if (this.state.selectedItem && item.id === this.state.selectedItem.id) {
            this.setState({selectedItem: null});
            this.props.onDoubleClick(item);
        }
        else this.setState({selectedItem: item});
    },
    createDirItem: function (dirName) {
        return {
            id: "dirName" + dirName,
            name: dirName,
            shortName: dirName.length > 20 ? dirName.substring(0, 17) + "..." : dirName,
            //size: "1",
            type: "dir",
            image: dirImg,
            imgClass: "app-folder"
        };
    },
    createFileItem: function (item) {
        return {
            id: item.name + "/" + item.revision,
            name: item.name,
            shortName: item.name.length > 20 ? item.name.substring(0, 17) + "..." : item.name,
            size: item.size,
            type: item.type,
            image: fileImg,
            imgClass: "app-folder"
        };
    },

    sortGridDataItems: function (array) {
        array.sort((a, b) => {
            if (a.type === b.type) {
                let aName = a.name.toLowerCase();
                let bName = b.name.toLowerCase();
                return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
            }
            else if (a.type === "dir") return -1;
            else if (a.type !== "dir") return 1;
            return 0;
        });
        let state = this.state;
        return array.map((item)=> {
            let itemStyle = {
                background: state.selectedItem && item.id === state.selectedItem.id ? '#fff4b6' : ''
            };
            return <GridItem
                itemStyle={itemStyle}
                value={item}
                item={item}
                onClick={this.onItemClick}
                key={item.id}
            />
        });
    },
    render: function () {
        let gridData = this.prepareGridData(this.props.gridData);
        return (
            <div className="grid-table">
                <div className="col-md-7 col-md-offset-1">
                    <div className="disk-list-app">
                        <div className="disk-list-left">
                            <div className="disk-list-container">
                                {gridData}
                            </div>
                        </div>
                    </div>
                </div>
                <div id="gridInfo" className="col-md-4 col-md-offset-2">
                    <div className="disk-list-right">
                        {this.loadGridInfo()}
                    </div>
                </div>
            </div>
        )
    }
});

Grid.propTypes = {
    history: React.PropTypes.object.isRequired,
    onDoubleClick: React.PropTypes.func.isRequired,
    gridData: React.PropTypes.array.isRequired
};

export default Grid;