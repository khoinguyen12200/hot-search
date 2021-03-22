import { Link } from 'react-router-dom';
import {EMAIL} from './MyFunction';

export default function Footer(props) {
    return (
        <div className="footer">

            <div className="space1">
                <ul>
                    <li>
                        <Link to="/question#aboutus" className="footer-item">
                            Về trang web này
                        </Link>
                    </li>

                    <li>
                        <Link to="/question#whatishotsearch" className="footer-item">
                            Hot search là gì ?
                        </Link>
                    </li>

                    <li>
                        <Link to="/question#contactus" className="footer-item">
                            Liên hệ
                        </Link>
                    </li>
                </ul>



            </div>
            <div className="space2">
                <h3>
                    Developer năm 3 CTU
                </h3>
                <h5>Nếu bạn là nhà tuyển dụng thì hãy liên lạc theo email: {EMAIL}</h5>
            </div>
        </div>
    )
}