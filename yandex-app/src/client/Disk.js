import React from 'react';
import getHeaders from './connection/Token';
import {getAllFiles, getFolderFiles} from './connection/DiskMethods';
import Grid from './Grid';

let authHeaders = getHeaders();

var Disk = React.createClass({
    getInitialState: function () {
        debugger;
        var path = this.props.history.location.pathname.substring(6);
        return {
            isLoaded: false,
            type: path.length > 0 ? "folder" : "disk",
            dirName: path.length > 0 ? path : "",
            diskData: [],
            errors: []
        }
    },
    backHistoryState: function () {
        debugger;
        this.props.history.goBack()
    },
    onItemDoubleClick: function (item) {
        if (item.type === "dir") {
            this.props.history.push(this.props.history.location.pathname + item.name + "/");
            this.setState({isLoaded: false, diskData: []});
        }
        this.setState({selectedItem: item});
    },
    showDiskData: function () {
        let backButtonClass = "btn btn-default";
        if (!this.state.isLoaded || this.state.diskData.length === 0) {
            backButtonClass += " hidden"
        }
        /*<button type="button" className={backButtonClass}
         onClick={this.backHistoryState}>
         Назад
         </button>*/
        return (
            <div className="disk-grid">

                <Grid gridData={this.state.diskData} onDoubleClick={this.onItemDoubleClick}
                      history={this.props.history}/>
            </div>
        )
    },
    loadFolderFiles: function () {
        var path = this.props.history.location.pathname.substring(6);
        getFolderFiles(authHeaders, path).then((result) => {
            this.setState({diskData: result.data._embedded.items, isLoaded: true});
        }).catch((err)=> {
            this.setState({errors: err.response.data, isLoaded: true})
        });
    },
    loadAllFiles: function () {
        getAllFiles(authHeaders).then((result) => {
            this.setState({diskData: result.data.items, isLoaded: true});
        }).catch((err)=> {
            this.setState({errors: err.response.data, isLoaded: true})
        });
    },
    render: function () {
        debugger;
        if (!this.state.isLoaded || this.state.diskData.length === 0) {
            if (this.state.type === "disk") {
                // todo load from disk
                this.loadAllFiles();
            }
            else if (this.state.type === "folder") {
                // todo load from folder
                this.loadFolderFiles();
            }
        }
        return (
            this.showDiskData()
        )
    }
});

export default Disk;