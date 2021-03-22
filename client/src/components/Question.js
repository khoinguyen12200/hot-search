import { useRef, useEffect } from "react";
import {EMAIL} from './MyFunction';

export default function Question(props) {
    const refContainer = useRef(null);

    useEffect(() => {
        const id = getIdByHash(props.location);
        goToId(id);
    });

    return (
        <div className="question-page" ref={refContainer}>
            <div id="aboutus" className="about-us topic">
                <h3>
                    Về trang web này
                </h3>
                <p className="paragraph">
                    Đây là trang web tổng hợp thông tin về mức độ quan tâm 
                    của người Việt Nam được thể hiện trên công cụ tìm kiếm của Google.
                    Và dữ liệu của trang web cũng được lấy từ nguồn cấp Google Trends.<br/>
                    Ở đây bạn có thể tìm thấy Top những từ khóa được người Việt quan tâm nhiều nhất trong một ngày vừa qua.
                </p>
            </div>
            <div id="whatishotsearch" className="what-is-hotsearch topic">
                <h3>
                    "Hot search" là gì ?
                </h3>

                <h5>
                    Định nghĩa
                </h5>
                <p className="paragraph">
                    Đến thời điểm hiện tại chưa có định nghĩa chính thống nào cho từ "Hot search".<br/>
                    Nhưng để định nghĩa đơn giản thì Hot search là các từ khóa 
                    được mọi người tìm kiếm nhiều trong 1 khoảng thời gian trên 1 công cụ tìm kiếm nào đó. 
                    (Ở đây là Google Search).<br/>
                    Hot search thể hiện mức độ quan tâm của mọi người đến các vấn đề.
                    Một từ khóa lọt top Hot search tức là mọi người đang quan tâm nhiều về nó.
                </p>

                <h5>
                    Dữ liệu được lấy bằng cách nào ? (Theo google giải thích)
                </h5>
                <p className="paragraph">
                    Google Xu hướng căn cứ vào các yêu cầu tìm kiếm thực tế trên Google (hầu như không lọc) để rút ra mẫu.
                    Mẫu này được ẩn danh (không có thông tin nhận dạng cá nhân của bất kỳ ai),
                    phân loại (xác định chủ đề cho cụm từ tìm kiếm) và tổng hợp (nhóm lại với nhau).
                </p>
                <p className="paragraph">
                    Mặc dù Google Xu hướng chỉ dùng một mẫu tìm kiếm trên Google,
                    nhưng do căn cứ vào hàng tỷ lượt tìm kiếm mà chúng tôi xử lý mỗi ngày,
                    nên mẫu này rất đầy đủ thông tin.<br/>
                    Toàn bộ tập dữ liệu là rất lớn nên khó có thể xử lý nhanh khi cung cấp quyền truy cập vào đó.
                    Bằng cách lấy mẫu dữ liệu, chúng tôi có thể xem xét một tập dữ liệu đại diện
                    cho tất cả các lượt tìm kiếm trên Google trong khi tìm hiểu thông tin chi tiết có
                    thể xử lý trong vòng vài phút về một sự kiện diễn ra trong thế giới thực.
                </p>

            </div>
            <div id="contactus" className="contact-us topic">
                <h3>
                    Liên hệ
                </h3>
                <p className="paragraph">
                    Nếu có vấn đề gì vui lòng liên hệ email : {EMAIL}
                </p>
            </div>
        </div>
    )
}
function goToId(id) {
    var element = document.getElementById(id);
    if (element) {
        element.scrollIntoView(true);
    }

}
function getIdByHash(location) {
    const hash = location ? location.hash : "";
    var id = hash.slice(1);
    return id;
}

