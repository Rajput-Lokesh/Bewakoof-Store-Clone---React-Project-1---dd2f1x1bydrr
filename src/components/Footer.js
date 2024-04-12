export const Footer = () => {
  return (
    <div className="bg-black text-white p-5  w-full">
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
            <div className="text-gold">COMPANY</div>
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
            <div className="text-gold">CONNECT WITH US</div>
            <ul>
              <li>4.7M People</li>
              <li>1M Followers</li>
            </ul>
          </div>
        </div>
        <div>
          <div>
            <div className="text-gold">CONNECT WITH US</div>
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
            <div className="text-gold">DOWNLOAD THE APP </div>
            <div className="flex gap-1">
              <img
                src="https://images.bewakoof.com/web/app_android_v1.png"
                alt="Android App"
              />
              <img
                src="https://images.bewakoof.com/web/app_ios_v1.png"
                alt="iOS App"
              />
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className="text-gold">100% SECURE PAYMENT</div>
            <div className="flex gap-1">
              <img
                src="https://images.bewakoof.com/web/secure-payments-image.png"
                alt="Secure Payments"
              />
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className="text-gold">15 Days return policy*</div>
            <div> Cash on delivery*</div>
          </div>
        </div>
      </div>
    </div>
  );
};
