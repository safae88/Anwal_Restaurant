export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <a href="#top" className="navbar-brand">
            Anwal
          </a>
          <p>
            A quiet room, an open fire, and dishes made slowly. An evening you
            will want to stay in a little longer.
          </p>
        </div>

        <div>
          <h4>Find Us</h4>
          <ul>
            <li>14 Lantern Row</li>
            <li>Old Town</li>
            <li>+1 (212) 555-0198</li>
          </ul>
        </div>

        <div>
          <h4>Hours</h4>
          <ul>
            <li>Tue – Thu · 5–11pm</li>
            <li>Fri – Sat · 5pm–12am</li>
            <li>Sun · 4–10pm</li>
            <li>Mon · Closed</li>
          </ul>
        </div>

        <div>
          <h4>Follow</h4>
          <ul className="footer-social">
            <li>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram (opens in a new tab)"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook (opens in a new tab)"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.tiktok.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok (opens in a new tab)"
              >
                TikTok
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Anwal. All rights reserved.</span>
        <a href="#top">Back to top</a>
      </div>
    </footer>
  );
}
