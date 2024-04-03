export const Footer = () => {
  return (
    <>
      <div
        style={{
          background: "#010101",
          color: "white",
          padding: "30px",
          position: "absolute",
          bottom: "0",
        }}
      >
        <div className="flex justify-around my-1">
          <div>
            <div>
              <div style={{ color: "yellow" }}>CUSTOMER SERVICE</div>
              <ul>
                <li>Contact Us</li>
                <li>Track Order</li>
                <li>Return Order</li>
                <li>Cancel Order</li>
              </ul>
            </div>
          </div>
          <div>
            <div>
              <div style={{ color: "yellow" }}>COMPANY</div>
              <ul>
                <li>About Us</li>
                <li>We're Hiring</li>
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
                <li>Blog</li>
              </ul>
            </div>
          </div>
          <div>
            <div>
              <div style={{ color: "yellow" }}>CONNECT WITH US</div>
              <ul>
                <li>4.7M People</li>
                <li>1M Followers</li>
              </ul>
            </div>
          </div>
          <div>
            <div>
              <div style={{ color: "yellow" }}>CONNECT WITH US</div>
              <ul>
                <li>4.7M People</li>
                <li>1M Followers</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-between p-6 mx-6 leading-6">
          <div>
            <div>
              <div style={{ color: "yellow" }}>DOWNLOAD THE APP </div>
              <div className="flex gap-1">
                <img src="https://images.bewakoof.com/web/app_android_v1.png" />
                <img src="https://images.bewakoof.com/web/app_ios_v1.png" />
              </div>
            </div>
          </div>
          <div>
            <div>
              <div style={{ color: "yellow" }}>100% SECURE PAYMENT</div>
              <div className="flex gap-1">
                <img src="https://images.bewakoof.com/web/secure-payments-image.png" />
              </div>
            </div>
          </div>
          <div>
            <div>
              <div style={{ color: "yellow" }}>15 Days return policy*</div>
              <div> Cash on delivery*</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
