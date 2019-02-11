import io from 'socket.io-client';
import {qrHandler} from '../store/actions';
import {qrAuthHandler} from '../store/actions';
import store from '../store/store';
const socket = io();
socket.on('recieve_data',function(args){
    store.dispatch(qrHandler(args));
});
export default {
    callBackMessage:(message)=>{
        store.dispatch(qrAuthHandler());
        socket.emit('response',message);
    }
};