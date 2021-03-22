import { Component } from 'react';
import { getDayOfWeek, formatNumbers, getdatesql } from './MyFunction';
import axios from 'axios';
import { ImFire, ImNewspaper } from 'react-icons/im';
import { AiOutlineFundView } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { FacebookComment, ListNews } from './HotSearch';
import { getIdFromSearch, getHotSearchUrl, getHotSearchDateUrl } from './MyFunction';
import { decode } from 'html-entities';
import { FaExternalLinkSquareAlt } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';
export default class HotSearchItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotSearch: null,
            isLoading: true,
        };
    }
    componentDidMount() {
        var { id } = this.props;

        if (id == null) {
            var id = getIdFromSearch(this.props.location.search);
        }

        id = parseInt(id);
        const data = {
            id: id
        }
        axios.post('/api/getHotSearchRow', data)
            .then(res => {
                if (res.status === 200) {
                    if (res.data.result);
                    this.setState({ hotSearch: res.data.result });
                }
                this.setState({ isLoading: false });

            })
            .catch(error => console.log(error));
    }
    render() {
        const { hotSearch, isLoading } = this.state;
        const link = hotSearch != null ? getHotSearchUrl(hotSearch.id) : "";
        const groupLink = hotSearch != null ? getHotSearchDateUrl(hotSearch.date) : "";

        if (hotSearch != null) {
            return (
                <div className="hot-search-page">


                    <div className="hotsearch-header">
                        <h1 className="hs-title">"{hotSearch.title}" lọt top {hotSearch.rank} tìm kiếm tại Việt Nam</h1>
                        <ul className="header-list">
                            <li className="hs-date">
                                <MdDateRange />
                                <p>{getDayOfWeek(hotSearch.date)}</p>
                            </li>
                            <li className="hs-view">
                                <AiOutlineFundView />
                                <p>{formatNumbers(hotSearch.view)} lượt xem</p>
                            </li>
                            <li className='hs-articles'>
                                <ImNewspaper />
                                <p>{hotSearch.articles.length} bài viết</p>
                            </li>
                        </ul>

                    </div>
                    <Articles articles={hotSearch.articles} />

                    <FacebookComment link={link} title={`Bình luận về "${hotSearch.title}"`} />

                    <FacebookComment link={groupLink} title={`Bình luận về ngày ${getDayOfWeek(hotSearch.date)}`} />



                </div>
            )
        }
        else {
            return (
                <p className="not-found-hotsearch">
                    {
                        isLoading ? "Đang tải" : "Không tìm thấy hot search này"
                    }
                </p>
            )
        }
    }
}
export function Articles(props) {
    const { articles } = props;
    return (
        <div className="list-article">
            {
                articles.map((item, index) => (
                    <Article article={item} key={index} />
                ))
            }
        </div>
    )
}
export function Article(props) {
    const { article } = props;
    return (
        <div className="article-item">
            <div className="article-content">
                <h4 className="article-title">{decode(article.title)}</h4>
                <div className="content">
                    <img className="image" src={article.image} alt="aritcle" />
                    <p className='snippet'>{decode(article.snippet)}</p>
                </div>
            </div>
            <div className="source">
                <a target="_blank" href={article.url}> {article.source}<FaExternalLinkSquareAlt /></a>
            </div>
        </div>
    )
}