import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import ReactDom from 'react-dom';
import { showDialog } from './Modal.js';
import HotSearchRow from './HotSearch';
import { HotSearchGroup, showHotSearchModal } from './HotSearch';
import { getIdFromSearch } from './MyFunction';
import { motion } from 'framer-motion';
import Select from './selector';
const addSubtractDate = require("add-subtract-date");



function getHotSearchDate(date) {
    return new Promise((resolve, reject) => {

        const data = {
            date: date,
        }
        axios.post('/api/dailyTrends', data)
            .then(res => {

                if (res.status === 200) {
                    var result = res.data.result;

                    resolve(result);
                } else {
                    reject(result)
                    console.log(res)
                }
            })
            .catch(error => reject(error));
    })
}
export default class MainContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listGroup: [],
            date: -1,
            redirect: null,
            option: 0,
        }
        // 0: mac dinh ,,, 1:tab moi ,,, 2:ghi de

        this.addListGroup = this.addListGroup.bind(this);
        this.xemThem = this.xemThem.bind(this);
        this.showPopupWindow = this.showPopupWindow.bind(this);
    }

    setOption(value) {
        this.setState({ option: value });
    }
    showPopupWindow(id) {
        this.setState({ redirect: null });
        showHotSearchModal(id, () => {
            this.setState({ redirect: '/' });
        });
    }
    addListGroup(item) {
        var { listGroup } = this.state;
        listGroup.push(item);
        listGroup = listGroup.sort((a, b) => (a.date.getTime() < b.date.getTime()) ? 1 : -1);
        this.setState({ listGroup: listGroup });
    }

    xemThem() {
        const { date } = this.state;
        this.setState({ date: date - 1 });
    }

    componentDidUpdate(prevProps, prevState) {
        const { search } = this.props.location;
        const oldSearch = prevProps.location.search;
        if (oldSearch !== search) {
            const hotsearchid = getIdFromSearch(search);
            if (hotsearchid) {
                this.showPopupWindow(hotsearchid);
            }
        }
        const prevDate = prevState.date;
        const date = this.state.date;
        if (date != prevDate) {
            this.dailyTrends(date);
        }
        if(this.state.redirect != null){
            this.setState({redirect:null})
        }

    }

    dailyTrends(dateBefore) {
        var date = new Date();
        date = addSubtractDate.add(date, dateBefore, 'days');

        getHotSearchDate(date).then((result) => {
            this.addListGroup({ date: date, list: result });
            if(result.length == 0){
                this.xemThem();
            }
        });

    }

    componentDidMount() {
        const { search } = this.props.location;
        const hotsearchid = getIdFromSearch(search);
        if (hotsearchid) {
            this.showPopupWindow(hotsearchid);
        }
        this.dailyTrends(0);
        this.dailyTrends(-1);

    }

    render() {

        const { listGroup, redirect, option } = this.state;
        return (
            <div className="main-content">
                {
                    redirect != null &&
                    <Redirect to={redirect} />
                }

                <div className="select-space">
                    <div className="vertical-space">
                        <Select 
                        textColor="#aaa"
                        activeTextColor={"#fff"}
                        backColor="#666"
                        options={[
                            { title: "Mặc định", value: 0 },
                            { title: "Tab mới", value: 1 },
                            { title: "Cửa sổ", value: 2 },  
                        ]}
                            defaultValue={0}
                            onChange={(index) => this.setOption(index)}
                        />
                    </div>

                </div>

                <h1  className="title"><img className="vietnamflag" src="/icons/vietnam-flag.png"/> Hot Search Việt Nam </h1>


                <div className="list-hot-search">
                    {
                        listGroup.map((item, index) => {
                            if (item != undefined && item.list && item.list.length != 0) {
                                return (
                                    <HotSearchGroup option={option} list={item.list} date={item.date} key={index} />
                                )
                            }
                        })
                    }
                </div>
                <div className="button-space">
                    <button onClick={this.xemThem} className="see-more">
                        Xem thêm
                    </button>
                </div>
            </div>
        )
    }
}

