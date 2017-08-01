import React from 'react';
import getHeaders from './connection/Token';
import { getAllFiles } from './connection/DiskMethods';
import Greetings from './Greetings';
import Disk from './Disk';
import {Route} from 'react-router';


let authHeaders = getHeaders();


var Explorer = React.createClass({
    getInitialState: function () {
        return {
            isLoaded: false,
            data: [],
            errors: []
        }
    },

    createAddressArray: function (array) {
        let addressList = [];
        array.filter((el)=> {
            let url = el.path.substring(6);
            let path = url.split('/');
            if (path.length > 1) {
                path.splice(path.length - 1, 1);
                let folderName = path.join('/');
                if (addressList.indexOf(folderName) === -1)addressList.push(folderName);
            }
        });
        return addressList;
    },

    completeDiskTree: function () {
        let addressArr = this.state.data.length > 0 ? this.createAddressArray(this.state.data) : [];
        let folders = [];
        if (addressArr.length > 0) {
            folders = addressArr.map((item)=> {
                let path = "/disk/" + item + "/";
                return <Route exact path={path} component={Disk}/>;
            });
            return (<div>
                <Route exact path="/" component={Greetings}/>
                <Route exact path="/disk/" component={Disk}/>
                {folders}
            </div>);
        }
        else {
            return (<div>
                <Route exact path="/" component={Greetings}/>
                <Route exact path="/disk/" component={Disk}/>
            </div>);
        }
    },
    createTree: function () {
        getAllFiles(authHeaders).then((result) => {
            this.setState({data: result.data.items, isLoaded: true});
        }).catch((err)=> {
            this.setState({errors: err.response.data, isLoaded: true})
        });
    },
    render: function () {
        if (!this.state.isLoaded || this.state.data.length === 0) {
            this.createTree();
        }
        return (
            this.completeDiskTree()
        );
    }
});


export default Explorer