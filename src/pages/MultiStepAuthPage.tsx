import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { useState } from "react";
import { ActiveStepState } from "../types";
import AuthStep1 from "../components/auth/AuthStep1";
import AuthStepList from "../components/auth/AuthStepList";
import AuthStep2 from "../components/auth/AuthStep2";
import AuthStep3 from "../components/auth/AuthStep3";
import AuthStep4 from "../components/auth/AuthStep4";
import AuthStep5 from "../components/auth/AuthStep5";

const MultiStepAuthPage = () => {
  const darkMode = useAppSelector((state) => state.theme.isDark);
  const [activeStep, setActiveStep] = useState<ActiveStepState>({
    step1: true,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
  });
  const [activeTab, setActiveTab] = useState<string>("step1");
  const setPreviousStepInactive = (
    prevStep: keyof ActiveStepState,
    tab: string
  ) => {
    setActiveStep((prevActiveStep) => ({
      ...prevActiveStep,
      [prevStep]: false,
    }));
    setActiveTab(tab);
  };
  const toggleStep = (step: keyof ActiveStepState) => {
    setActiveStep((prevActiveStep) => ({
      ...prevActiveStep,
      [step]: true,
    }));
    setActiveTab(step);
  };

  return (
    <main
      className={`home-call-center ${darkMode ? "dark-theme" : "light-theme"}`}
    >
      <div className="main-content">
        <div className="multi-step-signup-panel">
          <div className="steps-sidebar bg-primary">
            <div className="sidebar-content">
              <div className="sidebar-logo">
                <Link to="/" style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold', 
                  color: 'white',
                  textDecoration: 'none',
                  fontFamily: 'inherit'
                }}>
                  CrowdWave
                </Link>
              </div>
              <AuthStepList activeStep={activeStep} />
            </div>
          </div>

          <div className="all-steps">
            <div
              className={`single-step scrollable ${
                activeTab === "step1" ? "show" : ""
              }`}
            >
              <AuthStep1 toggle={toggleStep} />
            </div>

            <div
              className={`single-step scrollable ${
                activeTab === "step2" ? "show" : ""
              }`}
            >
              <AuthStep2 toggle={toggleStep} prev={setPreviousStepInactive} />
            </div>

            <div
              className={`single-step scrollable ${
                activeTab === "step3" ? "show" : ""
              }`}
            >
              <AuthStep3 toggle={toggleStep} prev={setPreviousStepInactive} />
            </div>

            <div
              className={`single-step scrollable ${
                activeTab === "step4" ? "show" : ""
              }`}
            >
              <AuthStep4 toggle={toggleStep} prev={setPreviousStepInactive} />
            </div>

            <div
              className={`single-step scrollable ${
                activeTab === "step5" ? "show" : ""
              }`}
            >
              <AuthStep5 prev={setPreviousStepInactive} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default MultiStepAuthPage;
