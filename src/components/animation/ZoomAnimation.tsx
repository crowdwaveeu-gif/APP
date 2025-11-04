import { useEffect } from "react";
import Aos from "aos";

const ZoomAnimation = () => {
  useEffect(() => {
    // Initialize AOS library
    Aos.init({
      duration: 1000, // Animation duration in milliseconds
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
          <h5>Zoom Animation</h5>
        </div>
        <div className="panel-body">
          <div className="row">
            <div className="col-md-12 col-lg-6">
              <div className="card p-0">
                <div className="card-header">Zoom In</div>
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
                            <span className="punctuation">"</span>zoom-in
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
                  <div className="text-center" data-aos="zoom-in">
                    <img src="/img/bg-img/animation-card.png" alt="Image" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6">
              <div className="card p-0">
                <div className="card-header">Zoom In Up</div>
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
                            <span className="punctuation">"</span>zoom-in-up
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
                  <div className="text-center" data-aos="zoom-in-up">
                    <img src="/img/bg-img/animation-card.png" alt="Image" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6">
              <div className="card p-0">
                <div className="card-header">Zoom In Down</div>
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
                            <span className="punctuation">"</span>zoom-in-down
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
                  <div className="text-center" data-aos="zoom-in-down">
                    <img src="/img/bg-img/animation-card.png" alt="Image" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6">
              <div className="card p-0">
                <div className="card-header">Zoom In Left</div>
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
                            <span className="punctuation">"</span>zoom-in-left
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
                  <div className="text-center" data-aos="zoom-in-left">
                    <img src="/img/bg-img/animation-card.png" alt="Image" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6">
              <div className="card p-0">
                <div className="card-header">Zoom In Right</div>
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
                            zoom-in-right
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
                  <div className="text-center" data-aos="zoom-in-right">
                    <img src="/img/bg-img/animation-card.png" alt="Image" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6">
              <div className="card p-0">
                <div className="card-header">Zoom Out</div>
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
                            <span className="punctuation">"</span>zoom-out
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
                  <div className="text-center" data-aos="zoom-out">
                    <img src="/img/bg-img/animation-card.png" alt="Image" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6">
              <div className="card p-0">
                <div className="card-header">Zoom Out Up</div>
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
                            <span className="punctuation">"</span>zoom-out-up
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
                  <div className="text-center" data-aos="zoom-out-up">
                    <img src="/img/bg-img/animation-card.png" alt="Image" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6">
              <div className="card p-0">
                <div className="card-header">Zoom Out Down</div>
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
                            zoom-out-down
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
                  <div className="text-center" data-aos="zoom-out-down">
                    <img src="/img/bg-img/animation-card.png" alt="Image" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6">
              <div className="card p-0">
                <div className="card-header">Zoom Out Left</div>
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
                            zoom-out-left
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
                  <div className="text-center" data-aos="zoom-out-left">
                    <img src="/img/bg-img/animation-card.png" alt="Image" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6">
              <div className="card p-0">
                <div className="card-header">Zoom Out Right</div>
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
                            zoom-out-right
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
                  <div className="text-center" data-aos="zoom-out-right">
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
export default ZoomAnimation;
