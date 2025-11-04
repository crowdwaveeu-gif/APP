import { useEffect } from "react";
import Aos from "aos";

const FadeAnimation = () => {
  useEffect(() => {
    // Initialize AOS library
    Aos.init({
      duration: 500, // Animation duration in milliseconds
      once: true, // Only animate elements once
    });

    // Clean up AOS library on component unmount
    return () => {
      Aos.refresh(); // Refresh AOS library to remove applied animations
    };
  }, []);
  return (
    <div className="col-12">
      <div className="panel">
        <div className="panel-header">
          <h5>Fade Animation</h5>
        </div>

        <div className="panel-body">
          <div className="row">
            <div className="col-md-12 col-lg-6">
              <div className="card p-0">
                <div className="card-header">Fade Up</div>
                <div className="card-body animation-card">
                  <div className="bg-primary-subtle p-1 mb-15 rounded">
                    <pre className="language-markup">
                      <code className="language-markup">
                        <span className="tag">
                          <span className="tag">
                            <span className="punctuation">&lt;</span>div
                          </span>{" "}
                          <span className="attr-name">data-aos</span>
                          <span className="attr-value">
                            <span className="punctuation attr-equals">=</span>
                            <span className="punctuation">"</span>fade-up
                            <span className="punctuation">"</span>
                          </span>
                          <span className="punctuation">&gt;</span>
                        </span>
                        <span className="tag">
                          <span className="tag">
                            <span className="punctuation">&lt;/</span>div
                          </span>
                          <span className="punctuation">&gt;</span>
                        </span>
                      </code>
                    </pre>
                  </div>
                  <div className="text-center" data-aos="fade-up">
                    <img src="/img/bg-img/animation-card.png" alt="Image" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6">
              <div className="card p-0">
                <div className="card-header">Fade Down</div>
                <div className="card-body animation-card">
                  <div className="bg-primary-subtle p-1 mb-15 rounded">
                    <pre className="language-markup">
                      <code className="language-markup">
                        <span className="tag">
                          <span className="tag">
                            <span className="punctuation">&lt;</span>div
                          </span>{" "}
                          <span className="attr-name">data-aos</span>
                          <span className="attr-value">
                            <span className="punctuation attr-equals">=</span>
                            <span className="punctuation">"</span>fade-down
                            <span className="punctuation">"</span>
                          </span>
                          <span className="punctuation">&gt;</span>
                        </span>
                        <span className="tag">
                          <span className="tag">
                            <span className="punctuation">&lt;/</span>div
                          </span>
                          <span className="punctuation">&gt;</span>
                        </span>
                      </code>
                    </pre>
                  </div>
                  <div className="text-center" data-aos="fade-down">
                    <img src="/img/bg-img/animation-card.png" alt="Image" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6">
              <div className="card p-0">
                <div className="card-header">Fade Right</div>
                <div className="card-body animation-card">
                  <div className="bg-primary-subtle p-1 mb-15 rounded">
                    <pre className="language-markup">
                      <code className="language-markup">
                        <span className="tag">
                          <span className="tag">
                            <span className="punctuation">&lt;</span>div
                          </span>{" "}
                          <span className="attr-name">data-aos</span>
                          <span className="attr-value">
                            <span className="punctuation attr-equals">=</span>
                            <span className="punctuation">"</span>fade-right
                            <span className="punctuation">"</span>
                          </span>
                          <span className="punctuation">&gt;</span>
                        </span>
                        <span className="tag">
                          <span className="tag">
                            <span className="punctuation">&lt;/</span>div
                          </span>
                          <span className="punctuation">&gt;</span>
                        </span>
                      </code>
                    </pre>
                  </div>
                  <div className="text-center" data-aos="fade-right">
                    <img src="/img/bg-img/animation-card.png" alt="Image" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6">
              <div className="card p-0">
                <div className="card-header">Fade Left</div>
                <div className="card-body animation-card">
                  <div className="bg-primary-subtle p-1 mb-15 rounded">
                    <pre className="language-markup">
                      <code className="language-markup">
                        <span className="tag">
                          <span className="tag">
                            <span className="punctuation">&lt;</span>div
                          </span>{" "}
                          <span className="attr-name">data-aos</span>
                          <span className="attr-value">
                            <span className="punctuation attr-equals">=</span>
                            <span className="punctuation">"</span>fade-left
                            <span className="punctuation">"</span>
                          </span>
                          <span className="punctuation">&gt;</span>
                        </span>
                        <span className="tag">
                          <span className="tag">
                            <span className="punctuation">&lt;/</span>div
                          </span>
                          <span className="punctuation">&gt;</span>
                        </span>
                      </code>
                    </pre>
                  </div>
                  <div className="text-center" data-aos="fade-left">
                    <img src="/img/bg-img/animation-card.png" alt="Image" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6">
              <div className="card p-0">
                <div className="card-header">Fade Up Right</div>
                <div className="card-body animation-card">
                  <div className="bg-primary-subtle p-1 mb-15 rounded">
                    <pre className="language-markup">
                      <code className="language-markup">
                        <span className="tag">
                          <span className="tag">
                            <span className="punctuation">&lt;</span>div
                          </span>{" "}
                          <span className="attr-name">data-aos</span>
                          <span className="attr-value">
                            <span className="punctuation attr-equals">=</span>
                            <span className="punctuation">"</span>
                            fade-up-right
                            <span className="punctuation">"</span>
                          </span>
                          <span className="punctuation">&gt;</span>
                        </span>
                        <span className="tag">
                          <span className="tag">
                            <span className="punctuation">&lt;/</span>div
                          </span>
                          <span className="punctuation">&gt;</span>
                        </span>
                      </code>
                    </pre>
                  </div>
                  <div className="text-center" data-aos="fade-up-right">
                    <img src="/img/bg-img/animation-card.png" alt="Image" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6">
              <div className="card p-0">
                <div className="card-header">Fade Up Left</div>
                <div className="card-body animation-card">
                  <div className="bg-primary-subtle p-1 mb-15 rounded">
                    <pre className="language-markup">
                      <code className="language-markup">
                        <span className="tag">
                          <span className="tag">
                            <span className="punctuation">&lt;</span>div
                          </span>{" "}
                          <span className="attr-name">data-aos</span>
                          <span className="attr-value">
                            <span className="punctuation attr-equals">=</span>
                            <span className="punctuation">"</span>fade-up-left
                            <span className="punctuation">"</span>
                          </span>
                          <span className="punctuation">&gt;</span>
                        </span>
                        <span className="tag">
                          <span className="tag">
                            <span className="punctuation">&lt;/</span>div
                          </span>
                          <span className="punctuation">&gt;</span>
                        </span>
                      </code>
                    </pre>
                  </div>
                  <div className="text-center" data-aos="fade-up-left">
                    <img src="/img/bg-img/animation-card.png" alt="Image" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6">
              <div className="card p-0">
                <div className="card-header">Fade Down Right</div>
                <div className="card-body animation-card">
                  <div className="bg-primary-subtle p-1 mb-15 rounded">
                    <pre className="language-markup">
                      <code className="language-markup">
                        <span className="tag">
                          <span className="tag">
                            <span className="punctuation">&lt;</span>div
                          </span>{" "}
                          <span className="attr-name">data-aos</span>
                          <span className="attr-value">
                            <span className="punctuation attr-equals">=</span>
                            <span className="punctuation">"</span>
                            fade-down-right
                            <span className="punctuation">"</span>
                          </span>
                          <span className="punctuation">&gt;</span>
                        </span>
                        <span className="tag">
                          <span className="tag">
                            <span className="punctuation">&lt;/</span>div
                          </span>
                          <span className="punctuation">&gt;</span>
                        </span>
                      </code>
                    </pre>
                  </div>
                  <div className="text-center" data-aos="fade-down-right">
                    <img src="/img/bg-img/animation-card.png" alt="Image" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6">
              <div className="card p-0">
                <div className="card-header">Fade Down Left</div>
                <div className="card-body animation-card">
                  <div className="bg-primary-subtle p-1 mb-15 rounded">
                    <pre className="language-markup">
                      <code className="language-markup">
                        <span className="tag">
                          <span className="tag">
                            <span className="punctuation">&lt;</span>div
                          </span>{" "}
                          <span className="attr-name">data-aos</span>
                          <span className="attr-value">
                            <span className="punctuation attr-equals">=</span>
                            <span className="punctuation">"</span>
                            fade-down-left
                            <span className="punctuation">"</span>
                          </span>
                          <span className="punctuation">&gt;</span>
                        </span>
                        <span className="tag">
                          <span className="tag">
                            <span className="punctuation">&lt;/</span>div
                          </span>
                          <span className="punctuation">&gt;</span>
                        </span>
                      </code>
                    </pre>
                  </div>
                  <div className="text-center" data-aos="fade-down-left">
                    <img src="/img/bg-img/animation-card.png" alt="Image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FadeAnimation;
