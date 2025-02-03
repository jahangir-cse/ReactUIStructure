import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotices } from "../../redux/actions/noticeActions";

const Notice = () => {
  const dispatch = useDispatch();
  const notices = useSelector(state => state.notices.items);

  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
  };

  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? match[2] : null;
  };

  const filteredNotices = notices.filter(notice => !getCookie(`CloseNotice_${notice.id}`));

  useEffect(() => {
    dispatch(fetchNotices());
  }, [dispatch]);

  const handleClose = (noticeId) => {
    setCookie(`CloseNotice_${noticeId}`, "true", 2);
    document.getElementById(`notice_${noticeId}`).style.display = "none";
  };

  return (
    <div className="container mt-3">
      {filteredNotices.length > 0 ? (
        filteredNotices.map((notice) => (
          <div key={notice.id} id={`notice_${notice.id}`} className="card border-0 mb-3">
            <div className="card-body bg-white text-black rounded">
              <span className="position-absolute top-right-10" onClick={() => handleClose(notice.id)}>
                <i className="bi bi-x-circle text-danger fs-4"></i>
              </span>
              <label className="card-title mb-1"><b>{notice.title}</b></label>
              <p className="card-text mb-0">{notice.description}</p>
              <p className="mb-0 d-none"><strong>Type:</strong> {notice.noticeType}</p>
            </div>
          </div>
        ))
      ) : (
          <div></div>
      )}
    </div>
  );
};

export default Notice;
