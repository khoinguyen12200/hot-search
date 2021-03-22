import axios from "axios";
import React from "react";
import { HotSearchGroup } from './HotSearch';
import { Redirect } from 'react-router-dom';
import { formatDate, getVariableFromSearch } from './MyFunction';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
const addSubtractDate = require("add-subtract-date");

export default function DailyHotSearch(props) {
    const { search } = props.location;
    const date = getVariableFromSearch(search, "date");
    const defaultDate = new Date(date || formatDate(new Date()));

    const [startDate, setStartDate] = React.useState(defaultDate);
    const [daily, setDaily] = React.useState(null);
    const [redirect, setRedirect] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    function getDaily(date) {
        if (date != null) {
            setLoading(true);
            const data = { date: date };
            axios.post('/api/dailyTrends', data)
                .then(res => {
                    setLoading(false);
                    if (res.status === 200) {
                        setDaily(res.data.result);
                    }
                })
                .catch(error => console.log(error));
        }
    }
    function onSubmit(e) {
       
        setRedirect(`/daily-hotsearch?date=${formatDate(startDate)}`);
    }
    function addDate(add){
        var date = new Date(startDate);
        var newDate =  addSubtractDate.add(date, add, 'days');
        setStartDate(newDate);
        setRedirect(`/daily-hotsearch?date=${formatDate(newDate)}`);
        
    }

    React.useEffect(() => {
        getDaily(startDate);
    }, [search]);
    React.useEffect(() => {
        if (redirect != null) {
            setRedirect(null);
        }
    }, [redirect])
    return (
        <div className="daily-hot-search">
            <div className="daily-header">
                <button onClick={()=>addDate(-1)} className="arrow">
                    <BiLeftArrow />
                </button>
                <form onSubmit={e => onSubmit(e)} className="input-row">
                    <input className='date-picker'
                        type="date" value={formatDate(startDate)}
                        onChange={e => {
                            setStartDate(e.target.value)
                        }} />
                    <button className="submit" readOnly={!loading}>
                        {
                            loading ? "Đang tải" : "Search"
                        }
                    </button>
                </form>
                <button onClick={()=>addDate(1)} className="arrow">
                    <BiRightArrow />
                </button>
            </div>



            <div className="daily-main-content">
                {
                    daily && startDate &&
                    <HotSearchGroup list={daily} />
                }
            </div>
            {redirect && <Redirect to={redirect} />}
        </div>
    )
}
