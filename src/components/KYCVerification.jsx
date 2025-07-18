import React, { useState, useEffect } from 'react';
import {
  Upload,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import axios from 'axios';

const KYCVerification = ({ user, setUser }) => {
  const [formData, setFormData] = useState({
    idType: 'passport',
    idFront: null,
    idBack: null,
  });
  const [submitting, setSubmitting] = useState(false);

  // Polling logic for backend status updates
  useEffect(() => {
    let pollInterval;
    if (user.kycStatus === 'pending') {
      pollInterval = setInterval(async () => {
        try {
          const res = await axios.get(
            'https://growthsphere.onrender.com/api/auth/kyc-status/',
            { withCredentials: true }
          );
          const newStatus = res.data.status;
          if (newStatus && newStatus !== 'pending') {
            setUser(prev => ({ ...prev, kycStatus: newStatus }));
            clearInterval(pollInterval);
          }
        } catch (err) {
          console.error('Polling error:', err);
        }
      }, 5000);
    }
    return () => clearInterval(pollInterval);
  }, [user.kycStatus]);

  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    if (files?.[0]) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append('id_type', formData.idType);
    formDataToSend.append('id_front', formData.idFront);
    formDataToSend.append('id_back', formData.idBack);

    try {
      setSubmitting(true);
      await axios.post(
        'https://growthsphere.onrender.com/api/auth/kyc-upload/',
        formDataToSend,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true
        }
      );
      setUser(prev => ({ ...prev, kycStatus: 'pending' }));
    } catch (error) {
      console.error('KYC Upload Error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const StatusCard = ({ icon, color, title, message }) => (
    <div className="max-w-xl mx-auto text-center bg-gray-800 p-8 rounded-xl border border-gray-700">
      <div className={`w-16 h-16 mx-auto mb-4 ${color} rounded-full flex items-center justify-center`}>
        {icon}
      </div>
      <h2 className="text-white text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-300 text-sm mb-4">{message}</p>
    </div>
  );

  if (user.kycStatus === 'verified') {
    return (
      <StatusCard
        icon={<CheckCircle className="w-8 h-8 text-green-400" />}
        color="bg-green-500/20"
        title="KYC Verified"
        message="Your identity has been successfully verified. You now have full access to the platform."
      />
    );
  }

  if (user.kycStatus === 'pending') {
    return (
      <StatusCard
        icon={<Clock className="w-8 h-8 text-yellow-400" />}
        color="bg-yellow-500/20"
        title="KYC Pending"
        message="Your documents have been submitted. We’re reviewing them and will notify you once verified."
      />
    );
  }

  if (user.kycStatus === 'rejected') {
    return (
      <StatusCard
        icon={<AlertTriangle className="w-8 h-8 text-red-400" />}
        color="bg-red-500/20"
        title="KYC Rejected"
        message="Your verification was rejected. Please re-submit your documents or contact support."
      />
    );
  }

  if (user.kycStatus === 'in_review') {
    return (
      <StatusCard
        icon={<Clock className="w-8 h-8 text-blue-400" />}
        color="bg-blue-500/20"
        title="KYC In Review"
        message="Your documents are under further review. We’ll notify you with an update soon."
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-xl border border-gray-700">
      <h2 className="text-white text-2xl font-bold mb-6">KYC Verification</h2>

      {/* Document Type */}
      <div className="mb-6">
        <label className="block text-gray-300 text-sm font-medium mb-2">Document Type</label>
        <select
          name="idType"
          value={formData.idType}
          onChange={(e) => setFormData(prev => ({ ...prev, idType: e.target.value }))}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
        >
          <option value="passport">Passport</option>
          <option value="drivers_license">Driver’s License</option>
          <option value="national_id">National ID</option>
        </select>
      </div>

      {/* ID Uploads */}
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
