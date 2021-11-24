const HomeFooter = () => {
  return (
    <div className="imet-footer" id="contacts">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="company d-flex flex-column justify-content-center align-items-center">
              <div className="company-logo"></div>
              <div className="company-name">
                TRUNG TÂM CÔNG NGHỆ VI ĐIỆN TỬ VÀ TIN HỌC IMET VIỆN ỨNG DỤNG CÔNG NGHỆ - BỘ KHOA HỌC VÀ CÔNG NGHỆ
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <ul className="company-info d-flex flex-column justify-content-center align-items-start">
              <li className="company-info-item phone">
                0988.999.248
              </li>
              <li className="company-info-item phone">
                0961.070.488
              </li>
              <li className="company-info-item website">
                <a href="http://doluong.imet.com.vn/gioi-thieu/">www.doluong.imet.com.vn</a>
              </li>
              <li className="company-info-item email">info@imet.com.vn</li>
              <li className="company-info-item address">
                C6 Thanh Xuân Bắc, Q. Thanh Xuân, Hà Nội
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeFooter;
