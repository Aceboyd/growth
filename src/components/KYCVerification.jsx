import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Upload, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dunqe09gc/image/upload';
const UPLOAD_PRESET = 'jayjay';
const API_BASE_URL = 'https://growthsphere.onrender.com';

const StatusCard = ({ icon, color, title, message }) => (
  <div className="max-w-xl mx-auto text-center bg-gray-800 p-8 rounded-xl border border-gray-700">
    <div className={`w-16 h-16 mx-auto mb-4 ${color} rounded-full flex items-center justify-center`}>
      {icon}
    </div>
    <h2 className="text-white text-2xl font-bold mb-2">{title}</h2>
    <p className="text-gray-300 text-sm mb-4">{message}</p>
  </div>
);

const KYCVerification = ({ user, setUser }) => {
  const [formData, setFormData] = useState({
    idType: 'passport',
    idFront: null,
    idBack: null,
    idFrontUrl: '',
    idBackUrl: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const navigate = useNavigate();

  const getAccessToken = () => localStorage.getItem('accessToken');

  const handleFileUpload = async (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (!file) return;

    try {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', UPLOAD_PRESET);

      const res = await axios.post(CLOUDINARY_URL, data);
      const fileUrl = res.data.secure_url;

      setFormData((prev) => ({
        ...prev,
        [name]: file,
        [`${name}Url`]: fileUrl,
      }));
    } catch (err) {
      console.error('Upload failed', err);
      alert('Failed to upload file.');
    }
  };

  const handleSubmit = async () => {
    if (!formData.idFrontUrl || !formData.idBackUrl) {
      return alert('Please upload both front and back of your ID.');
    }

    setSubmitting(true);
    try {
      const token = getAccessToken();
      if (!token) {
        alert('Please log in to submit KYC documents.');
        navigate('/signin');
        return;
      }

      await axios.post(
        `${API_BASE_URL}/api/auth/kyc-upload/`,
        {
          id_type: formData.idType,
          id_front_url: formData.idFrontUrl,
          id_back_url: formData.idBackUrl,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHasSubmitted(true);
      // Start polling for status updates
      pollStatus();
    } catch (err) {
      console.error('KYC submission error:', err);
      if (err.response?.status === 415) {
        alert('Unsupported media type. Please check the content type or contact support.');
      } else if (err.response?.status === 401) {
        alert('Session expired. Please log in again.');
        navigate('/signin');
      } else {
        alert(
          err.response?.data?.message ||
            err.response?.data?.detail ||
            'Failed to submit KYC documents.'
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  const pollStatus = useCallback(() => {
    const interval = setInterval(async () => {
      try {
        const token = getAccessToken();
        if (!token) {
          alert('Session expired. Please log in again.');
          navigate('/signin');
          clearInterval(interval);
          return;
        }

        const res = await axios.get(`${API_BASE_URL}/api/auth/kyc-upload/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const updatedStatus = res.data.kyc_status; // Map to backend field

        if (updatedStatus !== user.status) {
          setUser((prev) => ({ ...prev, status: updatedStatus }));
        }

        // Stop polling if status becomes final
        if (['verified', 'approved', 'rejected'].includes(updatedStatus)) {
          clearInterval(interval);
        }
      } catch (err) {
        console.error('Polling failed:', err);
        alert('Failed to fetch KYC status.');
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [setUser, navigate]);

  useEffect(() => {
    if (user.status === 'pending' || user.status === 'in_review' || user.status === 'verified' || user.status === 'approved' || user.status === 'rejected') {
      setHasSubmitted(true);
      const cleanup = pollStatus();
      return cleanup;
    }
  }, [user.status, pollStatus]);

  // UI Based on Status
  if (user.status === 'verified' || user.status === 'approved') {
    return (
      <StatusCard
        icon={<CheckCircle className="w-8 h-8 text-green-400" />}
        color="bg-green-500/20"
        title="KYC Verified"
        message="Your identity has been successfully verified. You now have full access to the platform."
      />
    );
  }

  if (user.status === 'pending') {
    return (
      <StatusCard
        icon={<Clock className="w-8 h-8 text-yellow-400" />}
        color="bg-yellow-500/20"
        title="KYC Pending"
        message="Your documents have been submitted. We’re reviewing them and will notify you once verified."
      />
    );
  }

  if (user.status === 'rejected') {
    return (
      <StatusCard
        icon={<AlertTriangle className="w-8 h-8 text-red-400" />}
        color="bg-red-500/20"
        title="KYC Rejected"
        message="Your verification was rejected. Please re-submit your documents or contact support."
      />
    );
  }

  if (user.status === 'in_review') {
    return (
      <StatusCard
        icon={<Clock className="w-8 h-8 text-blue-400" />}
        color="bg-blue-500/20"
        title="KYC In Review"
        message="Your documents are under further review. We’ll notify you with an update soon."
      />
    );
  }

  // Show submitted card after submission
  if (hasSubmitted) {
    return (
      <StatusCard
        icon={<CheckCircle className="w-8 h-8 text-blue-400" />}
        color="bg-blue-500/20"
        title="KYC Submitted"
        message="Your documents have been successfully submitted for verification. You will be notified once the review is complete."
      />
    );
  }

  // Default Form UI
  return (
    <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-xl border border-gray-700">
      <h2 className="text-white text-2xl font-bold mb-6">KYC Verification</h2>

      {/* Document Type Selector */}
      <div className="mb-6">
        <label className="block text-gray-300 text-sm font-medium mb-2">Document Type</label>
        <select
          name="idType"
          value={formData.idType}
          onChange={(e) => setFormData((prev) => ({ ...prev, idType: e.target.value }))}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
        >
          <option value="passport">Passport</option>
          <option value="drivers_license">Driver’s License</option>
          <option value="national_id">National ID</option>
        </select>
      </div>

      {/* File Uploads */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Front of ID */}
        <div>
          <label className="block text-gray-300 text-sm mb-2">Front of ID</label>
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
            <Upload className="mx-auto text-gray-400 mb-2" />
            <p className="text-gray-400 text-xs mb-2">Upload front of your ID</p>
            <input
              type="file"
              name="idFront"
              onChange={handleFileUpload}
              className="hidden"
              id="idFront"
              accept="image/*"
            />
            <label
              htmlFor="idFront"
              className="cursor-pointer bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white text-sm"
            >
              Choose File
            </label>
            {formData.idFront && (
              <p className="text-green-400 text-xs mt-2">{formData.idFront.name}</p>
            )}
          </div>
        </div>

        {/* Back of ID */}
        <div>
          <label className="block text-gray-300 text-sm mb-2">Back of ID</label>
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
            <Upload className="mx-auto text-gray-400 mb-2" />
            <p className="text-gray-400 text-xs mb-2">Upload back of your ID</p>
            <input
              type="file"
              name="idBack"
              onChange={handleFileUpload}
              className="hidden"
              id="idBack"
              accept="image/*"
            />
            <label
              htmlFor="idBack"
              className="cursor-pointer bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white text-sm"
            >
              Choose File
            </label>
            {formData.idBack && (
              <p className="text-green-400 text-xs mt-2">{formData.idBack.name}</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 text-right">
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all text-sm disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : 'Submit for Verification'}
        </button>
      </div>
    </div>
  );
};

export default KYCVerification;