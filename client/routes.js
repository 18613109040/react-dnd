import React from "react";
import {Route, IndexRoute,IndexRedirect} from "react-router";
import App from './App';
//import Home from './containers/Home'
if (typeof require.ensure !== 'function') {
    require.ensure = function(dependencies, callback) {
        callback(require)
    }
}
module.exports = (
   <Route path="/" component={App} >
   	 	
   </Route>
 )