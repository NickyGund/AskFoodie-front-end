import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const CommentContext = React.createContext();

const CommentProvider = props => {
    const[poster, setPoster] = useState('');
    const[type, setType] = useState('');
    const[restaurant, setRestaurant] = useState('');
    const[content, setContent] = useState('');
    const [error, setError] = useState(null);

    const addParentComment = async() => {
        //const body = {poster, restaurant, content}
        try{
            const res = await axios.post('http://192.168.1.8:3000/api/addParentComment', {
                poster: poster,
                restaurant: restaurant,
                content: content
            });
            console.log(res.data);
            if(res.data.error){
                console.log(res.data.data);
                throw new Error(res.data.data);
            }
            setPoster(res.data.data.poster);
            setRestaurant(res.data.data.restaurant);
            setContent(res.data.data.content);
            return res.data;
        }catch(err){
            setError(error.message);
            console.log(error.message);
        }
        console.log(body);
    }
    const findComments = async() => {
        try{
            const res = await axios.get('http://192.168.1.8:3000/api/findComments', {
                poster:poster
            });
            console.log(res.data);
            if(res.data.error){
                console.log(res.data.data);
                throw new Error(res.data.data);
            }
            return res.data;
        }catch(error){
            setError(error.message);
            console.log(error.message);
        }
    }
    const state = {
        state: {
            type,
            poster,
            restaurant,
            content
        },
        setType,
        setPoster,
        setRestaurant,
        setContent,
        addParentComment,
        findComments
    }
    return <CommentContext.Provider value={state}>{props.children}</CommentContext.Provider>
    };
export {CommentContext, CommentProvider}
