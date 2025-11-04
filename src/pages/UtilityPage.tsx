import React from "react";
import { toast } from "react-toastify";

const UtilityPage: React.FC = () => {
  const borderWidths = [
    "border-1",
    "border-2",
    "border-3",
    "border-4",
    "border-5",
  ];
  const borderAdditive = [
    "border",
    "border-top",
    "border-end",
    "border-bottom",
    "border-start",
  ];
  const borderSubtractive = [
    "border-0",
    "border-top-0",
    "border-end-0",
    "border-bottom-0",
    "border-start-0",
  ];
  const borderColors = [
    "border-primary",
    "border-primary-subtle",
    "border-secondary",
    "border-secondary-subtle",
    "border-success",
    "border-success-subtle",
    "border-danger",
    "border-danger-subtle",
    "border-warning",
    "border-warning-subtle",
    "border-info",
    "border-info-subtle",
    "border-light",
    "border-light-subtle",
    "border-dark",
    "border-dark-subtle",
    "border-white",
  ];
  const borderStyles = [
    "border-dotted",
    "border-dashed",
    "border-groove",
    "border-outset",
    "border-ridge",
    "border-inset",
  ];
  const borderAdditiveStyles = [
    "border-top-dotted",
    "border-end-dotted",
    "border-bottom-dotted",
    "border-start-dotted",
  ];
  const borderOpacities = [
    "border-opacity-10",
    "border-opacity-25",
    "border-opacity-50",
    "border-opacity-75",
    "border-opacity-100",
  ];
  const borderRadiuses = [
    "rounded",
    "rounded-top",
    "rounded-end",
    "rounded-bottom",
    "rounded-start",
    "rounded-circle",
    "rounded-pill",
  ];
  const borderSizes = [
    "rounded-0",
    "rounded-1",
    "rounded-2",
    "rounded-3",
    "rounded-4",
    "rounded-5",
  ];

  const handleCopy = (className: string) => {
    navigator.clipboard.writeText(className);
    toast.success(`Copied: ${className}`);
  };

  const renderUtilityBoxes = (classNames: string[], type: string) => {
    return classNames.map((className) => (
      <div
        key={className}
        onClick={() => handleCopy(className)}
        className="cursor-pointer"
      >
        <div className={`utility-box ${type} ${className}`}></div>
        <code>{className}</code>
      </div>
    ));
  };

  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="panel">
          <div className="panel-header">
            <h5>Borders</h5>
          </div>
          <div className="panel-body">
            <p className="fs-14 pb-1 mb-10">
              Use border utilities to add or remove an element's borders. Choose
              from all borders or one at a time.
            </p>
            <div className="row g-4">
              <div className="col-12">
                <h5 className="fs-14 border-bottom pb-2 mb-3">Border Width</h5>
                <div className="d-flex flex-wrap gap-3">
                  {renderUtilityBoxes(borderWidths, "border")}
                </div>
              </div>

              <div className="col-md-6">
                <h5 className="fs-14 border-bottom pb-2 mb-3">Additive</h5>
                <div className="d-flex flex-wrap gap-3">
                  {renderUtilityBoxes(borderAdditive, "border border-primary")}
                </div>
              </div>

              <div className="col-md-6">
                <h5 className="fs-14 border-bottom pb-2 mb-3">Subtractive</h5>
                <div className="d-flex flex-wrap gap-3">
                  {renderUtilityBoxes(
                    borderSubtractive,
                    "border border-primary"
                  )}
                </div>
              </div>

              <div className="col-12">
                <h5 className="fs-14 border-bottom pb-2 mb-3">Border Color</h5>
                <div className="d-flex flex-wrap gap-3">
                  {renderUtilityBoxes(borderColors, "border")}
                </div>
              </div>

              <div className="col-md-6">
                <h5 className="fs-14 border-bottom pb-2 mb-3">Border Style</h5>
                <div className="d-flex flex-wrap gap-3">
                  {renderUtilityBoxes(borderStyles, "border border-primary")}
                </div>
              </div>

              <div className="col-md-6">
                <h5 className="fs-14 border-bottom pb-2 mb-3">Additive</h5>
                <div className="d-flex flex-wrap gap-3">
                  {renderUtilityBoxes(
                    borderAdditiveStyles,
                    "border border-primary"
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <h5 className="fs-14 border-bottom pb-2 mb-3">
                  Border Opacity
                </h5>
                <div className="d-flex flex-wrap gap-3">
                  {renderUtilityBoxes(borderOpacities, "border border-success")}
                </div>
              </div>

              <div className="col-12">
                <div className="panel">
                  <div className="panel-header">
                    <h5>Border Radius</h5>
                  </div>
                  <div className="panel-body">
                    <div className="row g-3">
                      <div className="col-12">
                        <p className="fs-14 pb-1 mb-10">
                          Use below-mentioned class to an element to easily
                          round its corners.
                        </p>
                        <div className="d-flex flex-wrap gap-3">
                          {renderUtilityBoxes(
                            borderRadiuses,
                            "border border-danger"
                          )}
                        </div>
                      </div>
                      <div className="col-12">
                        <h5 className="fs-14 border-bottom pb-2 mb-3">Sizes</h5>
                        <div className="d-flex flex-wrap gap-3">
                          {renderUtilityBoxes(
                            borderSizes,
                            "border border-warning"
                          )}
                        </div>
                      </div>
                    </div>
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

export default UtilityPage;
