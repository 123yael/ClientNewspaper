import * as React from 'react';
import { getAllNewspapersPublished } from '../Axios/newspapersPublishedAxios';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setNewspapersPublished } from '../redux/actions/NewspapersPublishedActions';
import { useNavigate } from 'react-router-dom';
import NewspaperList from '../screens/NewspaperList';



export const NewspaperArchive = () => {

    return (
        <div>
            <NewspaperList></NewspaperList>
        </div>
    )
}
