import { Link } from 'react-router-dom';
import Selector from './selector';
import { BsFillInfoCircleFill } from "react-icons/bs";
import { isMobile } from './MyFunction';


export default function Navbar(props) {
    function onThemeChange(value) {
        var root = document.getElementById("app-root");
        var clName = value == 0 ? "App light-theme" : "App dark-theme";
        root.className = clName;
    }
    return (
        <div className="navbar">
            <div className="space-left">
                <Link to="/" className="webname">
                    {
                        !isMobile()
                            ? <img src="/icons/full_logo.svg" alt="logo" />
                            : <img src="/icons/small_logo.svg" alt="logo" />
                    }

                </Link>
                <Link className='nav-item' to="/daily-hotsearch">
                    <span className="text">
                        TÌM KIẾM
                    </span>
                </Link>
            </div>

            <div className="select-space">
                <Selector
                    onChange={onThemeChange}
                    activeTextColor="#fff"
                    textColor="#aaa"
                    backColor="#fc8600"
                    defaultValue={0}
                    options={[
                        { title: "Light", value: 0 },
                        { title: "Dark", value: 1 },
                    ]}
                />
                <Link to="/question" className="question">
                    <div className="icon-container">
                        <BsFillInfoCircleFill />
                    </div>
                </Link>
            </div>

        </div >
    )
}