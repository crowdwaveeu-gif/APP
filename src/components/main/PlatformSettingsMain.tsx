import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { toast } from 'react-toastify';

interface PlatformSettings {
  platformFeePercent: number;
  minFee?: number;
  maxFee?: number;
  lastUpdatedBy?: string;
  lastUpdatedAt?: Timestamp | Date;
}

const PlatformSettingsMain = () => {
  const [settings, setSettings] = useState<PlatformSettings>({
    platformFeePercent: 10, // Default 10%
    minFee: 0,
    maxFee: 100,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [tempFeePercent, setTempFeePercent] = useState('10');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      const settingsRef = doc(db, 'platformSettings', 'general');
      const settingsDoc = await getDoc(settingsRef);

      if (settingsDoc.exists()) {
        const data = settingsDoc.data() as PlatformSettings;
        setSettings(data);
        setTempFeePercent(data.platformFeePercent.toString());
      } else {
        // Create default settings
        const defaultSettings: PlatformSettings = {
          platformFeePercent: 10,
          minFee: 0,
          maxFee: 100,
          lastUpdatedAt: new Date(),
        };
        await setDoc(settingsRef, defaultSettings);
        setSettings(defaultSettings);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      toast.error('Failed to load settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    const feePercent = parseFloat(tempFeePercent);

    // Validation
    if (isNaN(feePercent) || feePercent < 0 || feePercent > 100) {
      toast.error('Please enter a valid fee percentage between 0 and 100');
      return;
    }

    try {
      setIsSaving(true);
      const settingsRef = doc(db, 'platformSettings', 'general');
      
      const updatedSettings: PlatformSettings = {
        ...settings,
        platformFeePercent: feePercent,
        lastUpdatedAt: new Date(),
        lastUpdatedBy: 'Admin', // TODO: Get from auth context
      };

      await setDoc(settingsRef, updatedSettings);
      setSettings(updatedSettings);
      
      toast.success(`Platform fee updated to ${feePercent}%`);
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setTempFeePercent(settings.platformFeePercent.toString());
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">
              <i className="ti ti-settings me-2"></i>
              Platform Settings
            </h5>
          </div>
          <div className="card-body">
            <div className="row">
              {/* Platform Fee Configuration */}
              <div className="col-12">
                <div className="mb-4">
                  <div className="card bg-light border-0 mb-4">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-3">
                        <i className="ti ti-currency-euro text-primary me-2"></i>
                        <strong>Platform Fee</strong>
                      </div>
                      <div className="d-flex align-items-baseline">
                        <h2 className="mb-0 text-primary">{settings.platformFeePercent}%</h2>
                        <span className="ms-2 text-muted">of service fee</span>
                      </div>
                      {settings.lastUpdatedAt && (
                        <small className="text-muted d-block mt-2">
                          Last updated: {
                            settings.lastUpdatedAt instanceof Timestamp 
                              ? settings.lastUpdatedAt.toDate().toLocaleString()
                              : new Date(settings.lastUpdatedAt).toLocaleString()
                          }
                        </small>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="platformFee" className="form-label">
                      Platform Fee Percentage
                      <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">%</span>
                      <input
                        type="number"
                        className="form-control"
                        id="platformFee"
                        value={tempFeePercent}
                        onChange={(e) => setTempFeePercent(e.target.value)}
                        min="0"
                        max="100"
                        step="0.1"
                        placeholder="10"
                      />
                    </div>
                    <small className="form-text text-muted">
                      Enter a value between 0 and 100
                    </small>
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-primary"
                      onClick={handleSaveSettings}
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Saving...
                        </>
                      ) : (
                        <>
                          <i className="ti ti-device-floppy me-2"></i>
                          Save Changes
                        </>
                      )}
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={handleReset}
                      disabled={isSaving}
                    >
                      <i className="ti ti-refresh me-2"></i>
                      Reset
                    </button>
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

export default PlatformSettingsMain;
