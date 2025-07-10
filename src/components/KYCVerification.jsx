import React, { useState, useEffect } from 'react';
import {
  Upload,
  Check,
  CheckCircle,
  Clock
} from 'lucide-react';
import axios from 'axios';

const KYCVerification = ({ user, setUser }) => {
  const [formData, setFormData] = useState({
    idType: 'passport',
    idFront: null,
    idBack: null,
    selfie: null,
  });

  const [submitting, setSubmitting] = useState(false);

  // Simulate polling for status update
  useEffect(() => {
    let pollInterval;
    if (user.kycStatus === 'pending') {
      pollInterval = setInterval(async () => {
        try {
          // Simulated polling, replace with your real endpoint
          // const res = await axios.get('/api/user');
          // if (res.data.kycStatus === 'verified') {
          //   setUser(prev => ({ ...prev, kycStatus: 'verified' }));
          // }

          // Simulated verification after delay
          await new Promise((res) => setTimeout(res, 5000));
          setUser(prev => ({ ...prev, kycStatus: 'verified' }));
          clearInterval(pollInterval);
        } catch (err) {
          console.error('Polling failed:', err);
        }
      }, 3000);
    }
    return () => clearInterval(pollInterval);
  }, [user.kycStatus]);

  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append('idType', formData.idType);
    formDataToSend.append('idFront', formData.idFront);
    formDataToSend.append('idBack', formData.idBack);
    formDataToSend.append('selfie', formData.selfie);

    try {
      setSubmitting(true);
      // Submit to backend
      await axios.post('/api/kyc-upload', formDataToSend); // adjust endpoint

      // Set to pending while waiting for review
      setUser(prev => ({ ...prev, kycStatus: 'pending' }));
    } catch (error) {
      alert("Submission failed. Please try again.");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  // ========== RENDERING ==========

  if (user.kycStatus === 'verified') {
    return (
      <div className="max-w-xl mx-auto text-center bg-gray-800 p-8 rounded-xl border border-gray-700">
        <div className="w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h2 className="text-white text-2xl font-bold mb-2">KYC Verified</h2>
        <p className="text-gray-300 text-sm mb-4">
          Your identity has been successfully verified. You now have full access to the platform.
        </p>
      </div>
    );
  }

  if (user.kycStatus === 'pending') {
    return (
      <div className="max-w-xl mx-auto text-center bg-gray-800 p-8 rounded-xl border border-gray-700">
        <div className="w-16 h-16 mx-auto mb-4 bg-yellow-500/20 rounded-full flex items-center justify-center">
          <Clock className="w-8 h-8 text-yellow-400" />
        </div>
        <h2 className="text-white text-2xl font-bold mb-2">KYC Pending</h2>
        <p className="text-gray-300 text-sm mb-4">
          Your documents have been submitted. We’re reviewing them and will notify you once verified.
        </p>
      </div>
    );
  }

  // Render Upload Form
  return (
    <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-xl border border-gray-700">
      <h2 className="text-white text-2xl font-bold mb-6">KYC Verification</h2>

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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* ID Front */}
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

        {/* ID Back */}
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

      {/* Selfie */}
      <div className="mt-6">
        <label className="block text-gray-300 text-sm mb-2">Selfie with ID</label>
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
          <Upload className="mx-auto text-gray-400 mb-2" />
          <p className="text-gray-400 text-xs mb-2">Upload a selfie holding your ID</p>
          <input
            type="file"
            name="selfie"
            onChange={handleFileUpload}
            className="hidden"
            id="selfie"
            accept="image/*"
          />
          <label
            htmlFor="selfie"
            className="cursor-pointer bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white text-sm"
          >
            Choose File
          </label>
          {formData.selfie && (
            <p className="text-green-400 text-xs mt-2">{formData.selfie.name}</p>
          )}
        </div>
      </div>

      {/* Submit */}
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
